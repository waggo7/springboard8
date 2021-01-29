from flask import Flask, render_template, request, json, jsonify, redirect, session, g
from flask_debugtoolbar import DebugToolbarExtension
from form import UserForm
from models import db, connect_db, User
import json
import requests

response = requests.get('http://numbersapi.com/')
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///flask2'
app.config['SECRET_KEY'] = "oh-so-secret"
toolbar = DebugToolbarExtension(app)

@app.route("/")
def homepage():
    """Show homepage."""
    
    return render_template("index.html")

@app.route("/api/get-lucky-num", methods=["POST"])
def makeapi():
    form= UserForm()
    print(form)
    if form.validate_on_submit():
        name= form.data['name']
        email= form.data['email']
        year= form.data['year']
        color= form.data['color']
        newuser= User(name=name,email=email,year=year,color=color)
        print(newuser)
        db.session.add(newuser)
        db.session.commit()
        return jsonify(newuser)
        
    return render_template('index.html')

