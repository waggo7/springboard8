from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.orm import backref
from sqlalchemy.sql.schema import ForeignKey

bcrypt = Bcrypt()
db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Playlist(db.Model):
    __tablename__= "playlist"
    # ADD THE NECESSARY CODE HERE
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    name=db.Column(db.String(30), nullable=False)
    description=db.Column(db.Text, nullable=False)
    song= db.Column(db.Integer, db.ForeignKey('song.id'))
    def to_dict(self):
        return {
        "id":self.id,
        "name": self.name,
        "description": self.description,}
   

class Song(db.Model):
    __tablename__="song"
    id=db.Column(db.Integer,primary_key=True,autoincrement=True, unique=True)
    title=db.Column(db.Text,nullable=False)
    artist=db.Column(db.Text,nullable=False)
    playlist= db.Column("Playlist", ForeignKey('playlist.id'), nullable=False)


class PlaylistSong(db.Model):
    __tablename__="playlist_songs"
    id=db.Column(db.Integer,primary_key=True,autoincrement=True )
    playlist_id= db.Column(db.Integer,ForeignKey('playlist.id'),nullable=False)
    song_id= db.Column(db.Integer,ForeignKey('song.id'),nullable=False)

