from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, Length, PasswordField
from wtforms.validators import InputRequired, Optional, Email


class LoginForm(FlaskForm):
    username=StringField('username', validator=[InputRequired(),Length(min=1, max=20)])
    password= PasswordField('password', validator=[InputRequired(),Length(min=1, max=20)])


class RegisterForm(FlaskForm):
    username=StringField('username', validator=[InputRequired(),Length(min=1, max=20)])
    password=StringField('password', validator=[InputRequired(),Length(min=1, max=20)])
    email=StringField('email,')
    first_name=StringField('first name', validator=[InputRequired(), Length(min=5, max=30)]),
    last_name=StringField('last name', validator=[InputRequired(), Length(min=5, max=30)])

class FeedbackForm(FlaskForm):
    title = StringField('title', validator=[InputRequired()])
    content = StringField('content', validator=[InputRequired()])

class DeleteForm(FlaskForm):
    ""