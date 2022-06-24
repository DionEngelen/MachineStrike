import unittest
from Machine import Machine
from Tile import Tile

class TestMachine(unittest.TestCase):
    def setUp(self):
        tiles = []
        landscapes = [["forest", 1], ["hill", 2], ["mountain", 3], ["grassland", 0]]
        for tile in range(64):
            tiles.append(Tile(tile, False, landscapes[tile % 4][0], landscapes[tile % 4][1]))
        self.grazer = Machine("grazer", 1, "Ram", 4, 1, 1, 2, ["front"], ["left", "right"], "gallop", tiles[0].get_index(), "player1")
        self.clawstrider = Machine("clawstrider", 3, "Melee", 8, 3, 2, 3, ["front"], ["back"], "", tiles[1].get_index(), "player1")

    def tearDown(self):
        pass

    def test_machine_getters(self):
        self.assertEqual("grazer", self.grazer.get_name())
        self.assertEqual("Ram", self.grazer.get_type())
        self.assertEqual(False, self.grazer.get_overcharged())
        self.assertEqual(["front"], self.grazer.get_armor())
        self.assertEqual("gallop", self.grazer.get_ability())
        self.assertEqual(False, self.grazer.get_attacked())
        self.assertEqual(1, self.grazer.get_attack_range())
        self.assertEqual(1, self.grazer.get_points())

    def test_machine_setters(self):
        self.assertEqual(True, self.grazer.get_active())
        self.assertEqual(4, self.grazer.get_health())
        self.grazer.set_active(False)
        self.grazer.set_facing("left")
        self.grazer.set_health(self.grazer.get_health() - 2)
        self.assertEqual("Ram", self.grazer.get_type())
        self.assertEqual(False, self.grazer.get_overcharged())
        self.assertEqual(["front"], self.grazer.get_armor())
        self.assertEqual(False, self.grazer.get_active())
        self.assertEqual("left", self.grazer.get_facing())
        self.assertEqual(2, self.grazer.get_health())

    def test_if_machine_turns(self):
        self.assertEqual("front", self.grazer.get_facing())
        self.grazer.turn_left(1)
        self.assertEqual("left", self.grazer.get_facing())
        self.grazer.turn_right(3)
        self.assertEqual("back", self.grazer.get_facing())
        self.grazer.turn_right(5)
        self.assertEqual("left", self.grazer.get_facing())
        self.grazer.turn_left(2)
        self.assertEqual("right", self.grazer.get_facing())

    def test_overcharge(self):
        self.grazer.overcharge()
        self.assertEqual(2, self.grazer.get_health())
        self.assertEqual(True, self.grazer.get_overcharged())

if __name__ == "__main__":
    unittest.main()