from flask import Flask, jsonify, request
from json import loads
from flask_cors import CORS
import sys
from APImysteries import mysteries
import DomainModels

domain_path = mysteries.get('PATH_TO_DOMAIN')

sys.path.append(domain_path)
import DomainModels

app = Flask(__name__)
CORS(app)

@app.route("/", methods = ["POST", "GET"])
def index():
    return "Hello!"

@app.route("/startgame", methods = ["POST"])
def start_game():
    data = request.get_json()
    board = data['currentBoard']
    player1 = data['player1']
    player2 = data['player2']
    machines_p1 = data['player1Machines']
    machines_p2 = data['player2Machines']

    tiles = DomainModels.initiate_tiles(board["tiles"])
    machines = DomainModels.initiate_machines(machines_p1, machines_p2)
    players = DomainModels.initiate_players(player1, player2, machines)

    playboard = DomainModels.initiate_board(players, machines, tiles)
    jsonified_playboard = DomainModels.encode_board(playboard)

    return jsonify({"board": jsonified_playboard})

@app.route("/playgame", methods = ["POST"])
def play_game():
    data = request.get_json()
    board = data["board"]
    return jsonify(board)

if __name__ == "__main__":
    app.run(debug = True, port=4000)