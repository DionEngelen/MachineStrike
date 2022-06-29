import sys
from APImysteries import mysteries

domain_path = mysteries.get('PATH_TO_DOMAIN')

sys.path.append(domain_path)
from Board import Board
from Machine import Machine
from Player import Player
from Tile import Tile

def initiate_tiles(tiles_array):
    tiles = []
    for tile in tiles_array:
        tiles.append(Tile(tile["index"], tile["occupied"], tile["landscape"], tile["attack_buff"]))
    return tiles

def initiate_machines(machines_p1, machines_p2):
    machines = []
    both_machine_squads = [machines_p1, machines_p2]
    for machine_squad in both_machine_squads:
        for machine in machine_squad:
            if machine in machines_p1:
                machine["team"] = "player1"
            else:
                machine["team"] = "player2"
            machines.append(Machine(machine["name"], machine["points"], machine["type"],\
            machine["health"], machine["attack"], machine["attack_range"],\
            machine["movement_range"], machine["armor"], machine["weak_spots"],\
            machine["ability"], machine["tile_position"], machine["team"]))
    return machines

def initiate_players(player1, player2, machines_p1, machines_p2):
    players = []
    both_players = [player1, player2]
    for player in both_players:
        if player == player1:
            player["has_turn"] = True
            player["machines"] = machines_p1
        else:
            player["has_turn"] = False
            player["machines"] = machines_p2
        players.append(Player(player["name"], player["has_turn"], player["machines"]))
    return players

# def initiate_board(players, machines, tiles):
#     board = Board(players, machines, tiles)
#     return board
