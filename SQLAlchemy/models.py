"""Models for Blogly."""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)


class User(db.Model):
    __tablename__ ="User"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(20), nullable=False,unique=True)
    last_name =  db.Column(db.String(20), nullable=False,unique=True)
    image_url =  db.Column(db.Text,nullable=True)
    
    @classmethod
    def fullname(cls):
        """return user name"""
        return f"{cls.last_name},{cls.first_name}"
    





