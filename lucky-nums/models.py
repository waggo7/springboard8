from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id=db.Column(db.Integer, primary_key=True,autoincrement=True)
    name = db.Column(db.Text,nullable=False)
    email=db.Column(db.Text,nullable=False)
    birth_year=db.Column(db.Integer,nullable=False)
    color = db.Column(db.Text,nullable=False)

    def serialize(self):
        return {
    'id':self.id,
    'name': self.name,
    'email':self.email,
    'birth_year':  self.birth_year,
    'color': self.color}

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)