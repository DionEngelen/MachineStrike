from Machine import Machine

class Melee(Machine):
    def attack(self, other_machine):
        if self.get_type() == "Melee":
            match self.get_facing():
                case "front":
                    if (self.get_tile_position() - other_machine.get_tile_position()) % 8 == 0\
                    and self.get_tile_position() > other_machine.get_tile_position()\
                    and other_machine.get_tile_position() >= (self.get_tile_position() - (self.get_attack_range * 8)):
                        damage = self.get_attack()
                        other_machine.set_health(other_machine.get_health() - damage)
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

                        

# self.check_facing_of_attack(other_machine.get_facing())
            # facings = ["front", "right", "back", "left"]
            # facing_index = facings.index(other_machine.get_facing())
            # facing_towards_enemy_index = (facing_index + 2) % 4
            # facing_towards_enemy = facings[facing_towards_enemy_index]

# if facing_towards_enemy in other_machine.get_armor():
                        #     damage -= 1
                        # if facing_towards_enemy in other_machine.get_weak_spots():
                        #     damage += 1