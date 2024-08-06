"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, PostLikes
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def create_user():

    data = request.json

    required_fields = ['name', 'surname', 'username', 'password']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'message': f'The field {field} is required'}), 400

    # Validando length de campos
    if len(data.get('name', '')) < 3 or len(data.get('name', '')) > 20:
        return jsonify({'message': 'The name must be between 3 and 20 characters long'}), 400

    if len(data.get('surname', '')) < 3 or len(data.get('surname', '')) > 20:
        return jsonify({'message': 'The surname must be between 3 and 20 characters long'}), 400
    
    if len(data.get('username', '')) < 3 or len(data.get('username', '')) > 20:
        return jsonify({'message': 'The username must be between 3 and 20 characters long'}), 400

    if len(data.get('password', '')) < 5 or len(data.get('password', '')) > 10:
        return jsonify({'message': 'The password must be between 5 and 10 characters long'}), 400

    try:
        new_user = User(
            avatar = data.get('avatar'),
            name = data.get('name'),
            surname = data.get('surname'),
            username = data.get('username'),
            password = data.get('password'),
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify( new_user.serialize() ), 201
    except Exception as e:
        return jsonify( {'error': str(e) } ), 400

@api.route('/login', methods=['POST'])
def login():

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if username == None or password == None:
        return jsonify({'msg': 'Bad username or password'}), 401

    user = User.query.filter_by(username=username).one_or_none()

    if user != None:
        if password == user.password:
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token)
        else:
            return jsonify({"msg": "Wrong password"}), 401
    return jsonify({"msg": "User not found"}), 404
    
@api.route('/post', methods=['POST'])
def create_post():

    data = request.json

    if len(data.get('message', '')) < 10 or len(data.get('message', '')) > 500:
        return jsonify({'message': 'The message must be between 10 and 500 characters long'}), 400

    if len(data.get('location', '')) < 4 or len(data.get('location', '')) > 30:
        return jsonify({'message': 'The location must be between 4 and 30 characters long'}), 400

    if data.get('status') not in ['drafted', 'deleted', 'published']:
        return jsonify({'message': 'The status must be either drafted, deleted, or published'}), 400

    # Verificar si el author_id existe en la tabla user
    author = User.query.get(data.get('author_id'))
    if author is None:
        return jsonify({'message': 'The author_id does not exist'}), 400

    try:
        new_post = Post(
            image = data.get('image'),
            message = data.get('message'),
            author_id = data.get('author_id'),
            location = data.get('location'),
            status = data.get('status')
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify( new_post.serialize() ), 201
    except Exception as e:
        return jsonify( {'error': str(e) } ), 400


@api.route("/demo", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).one_or_none()
    if user != None:
        return jsonify(user.serialize()), 200
    return jsonify({"msg": "Please contact support"}), 200
