import os
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, SelectField, DateField, IntegerField, EmailField
from wtforms.fields.core import FormField
from wtforms.validators import DataRequired, Email, Length, NumberRange, InputRequired, ValidationError
from wtforms.fields import EmailField
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy, _calling_context
from flask import Flask, render_template, request,Request, json, jsonify, redirect, session, g, url_for
from flask_debugtoolbar import DebugToolbarExtension
import random
import json
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_DATABASE_URI'] =  os.environ.get('postgresql:///flask2')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "oh-so-secret")
toolbar = DebugToolbarExtension(app)
bcrypt = Bcrypt()
db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)

@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")
class luckNum(FlaskForm):
    luckynum=IntegerField('lucky num')
    fact=StringField('fact')
class yearInfo(FlaskForm):
    year=IntegerField('birth year')
    fact=StringField('fact')
class queryform(FlaskForm):
    year = IntegerField('year', validators=[NumberRange(min=1900, max=2000)],),ValidationError(message="please enter a year between 1900 and 2000")
    name= StringField('name',validators=[InputRequired()]),ValidationError(message="please enter a valid input")
    color = SelectField('color', choices=['red', 'green', 'orange', 'blue'], validators=[
                        InputRequired(), ]), ValidationError(message="please choose bewteen red, orange, green, or blue")
    email= EmailField('email',validators=[InputRequired()])
    lucky_number = FormField('lucky_number')

@app.route("/api/get-lucky-num/", methods=["GET","POST"])
def makeapi():
    data = request.data.decode()
    jsondata=request.json
    jsonobj = json.loads(data)
    appendform = request.form.get('lucky-results')
    print(appendform)
    name=[]
    year=[]
    color=""
    num=""
    email=""
    for key, value in jsonobj.items():
        if key =="name":
            name= value
        if key =="year":
            year= value
        if key =="color":
            color= value
        if key =="email":
            email= value
        if key =="num":
            num = value
    formData = {'name': name, 'year': year,
                'email': email, 'num':num,'color': color}
    num_fact= requests.get('http://numbersapi.com/{num}').decode()
    print(type(formData), formData,type(jsondata), jsondata)
    return ('Your lucky number is {num},{num-fact}. Your birth year {year}fact is {year_fact}.')
    #return render_template('index.html')



# newnum = Num(fact=num_fact, num=num)
# newnum = Num.serialize(newnum)
# newyear = Year(fact=year_fact, year=year)
# newyear = Year.serial a ize(newyear)
#form = UserForm()
#if form.is_submitted():
#year=form.data['year']


    #
