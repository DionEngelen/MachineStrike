import sys
import json
import DomainModels
from APImysteries import mysteries

domain_path = mysteries.get('PATH_TO_DOMAIN')

sys.path.append(domain_path)
from Board import Board
from Machine import Machine
from Player import Player
from Tile import Tile

def play_machine(board, machine, facing, tile_destination):
    machines = list(map(make_machine, board["machines"]))
    board["players"][0]["machines"] = list(filter(lambda m: m.get_team() == "player1", machines))
    board["players"][1]["machines"] = list(filter(lambda m: m.get_team() == "player2", machines))
    players = list(map(make_player, board["players"]))
    tiles = list(map(make_tile, board["tiles"]))
    board = Board(players, machines, tiles, False)

    machine_object = make_machine(machine)
    for correct_machine in machines:
        if correct_machine.get_tile_position() == machine_object.get_tile_position():
            machine_object = correct_machine 

    board.perform_move(machine_object, facing, tile_destination)
    return board

def make_machine(machine_dict):
    return Machine(**machine_dict)

def make_player(player_dict):
    return Player(**player_dict)

def make_tile(tile_dict):
    return Tile(**tile_dict)