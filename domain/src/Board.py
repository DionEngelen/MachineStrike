from Player import Player
from Machine import Machine
from Tile import Tile

class Board():
    def __init__(self, players, machines, tiles):
        self.__players = players
        self.__machines = machines
        self.__tiles = tiles
        for machine in machines:
            self.__tiles[machine.get_tile_position()].set_occupied(True)

    def get_players(self):
        return self.__players
    def get_machines(self):
        return self.__machines
    def get_tiles(self):
        return self.__tiles

    def remove_machine(self, machine):
        self.__machines.pop(machine)

    def perform_move(self, machine, facing, tile_destination):
        if self.get_players()[0].get_has_turn():
            if machine in self.get_players()[0].get_machines():
                if not machine.get_overcharged():
                    machine.overcharge()
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
                                    self.get_tiles()[machine.get_tile_position()].set_occupied(False)
                                    if self.get_tiles()[machine.get_tile_position()].get_landscape() == "marsh"\
                                    and not machine.get_type() == "Pull"\
                                    and not self.get_tiles()[tile_destination] == "marsh":
                                        machine.set_movement_range(machine.get_regular_movement_range())
                                    machine.set_tile_position(tile_destination)
                                    self.get_tiles()[tile_destination].set_occupied(True)
                                    machine.set_moved(True)
                return "correct machinelist"
            else:
                return "machine not from this player"
        elif self.get_players()[1].get_has_turn():
            if machine in self.get_players()[1].get_machines():
                if not machine.get_overcharged():
                    machine.overcharge()
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
                                    self.get_tiles()[machine.get_tile_position()].set_occupied(False)
                                    if self.get_tiles()[machine.get_tile_position()].get_landscape() == "marsh"\
                                    and not machine.get_type() == "Pull"\
                                    and not self.get_tiles()[tile_destination] == "marsh":
                                        machine.set_movement_range(machine.get_regular_movement_range())
                                    machine.set_tile_position(tile_destination)
                                    self.get_tiles()[tile_destination].set_occupied(True)
                                    machine.set_moved(True)
                return "correct machinelist"
            else:
                return "machine not from this player"