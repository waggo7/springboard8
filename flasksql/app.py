from flask import Flask, render_template, flash, redirect, render_template, url_for,jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import Pet, db, connect_db
from forms import AddPetsForm, EditPetsForm

app = Flask(__name__)
app.config['SECURITY_KEY'] = "1234"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///adopt"
connect_db(app)
db.create_all()
  
@app.route('/')
def home():
    #lists the pets name, photo (if available),display "available" if pet is up for adoption
    pets = Pet.query.all() 
    return render_template('petsinput.html', pets=pets)
@app.route('/add', methods=["POST","GET"])
#use WTF and have pet name, species, photo URL, age, notes
def add_pet():
    form = AddPetsForm()
    if form.validate_on_submit():
         new_pet = (form.name.data, form.species.data )
         db.session.add(new_pet)
         db.session.commit()
         return redirect(url_for('new_pet'))
    else:
        return render_template('petsinput.html', form = form)

@app.route('/<int:pets.id>', methods=["POST", "GET"])
def display_edit(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetsForm(obj=pet)
    if form.validate_on_submit():
        pet.notes = form.notes.data 
        pet.photo_url = form.photo_url.data
        pet.available = form.available.data 
        db.session.commit()
        return redirect(url_for('petspage'))
    else:
        return render_template('editpet.html', pet=pet, form=form)

@app.route("/api/pets/<int:pet_id>", methods=['GET'])
def api_get_pet(pet_id):
    """Return basic info about pet in JSON."""

    pet = Pet.query.get_or_404(pet_id)
    info = {"name": pet.name, "age": pet.age}

    return jsonify(info)
