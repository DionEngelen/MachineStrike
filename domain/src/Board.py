from mimetypes import init
from Player import Player
from Machine import Machine
from Tile import Tile

class Board():
    def __init__(self, players, machines, tiles, initialize_tiles = True):
        self.__players = players
        self.__machines = machines
        self.__tiles = tiles
        self.initialize_tiles = initialize_tiles
        if (initialize_tiles):
            for machine in machines:
                self.__tiles[machine.get_tile_position()].set_occupied(True)

    def get_players(self):
        return self.__players
    def get_machines(self):
        return self.__machines
    def get_tiles(self):
        return self.__tiles

    def perform_move(self, machine, facing, tile_destination):
        if self.get_players()[0].get_has_turn():
            if not self.get_players()[0].get_two_machines_were_played()\
            or (machine.get_moved() or machine.get_attacked() or machine.get_sprinted()):
                if machine in self.get_players()[0].get_machines():
                    if facing != machine.get_facing():
                        machine.turn(facing)
                    if not self.get_tiles()[tile_destination].get_occupied():
                        if (not machine.get_type() == "Swoop"
                        and not self.get_tiles()[tile_destination].get_landscape() == "chasm")\
                        or machine.get_type() == "Swoop":
                            if self.get_tiles()[machine.get_tile_position()].get_landscape() == "marsh"\
                            and not machine.get_type() == "Pull":
                                machine.set_movement_range(machine.get_marsh_movement_range())
                            if not tile_destination == machine.get_tile_position():
                                if machine.check_valid_move(tile_destination):
                                    if not machine.get_overcharged():
                                        machine.overcharge()
                                        self.get_tiles()[machine.get_tile_position()].set_occupied(False)
                                        if self.get_tiles()[machine.get_tile_position()].get_landscape() == "marsh"\
                                        and not machine.get_type() == "Pull"\
                                        and not self.get_tiles()[tile_destination] == "marsh":
                                            machine.set_movement_range(machine.get_regular_movement_range())
                                        machine.set_tile_position(tile_destination)
                                        self.get_tiles()[tile_destination].set_occupied(True)
                                        machine.set_moved(True)
                                        self.get_players()[0].check_end_turn()
        elif self.get_players()[1].get_has_turn():
            if not self.get_players()[1].get_two_machines_were_played()\
            or (machine.get_moved() or machine.get_attacked() or machine.get_sprinted()):
                if machine in self.get_players()[1].get_machines():
                    if facing != machine.get_facing():
                        machine.turn(facing)
                    if self.get_tiles()[machine.get_tile_position()].get_landscape() == "marsh"\
                            and not machine.get_type() == "Pull":
                                machine.set_movement_range(machine.get_marsh_movement_range())
                    if not self.get_tiles()[tile_destination].get_occupied():
                        if (not machine.get_type() == "Swoop"
                        and not self.get_tiles()[tile_destination].get_landscape() == "chasm")\
                        or machine.get_type() == "Swoop":
                            if not tile_destination == machine.get_tile_position():
                                if machine.check_valid_move(tile_destination):
                                    if not machine.get_overcharged():
                                        machine.overcharge()
                                        self.get_tiles()[machine.get_tile_position()].set_occupied(False)
                                        if self.get_tiles()[machine.get_tile_position()].get_landscape() == "marsh"\
                                        and not machine.get_type() == "Pull"\
                                        and not self.get_tiles()[tile_destination] == "marsh":
                                            machine.set_movement_range(machine.get_regular_movement_range())
                                        machine.set_tile_position(tile_destination)
                                        self.get_tiles()[tile_destination].set_occupied(True)
                                        machine.set_moved(True)
                                        self.get_players()[1].check_end_turn()

    def end_turn(self):
        players = self.get_players()
        if players[0].get_has_turn():
            self.reset_player1_actions(players[0], players[1])
            return
        self.reset_player2_actions(players[1], players[0])
            
    def reset_player1_actions(self, player_1, player_2):
        player_1.switch_turn(player_2)
        player_1.set_two_machines_were_played(False)
        
    def reset_player2_actions(self, player_2, player_1):
        player_2.switch_turn(player_1)
        player_2.set_two_machines_were_played(False)