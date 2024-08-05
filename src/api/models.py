from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(200), unique=False, nullable=True)
    name = db.Column(db.String(20), unique=False, nullable=False)
    surname = db.Column(db.String(20), unique=False, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(10), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "avatar": self.avatar,
            "name": self.name,
            "surname": self.surname,
            "username": self.username,
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(800), unique=False, nullable=False)
    message = db.Column(db.String(500), unique=False, nullable=False)
    likes = db.relationship('User', secondary='post_likes', backref='liked_posts')  # Relación muchos a muchos con User
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Clave foránea hacia User
    author = db.relationship('User', backref='posts')  # Relación con User
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    location = db.Column(db.String(30), unique=False, nullable=False)
    status = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        return f'<Post {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "image": self.image,
            "message": self.message,
            "likes": [user.id for user in self.likes],  # Solo incluir IDs de usuarios para los likes
            "author": self.author.username,
            "created_at": self.created_at.isoformat(),
            "location": self.location,
            "status": self.status,
        }

class PostLikes(db.Model):
    __tablename__ = 'post_likes'
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)