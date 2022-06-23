class Machine():
    def __init__(self, name, points, type, health, attack, attack_range, movement_range, armor, weak_spots, ability):
        self.name = name
        self.points = points
        self.type = type
        self.health = health
        self.attack = attack
        self.attack_range = attack_range
        self.movement_range = movement_range
        self.armor = armor
        self.weak_spots = weak_spots
        self.ability = ability
        self.facing = "front"
        self.active = True
        self.moved_once = False
        self.attacked_once = False
        self.has_sprinted = False
        self.has_overcharged = False

    def set_health(self, health):
        self.health = health
    def set_attack(self, attack):
        self.attack = attack
    def set_facing(self, facing):
        self.facing = facing
    def set_active(self, active):
        self.active = active
    def set_moved_once(self, moved_once):
        self.moved_once = moved_once
    def set_attacked_once(self, attacked_once):
        self.attacked_once = attacked_once
    def set_has_sprinted(self, has_sprinted):
        self.has_sprinted = has_sprinted
    def set_has_overcharged(self, has_overcharged):
        self.has_overcharged = has_overcharged