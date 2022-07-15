from shutil import move
from Tile import Tile
#from Melee import Melee

class Machine():
    facings = ["front", "right", "back", "left"]
    tile_interval = [-8, 1, 8, -1]

    first_column = [0, 8, 16, 24, 32, 40, 48, 56]
    second_column = [1, 9, 17, 25, 33, 41, 49, 57]
    third_column = [2, 10, 18, 26, 34, 42, 50, 58]
    fourth_column = [3, 11, 19, 27, 35, 43, 51, 59]
    fifth_column = [4, 12, 20, 28, 36, 44, 52, 60]
    sixth_column = [5, 13, 21, 29, 37, 45, 53, 61]
    seventh_column = [6, 14, 22, 30, 38, 46, 54, 62]
    eighth_column = [7, 15, 23, 31, 39, 47, 55, 63]
        
    columns = [first_column, second_column, third_column,\
    fourth_column, fifth_column, sixth_column,\
    seventh_column, eighth_column]

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
        if self.get_active() and not facing == self.get_facing():
            self.set_facing(facing)

    def check_valid_move(self, tile_destination):
        current_tile = self.get_tile_position()
        move_range = self.get_movement_range()
        if tile_destination in self.check_valid_positions(move_range, current_tile):
            return True
        return False
        
    def check_valid_positions(self, move_range, current_tile):
        out_of_bounds_tiles = self.check_out_of_bounds(current_tile)
        valid_positions = Machine.fill_valid_positions(move_range, current_tile)
        valid_positions = Machine.filter_positions(valid_positions, out_of_bounds_tiles)
        return valid_positions
        
    def fill_valid_positions(move_range, current_tile):
        valid_positions = []
        valid_positions = Machine.check_for_move_1(move_range, current_tile, valid_positions)
        return valid_positions
        
    def check_for_move_1(move_range, current_tile, valid_positions):
        valid_positions = Machine.fill_positions_move_1(move_range, current_tile, valid_positions)
        if move_range > 1:
            Machine.check_for_move_2(move_range, current_tile, valid_positions)
            Machine.check_for_move_1(move_range - 1, current_tile, valid_positions)
        return valid_positions
            
    def check_for_move_2(move_range, current_tile, valid_positions):
        valid_positions = Machine.fill_positions_move_2(move_range, current_tile, valid_positions)
        if move_range > 2:
            Machine.check_for_move_3(move_range, current_tile, valid_positions)
            Machine.check_for_move_1(move_range - 1, current_tile, valid_positions)
            
    def check_for_move_3(move_range, current_tile, valid_positions):
        valid_positions = Machine.fill_positions_move_3(move_range, current_tile, valid_positions)
        if move_range > 3:
            Machine.check_for_move_4(move_range, current_tile, valid_positions)
            
    def check_for_move_4(move_range, current_tile, valid_positions):
        valid_positions = Machine.fill_positions_move_4(move_range, current_tile, valid_positions)
        Machine.check_for_move_1(move_range - 1, current_tile, valid_positions)
        
        
        
        
    def fill_positions_move_1(move_range, current_tile, valid_positions):
        valid_positions.append(current_tile - 8 * move_range)
        valid_positions.append(current_tile - move_range)
        valid_positions.append(current_tile + move_range)
        valid_positions.append(current_tile + 8 * move_range)
        return valid_positions
        
    def fill_positions_move_2(move_range, current_tile, valid_positions):
        valid_positions.append(current_tile + (-8 * move_range + 7 * (move_range - 1)))
        valid_positions.append(current_tile + (-8 * move_range + 9 * (move_range - 1)))
        valid_positions.append(current_tile + (8 * move_range - 7 * (move_range - 1)))
        valid_positions.append(current_tile + (8 * move_range - 9 * (move_range - 1)))
        return valid_positions
                    
    def fill_positions_move_3(move_range, current_tile, valid_positions):
        valid_positions.append(current_tile + (-8 * move_range + 7 * (move_range - 2)))
        valid_positions.append(current_tile + (-8 * move_range + 9 * (move_range - 2)))
        valid_positions.append(current_tile + (8 * move_range - 7 * (move_range - 2)))
        valid_positions.append(current_tile + (8 * move_range - 9 * (move_range - 2)))
        return valid_positions
                    
    def fill_positions_move_4(move_range, current_tile, valid_positions):
        valid_positions.append(current_tile + (-8 * move_range + 7 * (move_range - 3)))
        valid_positions.append(current_tile + (-8 * move_range + 9 * (move_range - 3)))
        valid_positions.append(current_tile + (8 * move_range - 7 * (move_range - 3)))
        valid_positions.append(current_tile + (8 * move_range - 9 * (move_range - 3)))
        return valid_positions
        
        
        
    def filter_positions(valid_positions, out_of_bounds_tiles):
        valid_positions = Machine.filter_beyond_board_tiles(valid_positions)
        valid_positions = Machine.filter_out_of_bounds_tiles(valid_positions, out_of_bounds_tiles)
        return valid_positions
        
    def filter_beyond_board_tiles(valid_positions):
        for beyond_board_tile in list(valid_positions):
            valid_positions = Machine.remove_beyond_board_tile(valid_positions, beyond_board_tile)
        return valid_positions
        
    def filter_out_of_bounds_tiles(valid_positions, out_of_bounds_tiles):
        for out_of_bounds_tile in out_of_bounds_tiles:
            valid_positions = Machine.remove_out_of_bounds_tile(valid_positions, out_of_bounds_tile)
        return valid_positions
        
    def remove_beyond_board_tile(valid_positions, beyond_board_tile):
        if beyond_board_tile < 0 or beyond_board_tile > 63:
            valid_positions.remove(beyond_board_tile)
        return valid_positions

    def remove_out_of_bounds_tile(valid_positions, out_of_bounds_tile):
        if out_of_bounds_tile in valid_positions:
            valid_positions.remove(out_of_bounds_tile)
        return valid_positions






    def check_out_of_bounds(self, current_tile):
        column = Machine.check_which_column(current_tile, 0)
        out_of_bounds_tiles = []
        move_range = self.get_movement_range()
        out_of_bounds_tiles = Machine.check_tiles_for_column(column, current_tile, move_range, move_range, out_of_bounds_tiles)
        return out_of_bounds_tiles
    
    def check_which_column(current_tile, index):
        column = Machine.columns[index]
        checked_column = Machine.check_current_column(column, current_tile)
        good_column = Machine.check_correct_column(checked_column, current_tile, index)
        return good_column
            
    def check_current_column(column, current_tile):
        if current_tile in column:
            return column
        return None

    def check_correct_column(candidate_column, current_tile, index):
        columns = Machine.columns
        if candidate_column == None:
            checked_column = Machine.check_current_column(columns[index + 1], current_tile)
            candidate_column = Machine.check_correct_column(checked_column, current_tile, index + 1)
        return candidate_column
            
    def check_tiles_for_column(column, current_tile, move_range, total_range, o_o_b_t):
        columns = Machine.columns
        column_index = columns.index(column)
        if column_index <= 3:
            return Machine.check_tiles_move_0_left(current_tile, move_range, total_range, column_index, o_o_b_t)
        return Machine.check_tiles_move_0_right(current_tile, move_range, total_range, column_index, o_o_b_t)
            
            
            


    def check_tiles_move_0_left(current_tile, move_range, total_range, column_index, o_o_b_t):
        if move_range > 0 and column_index < total_range:
            o_o_b_t.append(current_tile - move_range)
            Machine.check_tiles_move_1_left(current_tile, move_range, total_range, column_index, o_o_b_t)
        return o_o_b_t        
            
    def check_tiles_move_1_left(current_tile, move_range, total_range, column_index, o_o_b_t):
        if move_range > 1 and column_index < total_range - 1:
            Machine.check_tiles_move_2_left(current_tile, move_range, total_range, column_index, o_o_b_t)
            Machine.check_tiles_move_0_left(current_tile, move_range - 1, total_range, column_index + 1, o_o_b_t)
        
    def check_tiles_move_2_left(current_tile, move_range, total_range, column_index, o_o_b_t):
        o_o_b_t.append(current_tile + (-8 * move_range + 7 * (move_range - 1)))
        o_o_b_t.append(current_tile + (8 * move_range - 9 * (move_range - 1)))
        if move_range > 2 and column_index < total_range - 2:
            Machine.check_tiles_move_3_left(current_tile, move_range, total_range, column_index, o_o_b_t)
            Machine.check_tiles_move_0_left(current_tile, move_range - 1, total_range, column_index + 1, o_o_b_t)
            
    def check_tiles_move_3_left(current_tile, move_range, total_range, column_index, o_o_b_t):
        o_o_b_t.append(current_tile + (-8 * move_range + 7 * (move_range - 2)))
        o_o_b_t.append(current_tile + (8 * move_range - 9 * (move_range - 2)))
        if move_range > 3 and column_index < total_range - 3:
            Machine.check_tiles_move_4_left(current_tile, move_range - 1, total_range, column_index, o_o_b_t)
            
    def check_tiles_move_4_left(current_tile, move_range, total_range, column_index, o_o_b_t):
        o_o_b_t.append(current_tile + (-8 * move_range + 7 * (move_range - 3)))
        o_o_b_t.append(current_tile + (8 * move_range - 9 * (move_range - 3)))
        Machine.check_tiles_move_0_left(current_tile, move_range - 1, total_range, column_index + 1, o_o_b_t)
        
        
        
        
    def check_tiles_move_0_right(current_tile, move_range, total_range, column_index, o_o_b_t):
        if move_range > 0 and column_index > 7 - total_range:
            o_o_b_t.append(current_tile + move_range)
            Machine.check_tiles_move_1_right(current_tile, move_range, total_range, column_index, o_o_b_t)
        return o_o_b_t
        
    def check_tiles_move_1_right(current_tile, move_range, total_range, column_index, o_o_b_t):
        if move_range > 1 and column_index > 8 - total_range:
            Machine.check_tiles_move_2_right(current_tile, move_range, total_range, column_index, o_o_b_t)
            Machine.check_tiles_move_0_right(current_tile, move_range - 1, total_range, column_index - 1, o_o_b_t)
        
    def check_tiles_move_2_right(current_tile, move_range, total_range, column_index, o_o_b_t):
        o_o_b_t.append(current_tile + (-8 * move_range + 9 * (move_range - 1)))
        o_o_b_t.append(current_tile + (8 * move_range - 7 * (move_range - 1)))
        if move_range > 2 and column_index > 9 - total_range:
            Machine.check_tiles_move_3_right(current_tile, move_range, total_range, column_index, o_o_b_t)
            Machine.check_tiles_move_0_right(current_tile, move_range - 1, total_range, column_index - 1, o_o_b_t)
            
    def check_tiles_move_3_right(current_tile, move_range, total_range, column_index, o_o_b_t):
        o_o_b_t.append(current_tile + (-8 * move_range + 9 * (move_range - 2)))
        o_o_b_t.append(current_tile + (8 * move_range - 7 * (move_range - 2)))
        if move_range > 3 and column_index > 10 - total_range:
            Machine.check_tiles_move_4_right(current_tile, move_range - 1, total_range, column_index, o_o_b_t)
            
    def check_tiles_move_4_right(current_tile, move_range, total_range, column_index, o_o_b_t):
        o_o_b_t.append(current_tile + (-8 * move_range + 9 * (move_range - 3)))
        o_o_b_t.append(current_tile + (8 * move_range - 7 * (move_range - 3)))
        Machine.check_tiles_move_0_right(current_tile, move_range - 1, total_range, column_index - 1, o_o_b_t)
                    
    def overcharge(self):
        health = self.get_health()
        if self.get_active() and health > 1\
        and (self.get_attacked() or self.get_moved() or self.get_sprinted()):
            self.set_overcharged(True)
            self.set_health(health - 2)

    def check_armor(self, other_machine):
        enemy_facing_index = other_machine.get_facing_index()
        armor = self.get_facing_based_armor(other_machine, enemy_facing_index)
        match = self.check_match_in_armor(armor)
        return match

    def get_facing_based_armor(self, enemy, facing_index):
        facings = Machine.facings
        facing_based_armor = self.fill_armor(facings, enemy, facing_index)
        return facing_based_armor

    def fill_armor(self, facings, enemy, facing_index):
        facing_based_armor = []
        for armor in enemy.get_armor():
            armor_index = facings.index(armor)
            facing_based_armor.append(facings[(armor_index + facing_index) % 4])
        return facing_based_armor

    def check_match_in_armor(self, armor):
        facings = Machine.facings
        current_facing = self.get_facing()
        if facings[((facings.index(current_facing) + 2) % 4)] in armor:
            return -1
        return 0


    def check_weak_spots(self, other_machine):
        enemy_facing_index = other_machine.get_facing_index()
        weak_spots = self.get_facing_based_weak_spots(other_machine, enemy_facing_index)
        match = self.check_match_in_weak_spots(weak_spots)
        return match

    def get_facing_based_weak_spots(self, enemy, facing_index):
        facings = Machine.facings
        facing_based_weak_spots = self.fill_weak_spots(facings, enemy, facing_index)
        return facing_based_weak_spots

    def fill_weak_spots(self, facings, enemy, facing_index):
        facing_based_weak_spots = []
        for weak_spot in enemy.get_weak_spots():
            weak_spot_index = facings.index(weak_spot)
            facing_based_weak_spots.append(facings[(weak_spot_index + facing_index) % 4])
        return facing_based_weak_spots

    def check_match_in_weak_spots(self, weak_spots):
        facings = Machine.facings
        current_facing = self.get_facing()
        if facings[((facings.index(current_facing) + 2) % 4)] in weak_spots:
            return 1
        return 0

    def check_within_attack_range(self, enemy):
        facing_index = self.get_facing_index()
        current_tile = self.get_tile_position()
        tiles_to_check = self.check_attack_tiles(facing_index, current_tile)
        match = self.check_for_enemy(tiles_to_check, enemy)
        return match
        
    def get_facing_index(self):
        facings = Machine.facings
        facing = self.get_facing()
        return facings.index(facing)

    def check_attack_tiles(self, facing_index, tile):
        tiles = []
        tile_interval = Machine.tile_interval[facing_index]
        for attack_tile in range(1, self.get_attack_range() + 1):
            tiles.append(tile + tile_interval * attack_tile)
        return tiles        

    def check_for_enemy(self, tiles, enemy):
        if enemy.get_tile_position() in tiles:
            return True
        return False

        

    def check_armor_break(self, enemy):
        pass

    def armor_break(self, enemy):
        self.break_armor(enemy)
        self.push_back(enemy)

    def break_armor(self, enemy):
        attacker_health = self.get_health()
        defender_health = enemy.get_health()
        self.set_health(attacker_health - 1)
        enemy.set_health(defender_health - 1)

    def push_back(self, enemy):
        pass