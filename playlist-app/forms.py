"""Forms for playlist app."""

from wtforms import SelectField,IntegerField,validators,StringField,TextAreaField, SubmitField
from wtforms.validators import InputRequired, DataRequired, NumberRange,Email,Optional,Required,Length
from flask_wtf import FlaskForm


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""
    name= StringField("Playlist Name", validators=[InputRequired()],)
    description = StringField("description",validators=[InputRequired()],)
    submit = SubmitField("submit")


class SongForm(FlaskForm):
    """Form for adding songs."""
    title = StringField("song_title", validators=[InputRequired()],)
    artist = StringField("song_artist", validators=[InputRequired()],)


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
