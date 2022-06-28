from flask import Flask, jsonify, request
from json import loads
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods = ["POST", "GET"])
def index():
    return "Hello1!"

@app.route("/startgame", methods = ["POST"])
def start_game():
    data = request.get_json()
    board = data['currentBoard']
    machines_p1 = data['player1Machines']
    machines_p2 = data['player2Machines']
    return jsonify({'board': board, 'machinesp1': machines_p1, 'machinesp2': machines_p2})

@app.route("/playgame", methods = ["POST"])
def play_game():
    return "Hello3!"

if __name__ == "__main__":
    app.run(debug = True, port=4000)