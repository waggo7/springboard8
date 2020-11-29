"""Models for Blogly."""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.schema import ForeignKey

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

    Post = db.relationship("Post", backref="user", cascade="all, delete-orphan")
    
    @property
    def fullname(self):

        return f"{self.last_name},{self.first_name}"
    

class Post(db.Model):
    __tablename__ = "Post"
    id= db.Column(db.Integer, primary_key=True, autoincrement=True)
    title=  db.Column(db.String, nullable=False)
    content= db.Column(db.String,nullable=False)
    created_at= db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.ForeignKey("User.id"), nullable=False)
    
    @property
    def friendly_date(self):

        return self.created_at.strftime("%a %b %-d  %Y, %-I:%M %p")



    



