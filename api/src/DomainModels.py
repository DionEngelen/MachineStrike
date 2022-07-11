import sys
from APImysteries import mysteries

domain_path = mysteries.get('PATH_TO_DOMAIN')

sys.path.append(domain_path)
from Board import Board
from Machine import Machine
# from Melee import Melee
# from Gunner import Gunner
# from Ram import Ram
# from Dash import Dash
# from Swoop import Swoop
# from Pull import Pull
from Player import Player
from Tile import Tile

def initiate_tiles(tiles_array):
    tiles = []
    for tileIndex, tile in enumerate(tiles_array):
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
        tiles_array[tileIndex] = tile
        tiles.append(Tile(tile["index"], tile["occupied"], tile["landscape"], tile["attack_buff"]))
    return tiles

def encode_tile(tile):
    if isinstance(tile, Tile):
        return {"index": tile.get_index(), "occupied": tile.get_occupied(),\
        "landscape": tile.get_landscape(), "attack_buff": tile.get_attack_buff()}
    raise TypeError(f"Object {tile} is not of type Tile.")

def encode_tiles(tiles):
    jsonified_tiles = []
    for tile in tiles:
        jsonified_tiles.append(encode_tile(tile))
    return jsonified_tiles

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

def encode_machine(machine):
    if isinstance(machine, Machine):
        return {"name": machine.get_name(), "points": machine.get_points(),\
        "type": machine.get_type(), "health": machine.get_health(),\
        "attack": machine.get_attack(), "attack_range": machine.get_attack_range(),\
        "movement_range": machine.get_movement_range(), "armor": machine.get_armor(),\
        "weak_spots": machine.get_weak_spots(), "ability": machine.get_ability(),\
        "facing": machine.get_facing(), "active": machine.get_active(),\
        "moved": machine.get_moved(), "attacked": machine.get_attacked(),\
        "sprinted": machine.get_sprinted(), "overcharged": machine.get_overcharged(),\
        "tile_position": machine.get_tile_position(), "team": machine.get_team()}
    else:
        return machine

def encode_machines(machines):
    jsonified_machines = []
    for machine in machines:
        jsonified_machines.append(encode_machine(machine))
    return jsonified_machines

def initiate_players(player1, player2, machines):
    players = []
    machines_p1 = []
    machines_p2 = []
    both_players = [player1, player2]
    for machine in machines:
        if machine.get_team() == "player1":
            machines_p1.append(machine)
        else:
            machines_p2.append(machine)
    jsonified_machines_p1 = encode_machines(machines_p1)
    jsonified_machines_p2 = encode_machines(machines_p2)
    for player in both_players:
        if player == player1:
            player["has_turn"] = True
            player["machines"] = jsonified_machines_p1
        else:
            player["has_turn"] = False
            player["machines"] = jsonified_machines_p2
        players.append(Player(player["name"], player["has_turn"], player["machines"]))
    return players

def encode_player(player):
    if isinstance(player, Player):
        return {"name": player.get_name(), "has_turn": player.get_has_turn(),\
        "machines": list(map(encode_machine, player.get_machines())), "two_machines_were_played": player.get_two_machines_were_played(),\
        "victorypoints": player.get_victorypoints(), "won": player.get_won()}
    raise TypeError(f"Object {player} is not of type Player.")

def encode_players(players):
    jsonified_players = []
    for player in players:
        jsonified_players.append(encode_player(player))
    return jsonified_players

def initiate_board(players, machines, tiles):
    board = Board(players, machines, tiles)
    return board

def encode_board(board):
    if isinstance(board, Board):
        return {"players": encode_players(board.get_players()), "machines": encode_machines(board.get_machines()), "tiles": encode_tiles(board.get_tiles())}
    raise TypeError(f"Object {board} is not of type Board.")