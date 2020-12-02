from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt, 
bcrypt = Bcrypt()
db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class User(db.Model):
    __tablename__ = "users"

    username = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(50), unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    feedback = db.Column(db.Text, nullable=False)

    @classmethod
    def register(class, password, username):
        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")
        return class(username=username, password=hashed_utf8)
    @classmethod
    def authenticate(class,username,password):
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return False

class Feedback(db.Model):
    __tablename_="feedback"
    id = db.Column(db.Integer,autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text,nullable=False)
    username = db.Column(db.ForeignKey('user.username'), nullable=False)
