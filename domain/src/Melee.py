from Machine import Machine

class Melee(Machine):
    def attack(self, other_machine):
        if self.get_type() == "Melee":
            match self.get_facing():
                case "front":
                    if (self.get_tile_position() - other_machine.get_tile_position()) % 8 == 0\
                    and self.get_tile_position() > other_machine.get_tile_position()\
                    and other_machine.get_tile_position() >= (self.get_tile_position() - (self.get_attack_range * 8)):
                        other_machine.set_health(other_machine.get_health() - self.get_attack())
                case "right":
                    if other_machine.get_tile_position() <= (self.get_tile_position() + self.get_attack_range())\
                    and other_machine.get_tile_position() > self.get_tile_position():
                        other_machine.set_health(other_machine.get_health() - self.get_attack())
                case "down":
                    if (other_machine.get_tile_position() - self.get_tile_position()) % 8 == 0\
                    and self.get_tile_position() < other_machine.get_tile_position()\
                    and other_machine.get_tile_position() <= (self.get_tile_position() + (self.get_attack_range * 8)):
                        other_machine.set_health(other_machine.get_health() - self.get_attack())
                case "left":
                    if other_machine.get_tile_position() >= (self.get_tile_position() - self.get_attack_range())\
                        and other_machine.get_tile_position() < self.get_tile_position():
                        other_machine.set_health(other_machine.get_health() - self.get_attack())