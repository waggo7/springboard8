from typing import Text
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField,SelectField, TextAreaField
from wtforms.validators import InputRequired,Email,Optional, EqualTo, URL

class AddPetsForm(FlaskForm):
    name=  StringField("Name", validators=[Text(),InputRequired()])
    species = SelectField("Species", validators = [InputRequired()],)
    photo_URL = StringField('Photo URL', validators=[Optional(), URL()],)
    pet_age= IntegerField('Pet Age', validators=[Optional()])
    notes =TextAreaField('Notes', validators=[Optional()],)
    

class EditPetsForm(FlaskForm):
    