class Machine():
    def __init__(self, name, points, type, health, attack, attack_range,
    movement_range, armor, weak_spots, ability, tile_position, team):
        self.__name = name
        self.__points = points
        self.__type = type
        self.__health = health
        self.__attack = attack
        self.__attack_range = attack_range
        self.__movement_range = movement_range
        self.__armor = armor
        self.__weak_spots = weak_spots
        self.__ability = ability
        self.__facing = "front"
        self.__active = True
        self.__moved = False
        self.__attacked = False
        self.__sprinted = False
        self.__overcharged = False
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

    def turn_left(self, number_of_turns):
        if self.get_active():
            for current_facing in range(number_of_turns):
                facing = self.get_facing()
                match facing:
                    case "front":
                        self.set_facing("left")
                    case "right":
                        self.set_facing("front")
                    case "back":
                        self.set_facing("right")
                    case "left":
                        self.set_facing("back")
            return self.get_facing()
        else:
            return

    def turn_right(self, number_of_turns):
        if self.get_active():
            for current_facing in range(number_of_turns):
                facing = self.get_facing()
                match facing:
                    case "front":
                        self.set_facing("right")
                    case "right":
                        self.set_facing("back")
                    case "back":
                        self.set_facing("left")
                    case "left":
                        self.set_facing("front")
            return self.get_facing()
        else:
            return

    def overcharge(self):
        if self.get_active():
            if self.get_health() >= 1:
                self.set_overcharged(True)
                self.set_moved(False)
                self.set_attacked(False)
                self.set_sprinted(False)
                self.set_health(self.get_health() - 2)