from Machine import Machine

class Ram(Machine):
    def attack(self, other_machine, attack_buff):
        if self.get_type() == "Ram":
            if self.check_within_attack_range(other_machine):
                damage_facing = self.check_armor_and_weak_spots(other_machine)
                damage = self.get_attack() - attack_buff + damage_facing
                other_machine.set_health(other_machine.get_health() - damage)

    def knock_back(self, other_machine):
        facings = ["front", "right", "back", "left"]
        knock_back_tile = [-8, 1, 8, -1]
        current_facing_index = facings.index(self.get_facing())
        new_enemy_tile = other_machine.get_tile_position() + knock_back_tile[current_facing_index]
        # if not tiles[new_enemy_tile].get_occupied():
        #     other_machine.set_tile_position(other_machine.get_tile_position() + knock_back_tile[current_facing_index])