from Machine import Machine

class Gunner(Machine):
    def attack(self, other_machine, attack_buff):
        if self.get_type() == "Gunner":
            if self.check_at_attack_range(other_machine):
                damage_facing = self.check_armor_and_weak_spots(other_machine)
                damage = self.get_attack() - attack_buff + damage_facing
                other_machine.set_health(other_machine.get_health() - damage)

    def check_at_attack_range(self, other_machine):
        facings = ["front", "right", "back", "left"]
        attack_tile_interval = [-8, 1, 8, -1]
        current_facing_index = facings.index(self.get_facing())
        checked_tile = self.get_tile_position() + attack_tile_interval[current_facing_index] * self.get_attack_range()
        if other_machine.get_tile_position() == checked_tile:
            return True
        return False