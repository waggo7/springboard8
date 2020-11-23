from flask import Flask,request,flash, session,render_template, redirect,url_for,jsonify
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
#app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


connect_db(app)
db.create_all()

@app.route('/')
def list_users():
    return redirect("/newuser")

@app.route("/newuser")
def login():
    user = User.query.order_by(User.last_name,User.fullname).all()
    # if user != None:
    #     flash("this user exists, please try again")
    return render_template("index.html", user=user)

@app.route("/checkuser", methods=["GET"])
def add_user():
    return render_template()

@app.route("/checkuser", methods=["POST"])
def user_check():

    new_user=User(
        first_name= request.form['first_name'],
        last_name= request.form['last_name'],
        image_url = request.form['image_url']or None)
    
    # if new_user.last_name == None or new_user.first_name==None:
    #         flash("this user exists, please try again")
    #         return render_template('index.html')
    db.session.add(new_user)
    db.session.commit()
    
    return redirect('/newuser')
    #return render_template("userpage.html", User=new_user)
@app.route("/idassignuser/<int:user_id>")
def idassignuser(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('userinfo.html', user=user)



# @app.route('/newuser', methods=["POST"])
# def new_user(user_id):
#     user_id = User.query.get_or_404(user_id)
#     return render_template('useradd.html', user= user_id)



