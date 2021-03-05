from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, SelectField, DateField, IntegerField, EmailField
from wtforms.fields.core import FormField
from wtforms.validators import DataRequired, Email, Length, InputRequired, Optional

class Drink(FlaskForm):
    name= TextAreaField('name',validators=[DataRequired()])
    image_url = StringField('(Optional) Image URL')
    ingredients=FormField('ingredients',validators=[Optional()])
    instructions=TextAreaField('instructions', validators=[DataRequired()])
    glass=StringField('glass', validators=[DataRequired()])
class ingedients(FlaskForm):
    ingredient1=TextAreaField('ingredient1', validators=[DataRequired()])
    ingredient2=TextAreaField('ingredient2', validators=[DataRequired()])
    ingredient3=TextAreaField('ingredient3', validators=[DataRequired()])
    ingredient4=TextAreaField('ingredient4', validators=[DataRequired()])
    ingredient5=TextAreaField('ingredient5', validators=[DataRequired()])
    ingredient6=TextAreaField('ingredient6', validators=[DataRequired()])
    ingredient7=TextAreaField('ingredient7', validators=[DataRequired()])
    ingredient8=TextAreaField('ingredient8', validators=[DataRequired()])
    ingredient9=TextAreaField('ingredient9', validators=[DataRequired()])
    ingredient10=TextAreaField('ingredient10', validators=[DataRequired()])