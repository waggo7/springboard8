from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()


def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    db.app = app
    db.init_app(app)
    db.create_all()


class Drink(db.Model):
    __tablename__="drink"
    id=db.Column(db.Integer, primary_key=True,autoincrement=True)
    name= db.Column(db.String, nullable=False)
    #ingredients = db.Column(db.Text, nullable=False)
    glass= db.Column(db.Text, nullable=False)
    instructions=db.Column(db.Text, nullable=False)
    image=db.Column(db.Text)

    def __init__(self, name, glass, image, instructions):
        self.name = name
        self.image = image
        self.glass  = glass
        self.instructions=instructions

    