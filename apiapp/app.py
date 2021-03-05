from flask import Flask, render_template, request, json, jsonify, redirect, session, g
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.wrappers import Request, Response
from forms import Drink
from models import db, connect_db, Drink
import json
import requests
import random
import os
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, SelectField, DateField, IntegerField, EmailField
from wtforms.fields.core import FormField
from wtforms.validators import DataRequired, Email, Length, NumberRange, InputRequired, ValidationError
from wtforms.fields import EmailField
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy, _calling_context

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///drinkapp'
app.config['SECRET_KEY'] = "1"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS']= False
toolbar = DebugToolbarExtension(app)

bcrypt = Bcrypt()
db = SQLAlchemy()
connect_db(app)


@app.route("/")
def homepage():
    """Show homepage."""
    
    return render_template('index.html')

#testing purposes for jinja
@app.route("/base")
def basepage():
    return render_template('base.html')

@app.route("/searchinput/", methods=["GET","POST"])
def search_results():
    data =request.data.decode()
    # print("data",data)
    form=request.form
    print("form",form)
    form1= json.dumps(request.data)    
    print(form1)
    return render_template('')

@app.route("/randomdrink/",methods=["GET", "POST"])
def randomdrink():
    print(request.args.get('strDrink'))
    jsoninfo = request.json
    name=request.json.get('strDrink')
    img = request.json.get('strDrinkThumb')
    glass=request.json.get('strGlass')
    instructions= request.json.get('strInstructions')
    drink = Drink(name=name,glass=glass,image=img, instructions=instructions)
    print(drink.name)
    db.session.add(drink)
    db.session.commit()
    return render_template('/randomdrink.html', form = drink)

@app.route("/searchinput", methods=["GET","POST"])
def search():
    return