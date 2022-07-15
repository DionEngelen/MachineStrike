from Machine import Machine

class Ram(Machine):
    def attack(self, other_machine, attack_buff):
        if self.check_within_attack_range(other_machine):
            armor_hit = self.check_armor(other_machine)
            weak_spot_hit = self.check_weak_spots(other_machine)
            self.deal_damage(attack_buff, armor_hit, weak_spot_hit, other_machine)

    def deal_damage(self, attack_buff, armor_hit, weak_spot_hit, enemy):
        damage = self.get_attack() - attack_buff + armor_hit + weak_spot_hit
        enemy_health = enemy.get_health()
        enemy.set_health(enemy_health - damage)

    def knock_back(self, other_machine):
        facings = ["front", "right", "back", "left"]
        knock_back_tile = [-8, 1, 8, -1]
        current_facing_index = facings.index(self.get_facing())
        new_enemy_tile = other_machine.get_tile_position() + knock_back_tile[current_facing_index]
        other_machine.set_tile_position(other_machine.get_tile_position() + knock_back_tile[current_facing_index]) #remove when method is finished
        # if not tiles[new_enemy_tile].get_occupied():
        #     other_machine.set_tile_position(other_machine.get_tile_position() + knock_back_tile[current_facing_index])