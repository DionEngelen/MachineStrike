from Machine import Machine

class Swoop(Machine):
    def attack(self, other_machine, attack_buff):
        if self.check_within_attack_range(other_machine):
            armor_hit = self.check_armor(other_machine)
            weak_spot_hit = self.check_weak_spots(other_machine)
            self.deal_damage(attack_buff, armor_hit, weak_spot_hit, other_machine)

    def deal_damage(self, attack_buff, armor_hit, weak_spot_hit, enemy):
        damage = self.get_attack() - attack_buff + armor_hit + weak_spot_hit
        enemy_health = enemy.get_health()
        enemy.set_health(enemy_health - damage)

    def move_next_to_enemy(self, enemy):
        pass