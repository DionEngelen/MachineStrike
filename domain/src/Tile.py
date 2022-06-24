class Tile():
    def __init__(self, index, occupied, landscape, attack_buff):
        self.__index = index
        self.__occupied = occupied
        self.__landscape = landscape
        self.__attack_buff = attack_buff

    def get_index(self):
        return self.__index
    def get_occupied(self):
        return self.__occupied
    def get_landscape(self):
        return self.__landscape
    def get_attack_buff(self):
        return self.__attack_buff

    def set_occupied(self, occupied):
        self.__occupied = occupied
    def set_landscape(self, landscape, attack_buff):
        self.__landscape = landscape
        self.__attack_buff = attack_buff
        

    def prohibit_move(self):
        if (self.__occupied):
            return True
        else:
            return False
