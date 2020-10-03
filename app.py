from flask import Flask, redirect, flash, request ,render_template, session
from flask.signals import template_rendered
from flask.wrappers import Response 
from flask_debugtoolbar import DebugToolbarExtension
from surveys import sastifaction_survey as survey

app = Flask(__name__)
app.config['SECRET KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug= DebugToolbarExtension(app)

RESPONSES_KEY = "responses"

@app.route("/")
def home():
    return render_template("survey.html", survey =  survey)

@app.route("/begin", methods= ['POST'])
def redirect_survey():
    session[RESPONSES_KEY] = []
    return redirect("/questions/0")

@app.route("/answer", methods = ["POST"])
def answer_page():
    resp_choice = request.form['answer']
    responses = session[RESPONSES_KEY]
    responses.append(resp_choice)
    session[RESPONSES_KEY]= responses

    if(len(responses) == len(survey.question)):
        return redirect("/thanks")
    else:
        return redirect("/questions/{len(responses)}")

@app.route("/questions/<int:qid>")
def questions(qid):
    responses = session.get("RESPONSE_KEY")
    if (responses is None):
        return redirect("/")
    if(len(responses) == len(survey.questions)):
        return redirect("/thanks")
    if(len(responses) != qid):
        return redirect("/thanks")
    question = survey.questions[qid]
    return render_template("question.html", question_num=qid, question=question)



@app.route("/thanks")
def finished():
    return render_template("thanks.html")