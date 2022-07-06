from Machine import Machine

class Player():
    def __init__(self, name, has_turn, machines,
    two_machines_were_played = False, victorypoints = 0, won = False):
        self.__name = name
        self.__has_turn = has_turn
        self.__machines = machines
        self.__two_machines_were_played = two_machines_were_played
        self.__victorypoints = victorypoints
        self.__won = won

    def get_name(self):
        return self.__name
    def get_has_turn(self):
        return self.__has_turn
    def get_machines(self):
        return self.__machines
    def get_two_machines_were_played(self):
        return self.__two_machines_were_played
    def get_victorypoints(self):
        return self.__victorypoints
    def get_won(self):
        return self.__won

    def set_name(self, name):
        self.__name =name
    def set_has_turn(self, has_turn):
        self.__has_turn = has_turn
    def set_machines(self, machines):
        self.__machines = machines
    def set_two_machines_were_played(self, two_machines_were_played):
        self.__two_machines_were_played = two_machines_were_played
    def set_victorypoints(self, victorypoints):
        self.__victorypoints = victorypoints
    def set_won(self, won):
        self.__won = won

    def check_end_turn(self):
        machines_played = 0
        for machine in self.get_machines():
            if machine.get_moved() or machine.get_attacked() or machine.get_sprinted():
                machines_played += 1
        if machines_played >= 2:
            self.set_two_machines_were_played(True)

    def switch_turn(self, other_player):
        if self.get_has_turn() and self.get_two_machines_were_played():
            self.set_has_turn(False)
            other_player.set_has_turn(True)
            self.set_two_machines_were_played(False)
            for machine in self.get_machines():
                machine.set_moved(False)
                machine.set_attacked(False)
                machine.set_sprinted(False)
                machine.set_overcharged(False)