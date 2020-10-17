from boggle import Boggle
from flask import  Flask, render_template, request,jsonify, session
from unittest import TestCase

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

boggle_game = Boggle()

@app.route("/")
def show_story():
    game_board = boggle_game.make_board();
    session['game_board'] = game_board
    highschore = session.get('highscore')
    nplays = session.get('nplays', 0)
    return render_template('base.html', board= game_board, highschore=highschore, nplays= nplays)

