
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Pet(db.Model):
    __tablename__="pets"(
    id = db.Column(db.Integer, primary_key=True,autoincrement=True),
    name=db.Column(db.Text, required=True), 
    species=db.Column(db.Text,required=True),
    photo_url = db.Column(db.Text, optional=True), 
    age = db.Column(db.Integer, optional=True), 
    notes= db.Column(db.Text, optional=True),
    available = db.Column(db.Boolean, optional=False, default=True)
    )

def connect_db(app):
    db.app = app
    db.init_app(app)
