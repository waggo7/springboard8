"""Flask app for Cupcakes"""
from flask import Flask, url_for, render_template, redirect, flash, jsonify, request

from models import db, connect_db, Cupcake


app = Flask(__name__)
 
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///cupcakes"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "oh-so-secret"

connect_db(app)

 
@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/api/cupcakes')
def cupcake_data():
    cupcake= [cupcake.to_dict() for cupcake in Cupcake.query.all()]
    return jsonify(cupcake = cupcake)

@app.route('/api/cupcakes/[cupcake-id]')
def cupcakes_id(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.to_dict())


@app.route('/api/cupcakes',methods=["POST"])
def newcupcakes():
    data = request.json
    new_cupcake= Cupcake(
        flavor=data['flavor'],
        rating= data['rating'],
        size = data['size'],
        image= data['image'] or None)

    db.session.add(new_cupcake)
    db.session.commit()
    
    return (jsonify(cupcake=new_cupcake.to_dict()), 201)

@app.route('/api/cupcakes/[cupcake-id]', methods=["PATCH"])
def update(cupcake_id):
    data = request.json

    cupcake= Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor=data['flavor'],
    cupcake.rating= data['rating'],
    cupcake.size = data['size'],
    cupcake.image= data['image'],
    db.session.add(cupcake)
    db.session.commit()
    return jsonify(cupcake=cupcake.to_dict())

@app.route('/api/cupcakes/[cupcake-id]', methods=["DELETE"])
def delete_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delet(cupcake)
    db.session.commit()
    return jsonify(message="DELETED")

        
