from flask import Flask,  render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from stories import stry

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"
debug = DebugToolbarExtension(app)


@app.route("/")
def ask_questions():
    prompts = story.prompts 

    return render_template("questions.html", prompts = prompts

@app.route("/story")
def show_story():
    text = story.generate(request.args)
    return render_template("basic-story.html",text = text)
# @app.route("/questions")
# def questions():
#     story_id = request.args["story_id"]