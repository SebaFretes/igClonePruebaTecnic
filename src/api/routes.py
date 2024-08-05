"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, PostLikes
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['POST'])
def create_user():

    data = request.json

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
    
