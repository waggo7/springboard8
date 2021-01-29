from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, SelectField, DateField, IntegerField
from wtforms.validators import DataRequired, Email, Length

class UserForm(FlaskForm):
    name=StringField('name',validators=[DataRequired()])
    email=StringField('email',validators=[DataRequired(), Email()])
    birth_year = StringField('year', validators=[DataRequired(), Length(min=1900, max=2000)])
    color = SelectField('color', validators=[DataRequired()], choices=["red", "green", "orange", "blue"])
    