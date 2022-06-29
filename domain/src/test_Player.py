import unittest
from Player import Player
from Machine import Machine
from Tile import Tile

class TestPlayer(unittest.TestCase):
    def setUp(self):
        tiles = []
        landscapes = [["forest", 1], ["hill", 2], ["mountain", 3], ["grassland", 0]]
        for tile in range(64):
            tiles.append(Tile(tile, False, landscapes[tile % 4][0], landscapes[tile % 4][1]))

        grazer = Machine("grazer", 1, "Ram", 4, 1, 1, 2, ["front"], ["left", "right"], "gallop", tiles[0].get_index(), "player1")
        clawstrider = Machine("clawstrider", 3, "Melee", 8, 3, 2, 3, ["front"], ["back"], "", tiles[1].get_index(), "player1")
        bristleback = Machine("bristleback", 2, "Ram", 4, 2, 2, 2, ["front"], ["back"], "spray", tiles[6].get_index(), "player2")
        widemaw = Machine("widemaw", 3, "Pull", 6, 3, 2, 2, ["front"], ["back"], "", tiles[4].get_index(), "player2")
        
        self.player1 = Player("Dion", True, [grazer, clawstrider])
        self.player2 = Player("John", False, [bristleback, widemaw])

    def tearDown(self):
        pass

    def test_player_getters(self):
        self.assertEqual("Dion", self.player1.get_name())
        self.assertEqual(False, self.player2.get_has_turn())
        self.assertEqual(True, self.player1.get_has_turn())
        self.assertEqual("widemaw", self.player2.get_machines()[1].get_name())
        self.assertEqual(["left", "right"], self.player1.get_machines()[0].get_weak_spots())

    def test_turn_machine(self):
        self.assertEqual("front", self.player1.get_machines()[1].get_facing())
        self.player1.get_machines()[1].turn("back")
        self.assertEqual("back", self.player1.get_machines()[1].get_facing())

if __name__ == "__main__":
    unittest.main()