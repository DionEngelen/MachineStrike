from shutil import move
from Tile import Tile
#from Melee import Melee

class Machine():
    def __init__(self, name, points, type, health, attack, attack_range,
    movement_range, armor, weak_spots, ability, tile_position, team, facing = "front",
    active = True, moved = False, attacked = False, sprinted = False, overcharged = False):
        self.__name = name
        self.__points = points
        self.__type = type
        self.__health = health
        self.__attack = attack
        self.__attack_range = attack_range
        self.__movement_range = movement_range
        self.__regular_movement_range = movement_range
        self.__marsh_movement_range = movement_range - 1
        self.__armor = armor
        self.__weak_spots = weak_spots
        self.__ability = ability
        self.__facing = facing
        self.__active = active
        self.__moved = moved
        self.__attacked = attacked
        self.__sprinted = sprinted
        self.__overcharged = overcharged
        self.__tile_position = tile_position
        self.__team = team

    # def MachineFactory(self, name, points, type, health, attack, attack_range,
    # movement_range, armor, weak_spots, ability, tile_position, team, facing = "front",
    # active = True, moved = False, attacked = False, sprinted = False, overcharged = False):
    #     if type == "Melee":
    #         return Melee(self, name, points, type, health, attack, attack_range,
    #         movement_range, armor, weak_spots, ability, tile_position, team, facing = "front",
    #         active = True, moved = False, attacked = False, sprinted = False, overcharged = False) 

    def get_name(self):
        return self.__name
    def get_points(self):
        return self.__points
    def get_type(self):
        return self.__type
    def get_health(self):
        return self.__health
    def get_attack(self):
        return self.__attack
    def get_attack_range(self):
        return self.__attack_range
    def get_movement_range(self):
        return self.__movement_range
    def get_regular_movement_range(self):
        return self.__regular_movement_range
    def get_marsh_movement_range(self):
        return self.__marsh_movement_range
    def get_armor(self):
        return self.__armor
    def get_weak_spots(self):
        return self.__weak_spots
    def get_ability(self):
        return self.__ability
    def get_facing(self):
        return self.__facing
    def get_active(self):
        return self.__active
    def get_moved(self):
        return self.__moved
    def get_attacked(self):
        return self.__attacked
    def get_sprinted(self):
        return self.__sprinted
    def get_overcharged(self):
        return self.__overcharged
    def get_tile_position(self):
        return self.__tile_position
    def get_team(self):
        return self.__team

    def set_health(self, health):
        self.__health = health
    def set_attack(self, attack):
        self.__attack = attack
    def set_movement_range(self, movement_range):
        self.__movement_range = movement_range
    def set_armor(self, armor):
        for spot in range(len(armor)):
            self.__armor[spot] = armor[spot]
    def set_weak_spots(self, weak_spots):
        for spot in range(len(weak_spots)):
            self.__weak_spots[spot] = weak_spots[spot]
    def set_facing(self, facing):
        self.__facing = facing
    def set_active(self, active):
        self.__active = active
    def set_moved(self, moved_once):
        self.__moved = moved_once
    def set_attacked(self, attacked_once):
        self.__attacked = attacked_once
    def set_sprinted(self, has_sprinted):
        self.__sprinted = has_sprinted
    def set_overcharged(self, has_overcharged):
        self.__overcharged = has_overcharged
    def set_tile_position(self, tile_position):
        self.__tile_position = tile_position

    def turn(self, facing):
        if self.get_active():
            if facing != self.get_facing():
                self.set_facing(facing)

    def check_valid_move(self, tile_destination):
        valid_positions = []
        current_tile = self.get_tile_position()
        out_of_bounds_tiles = self.check_out_of_bounds(current_tile)
        for move_range in range(1, self.get_movement_range() + 1):
            valid_positions.append(current_tile - 8 * move_range)
            valid_positions.append(current_tile - move_range)
            valid_positions.append(current_tile + move_range)
            valid_positions.append(current_tile + 8 * move_range)
            if move_range > 1:
                valid_positions.append(current_tile + (-8 * move_range + 7 * (move_range - 1)))
                valid_positions.append(current_tile + (-8 * move_range + 9 * (move_range - 1)))
                valid_positions.append(current_tile + (8 * move_range - 7 * (move_range - 1)))
                valid_positions.append(current_tile + (8 * move_range - 9 * (move_range - 1)))
            if move_range > 2:
                valid_positions.append(current_tile + (-8 * move_range + 7 * (move_range - 2)))
                valid_positions.append(current_tile + (-8 * move_range + 9 * (move_range - 2)))
                valid_positions.append(current_tile + (8 * move_range - 7 * (move_range - 2)))
                valid_positions.append(current_tile + (8 * move_range - 9 * (move_range - 2)))
            if move_range > 3:
                valid_positions.append(current_tile + (-8 * move_range + 7 * (move_range - 3)))
                valid_positions.append(current_tile + (-8 * move_range + 9 * (move_range - 3)))
                valid_positions.append(current_tile + (8 * move_range - 7 * (move_range - 3)))
                valid_positions.append(current_tile + (8 * move_range - 9 * (move_range - 3)))
        for beyond_board_tile in list(valid_positions):
            if beyond_board_tile < 0 or beyond_board_tile > 63:
                valid_positions.remove(beyond_board_tile)
        for out_of_bounds_tile in out_of_bounds_tiles:
            if out_of_bounds_tile in valid_positions:
                valid_positions.remove(out_of_bounds_tile)
        if tile_destination in valid_positions:
            return True
        return False
    
    def check_out_of_bounds(self, current_tile):
        first_column = [0, 8, 16, 24, 32, 40, 48, 56]
        second_column = [1, 9, 17, 25, 33, 41, 49, 57]
        third_column = [2, 10, 18, 26, 34, 42, 50, 58]
        fourth_column = [3, 11, 19, 27, 35, 43, 51, 59]
        fifth_column = [4, 12, 20, 28, 36, 44, 52, 60]
        sixth_column = [5, 13, 21, 29, 37, 45, 53, 61]
        seventh_column = [6, 14, 22, 30, 38, 46, 54, 62]
        eighth_column = [7, 15, 23, 31, 39, 47, 55, 63]

        out_of_bounds_tiles = []
        for move_range in range(1, self.get_movement_range() + 1):
            if current_tile in first_column:
                out_of_bounds_tiles.append(current_tile - move_range)
                if move_range > 1:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 7 * (move_range - 1)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 9 * (move_range - 1)))
                if move_range > 2:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 7 * (move_range - 2)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 9 * (move_range - 2)))
                if move_range > 3:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 7 * (move_range - 3)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 9 * (move_range - 3)))
            if current_tile in eighth_column:
                out_of_bounds_tiles.append(current_tile + move_range)
                if move_range > 1:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 9 * (move_range - 1)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 7 * (move_range - 1)))
                if move_range > 2:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 9 * (move_range - 2)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 7 * (move_range - 2)))
                if move_range > 3:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 9 * (move_range - 3)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 7 * (move_range - 3)))

            if current_tile in second_column:
                if move_range > 1:
                    out_of_bounds_tiles.append(current_tile - move_range)
                if move_range > 2:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 7 * (move_range - 1)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 9 * (move_range - 1)))
                if move_range > 3:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 7 * (move_range - 2)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 9 * (move_range - 2)))
            if current_tile in seventh_column:
                if move_range > 1:
                    out_of_bounds_tiles.append(current_tile + move_range)
                if move_range > 2:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 9 * (move_range - 1)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 7 * (move_range - 1)))
                if move_range > 3:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 9 * (move_range - 2)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 7 * (move_range - 2)))

            if current_tile in third_column:
                if move_range > 2:
                    out_of_bounds_tiles.append(current_tile - move_range)
                if move_range > 3:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 7 * (move_range - 1)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 9 * (move_range - 1)))
            if current_tile in sixth_column:
                if move_range > 2:
                    out_of_bounds_tiles.append(current_tile + move_range)
                if move_range > 3:
                    out_of_bounds_tiles.append(current_tile + (-8 * move_range + 9 * (move_range - 1)))
                    out_of_bounds_tiles.append(current_tile + (8 * move_range - 7 * (move_range - 1)))

            if current_tile in fourth_column:
                if move_range > 3:
                    out_of_bounds_tiles.append(current_tile - move_range)
            if current_tile in fifth_column:
                if move_range > 3:
                    out_of_bounds_tiles.append(current_tile + move_range)
        return out_of_bounds_tiles
                    
    def overcharge(self):
        if self.get_active():
            if self.get_health() > 1 and (self.get_attacked() or self.get_moved() or self.get_sprinted()):
                self.set_overcharged(True)
                self.set_health(self.get_health() - 2)