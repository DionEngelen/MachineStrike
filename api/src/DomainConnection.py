from flask import Flask, jsonify, request
from json import loads
from flask_cors import CORS
import sys
from APImysteries import mysteries

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

    for tileIndex, tile in enumerate(board["tiles"]):
        match tile:
            case "chasm":
                tile = {"index": tileIndex, "occupied": False, "landscape": "chasm", "attack_buff": -2}
            case "marsh":
                tile = {"index": tileIndex, "occupied": False, "landscape": "marsh", "attack_buff": -1}
            case "grassland":
                tile = {"index": tileIndex, "occupied": False, "landscape": "grassland", "attack_buff": 0}
            case "forest":
                tile = {"index": tileIndex, "occupied": False, "landscape": "forest", "attack_buff": 1}
            case "hill":
                tile = {"index": tileIndex, "occupied": False, "landscape": "hill", "attack_buff": 2}
            case "mountain":
                tile = {"index": tileIndex, "occupied": False, "landscape": "mountain", "attack_buff": 3}
        board["tiles"][tileIndex] = tile
    tiles = DomainModels.initiate_tiles(board["tiles"])

    machines = DomainModels.initiate_machines(machines_p1, machines_p2)
    both_machine_squads = [machines_p1, machines_p2]
    for machine_squad in both_machine_squads:
        for machine in machine_squad:
            machine["facing"] = "front"
            machine["active"] = True
            machine["moved"] = False
            machine["attacked"] = False
            machine["sprinted"] = False
            machine["overcharged"] = False
            if machine in machines_p1:
                machine["team"] = "player1"
            else:
                machine["team"] = "player2"
    
    players = DomainModels.initiate_players(player1, player2, machines_p1, machines_p2)
    both_players = [player1, player2]
    for player in both_players:
        if player == player1:
            player["has_turn"] = True
            player["machines"] = machines_p1
        else:
            player["has_turn"] = False
            player["machines"] = machines_p2
        player["two_machines_were_played"] = False
        player["victorypoints"] = 0
        player["won"] = False

    #board = DomainModels.initiate_board(players, machines, tiles)

    print(tiles[24].get_landscape())
    print(tiles[17].get_attack_buff())
    print(machines[1].get_name())
    print(machines[1].get_tile_position())
    print(players[0].get_name())
    print(players[0].get_machines()[0])
    #print(board.get_machines())

    return jsonify({'board': board, "player1": player1, "player2": player2, 'machinesp1': machines_p1, 'machinesp2': machines_p2})

@app.route("/playgame", methods = ["POST"])
def play_game():
    return "Hello3!"

if __name__ == "__main__":
    app.run(debug = True, port=4000)