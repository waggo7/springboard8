from flask import Flask, redirect, render_template, session, flash, request, Response, url_for
from flask_debugtoolbar import DebugToolbarExtension
# from flask_psycopg2 import 
from models import db, connect_db, Playlist, Song, PlaylistSong
from forms import NewSongForPlaylistForm, SongForm, PlaylistForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///playlist-app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "I'LL NEVER TELL!!"
app.config["WTF_CSRF_ENABLED "]= False
connect_db(app)
db.create_all()
# Having the Debug Toolbar show redirects explicitly is often useful;
# however, if you want to turn it off, you can uncomment this line:
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

@app.route("/")
def root():
    return redirect("/playlists")

##############################################################################
# Playlist routes

@app.route("/playlists")
def show_all_playlists():
    """Return a list of playlists."""

    return render_template("playlists.html",playlists= Playlist.query.all())

@app.route("/playlists/add", methods=["GET", "POST"])
def add_playlist():
    """Handle add-playlist form:
    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-playlists
    """ 
    form =  PlaylistForm()
    if form.is_submitted(): 
        print(True) 
        #check to see if the form is submitted/validated
        name= form.name.data  
        description = form.description.data
        new_playlist= Playlist(name=name,description=description)
        db.session.add(new_playlist)
        print(new_playlist, session)
        db.session.commit()
         #check to see where/if the playlist information is going
        return redirect(url_for('add_song_to_playlist', playlist_id=new_playlist.id))
    else:
        print(False) #check to see if the form is submitt/validated
        return render_template('new_playlist.html', form=form)  

@app.route("/playlists/<int:playlist_id>/add-song", methods=["GET", "POST"])
def add_song_to_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    form = NewSongForPlaylistForm()
    if form.validate_on_submit():
        print(True)
        playlist_song = PlaylistSong(song_id=form.name.data, playlist_id=playlist_id)
        db.session.add(playlist_song)
        db.session.commit()
        return redirect(f'/playlists/{playlist_id}')
    return render_template("add_song_to_playlist.html",
                             playlist=playlist,
                             form=form)
      

@app.route("/playlists/<int:playlist_id>")
def show_playlist(playlist_id):
    """Show detail on specific playlist."""
    form = PlaylistForm()
    playlistID = Playlist.query.get(playlist_id)
    
    return render_template("playlists.html", playlists=playlistID, form=form )

    # return render_template("new_playlist.html", form=form)
##############################################################################
# Song routes

@app.route("/songs")
def show_all_songs():
    """Show list of songs."""
    songs = Song.query.all()
    return render_template("songs.html", songs=songs)


@app.route("/songs/<int:song_id>")
def show_song(song_id):
    """return a specific song"""
    song=Song.query.get(song_id)
    print(song)
    return render_template('song.html',song=song)
    # ADD THE NECESSARY CODE HERE FOR THIS ROUTE TO WORK


@app.route("/songs/add", methods=["GET", "POST"])
def add_song():
    """Handle add-song form:
    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-songs
    """
    form =SongForm()
    if form.is_submitted():
        print(True)
        title= form.title.data
        artist = form.artist.data
        new_song= Song(title=title, artist=artist)
        print(new_song.id)
        db.session.add(new_song)
        db.session.commit() 
        return redirect(f"/songs")
    else:
        print(False)
        return render_template("new_song.html", form=form)
        

