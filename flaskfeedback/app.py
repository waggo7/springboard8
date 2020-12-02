
from flask import Flask, render_template, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.exceptions import Unauthorized
from wtforms.fields.core import FormField

from models import connect_db, db, User, Feedback 
from forms import RegisterForm, LoginForm, FeedbackForm, DeleteForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres:///flask-feedback"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config["SECRET_KEY"] = "oh-so-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres:///flask_wtforms"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def index():
    return redirect('/register')


@app.route('/register', methods=["GET","POST"])
def add_user():
    if "username" in session:
        return redirect(f"/users/{session['username']}")
        
    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data

        user = User.register(username, password, first_name,last_name, email)
        db.session.commit()
        session['username'] = user.username
        return redirect(f"/users/{user.username}")        
    else:
        return render_template("users/register.html")



@app.route('/login', methods=["GET", "POST"])
def login():
    if "username"  in session:
        return redirect(f"/users/{session['username']}")

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errrors=["invalid username/password"]
            return render_template('/users/register.html', form=form)
    return render_template("users/login.htm", form=form)

@app.route(f'/users/<username>')
def secret(username):
    if username not in session:
        raise Unauthorized()
    user = User.query.get(username)
    form= DeleteForm()
    return render_template('/secret.html', form=form, user=user)

@app.route("/logout")
def logout():
    return 
@app.route("/users/<username>/delete", methods=["POST","GET"])
def delete(username):
    username=User.query.get_or_404(username)
    if username != session['username']:
        raise Unauthorized()
    db.session.delete(username)
    db.session.commit()
    return redirect('/login')

@app.route("/users/<username>/feedback/add", methods=["POST","GET"])
def edit_feedback(username):
    if 'username' not in session:
        raise Unauthorized()

    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(
            title = title,
            content=content,
            username =  username, 
        )
        db.session.add(form)
        db.session.commit()
        return redirect(f'/users/{feedback.username}')
    else:
        return render_template('/users/feedback.html', form=form)

@app.route("/feedback/<int:feedback_id>/update", methods=["GET", "POST"])
def update_feedback(feedback_id):
    feedback = Feedback.query.get(feedback_id)

    if feedback.username != session['username']:
        raise Unauthorized()

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()

        return redirect(f"/users/{feedback.username}")

    return render_template("/feedback/addelete.html", form=form, feedback=feedback)


@app.route("/feedback/<int:feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):

    feedback = Feedback.query.get(feedback_id)
    if feedback.username != session['username']:
        raise Unauthorized()

    form = DeleteForm()

    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()

    return redirect(f"/users/{feedback.username}")
