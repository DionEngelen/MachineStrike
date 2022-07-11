from Machine import Machine

class Melee(Machine):
    def attack(self, other_machine, attack_buff):
        if self.get_type() == "Melee":
            if self.check_within_attack_range(other_machine):
                damage_facing = self.check_armor_and_weak_spots(other_machine)
                damage = self.get_attack() - attack_buff + damage_facing
                other_machine.set_health(other_machine.get_health() - damage)