from Machine import Machine

class Gunner(Machine):
    def attack(self, other_machine, attack_buff):
        if self.check_at_attack_range(other_machine):
            armor_hit = self.check_armor(other_machine)
            weak_spot_hit = self.check_weak_spots(other_machine)
            self.deal_damage(attack_buff, armor_hit, weak_spot_hit, other_machine)

    def deal_damage(self, attack_buff, armor_hit, weak_spot_hit, enemy):
        damage = self.get_attack() - attack_buff + armor_hit + weak_spot_hit
        enemy_health = enemy.get_health()
        enemy.set_health(enemy_health - damage)

    def check_at_attack_range(self, other_machine):
        facings = ["front", "right", "back", "left"]
        attack_tile_interval = [-8, 1, 8, -1]
        current_facing_index = facings.index(self.get_facing())
        checked_tile = self.get_tile_position() + attack_tile_interval[current_facing_index] * self.get_attack_range()
        if other_machine.get_tile_position() == checked_tile:
            return True
        return False