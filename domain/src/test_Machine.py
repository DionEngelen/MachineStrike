import unittest
from Machine import Machine
from Tile import Tile

class TestMachine(unittest.TestCase):
    def setUp(self):
        tiles = []
        landscapes = [["forest", 1], ["hill", 2], ["mountain", 3], ["grassland", 0]]
        for tile in range(64):
            tiles.append(Tile(tile, False, landscapes[tile % 4][0], landscapes[tile % 4][1]))
        self.grazer = Machine("grazer", 1, "Ram", 4, 1, 1, 2, ["front"], ["left", "right"], "gallop", 0, "player1")
        self.clawstrider = Machine("clawstrider", 3, "Melee", 8, 3, 2, 3, ["front"], ["back"], "", 1, "player1")

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
        self.grazer.turn("left")
        self.assertEqual("left", self.grazer.get_facing())
        self.grazer.turn("back")
        self.assertEqual("back", self.grazer.get_facing())
        self.grazer.turn("left")
        self.assertEqual("left", self.grazer.get_facing())
        self.grazer.turn("right")
        self.assertEqual("right", self.grazer.get_facing())

    def test_overcharge(self):
        self.grazer.set_sprinted(True)
        self.grazer.overcharge()
        self.assertEqual(2, self.grazer.get_health())
        self.assertEqual(True, self.grazer.get_overcharged())
    
    def test_armor_and_weak_spot_rotation(self):
        self.grazer.rotate_armor_and_weak_spots("back")
        self.assertEqual("back", self.grazer.get_armor()[0])
        self.assertEqual("right", self.grazer.get_weak_spots()[0])
        self.grazer.turn("back")

        self.grazer.rotate_armor_and_weak_spots("left")
        self.assertEqual("left", self.grazer.get_armor()[0])
        self.assertEqual(["back" ,"front"], self.grazer.get_weak_spots())
        self.grazer.turn("left")
        
        self.grazer.rotate_armor_and_weak_spots("front")
        self.assertEqual("front", self.grazer.get_armor()[0])
        self.assertEqual(["left", "right"], self.grazer.get_weak_spots())

        self.clawstrider.rotate_armor_and_weak_spots("left")
        self.assertEqual(["left"], self.clawstrider.get_armor())
        self.assertEqual(["right"], self.clawstrider.get_weak_spots())

if __name__ == "__main__":
    unittest.main()