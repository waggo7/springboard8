from flask import Flask,request,flash, session,render_template, redirect,url_for,jsonify
from models import db, connect_db, User, Post

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
#app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


connect_db(app)
db.create_all()

@app.route('/')
def land():
    return render_template('landing.html')

@app.errorhandler(404)
def page_not_found(e):
    """Show 404 NOT FOUND page."""

    return render_template('404.html'), 404

@app.route('/user')
def user_home_page():
    return render_template('user/index.html')

@app.route('/user/newuser',  methods=["GET"])
def new_user():
    return render_template('user/newuser.html')#,  User=user)

@app.route('/user/adduser', methods=["GET"])
def login():
    user = User.query.order_by(User.last_name,User.first_name).all()
    return render_template("user/index.html", User=user)

@app.route("/user/checkuser", methods=["GET"])
def user_get_check():
    return render_template('user/newuser.html')
    
@app.route("/user/checkuser", methods=["POST"])
def user_check():
    new_user=User(
        first_name= request.form['first_name'],
        last_name= request.form['last_name'],
        image_url = request.form['image_url']or None)
    db.session.add(new_user)
    db.session.commit()
    return redirect('/user/adduser')#, user = new_user)
    #return render_template("userpage.html", User=new_user)

@app.route('/user/<int:user_id>')
def users_show(user_id):

    user = User.query.get_or_404(user_id)
    return render_template('user/userpage.html', User=user)

@app.route("/user/<int:user_id>/edit")
def id_asign(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('user/edit.html',  User= user)


@app.route("/user/<int:user_id>/edit")
def user_edit(user_id):
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()
    return redirect('/user/adduser')

@app.route("/user/<int:user_id>/delete", methods=["POST"])
def delete(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect("/user/adduser")

################################POSTS########################
@app.route("/post/home")
def show_post():

    return render_template('post/home.html')

@app.route("/user/<int:user_id>/post/new")
def newuser_postid(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('/post/index.html', User=user)


@app.route("/user/<int:user_id>/posts/new", methods=["POST"])
def newuser_post(user_id):
    user = User.query.get_or_404(user_id)
    new_post = Post(
        title=request.form['title'],
        content=request.form['content']
            )
    db.session.add(new_post)
    db.session.commit()
    return redirect(f'/user/<{user_id}')

@app.route("/user/<int:post_id>")
def showpost(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post/home.html', post =post)
        
@app.route("/post/<int:post_id>/edit")
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post/edit.html', post =post)

@app.route("/post/<int:post_id>/edit", methods=["POST"])
def edituser_post(post_id):
    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    return redirect('/post/<int:post_id>', post=post)

@app.route("/post/<int:post_id>/delete",methods=["POST"])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return redirect('post/<int:post_id>')
        
