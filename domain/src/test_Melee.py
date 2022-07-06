import unittest
from Machine import Machine
from Tile import Tile
from Melee import Melee

class TestMelee(unittest.TestCase):
    def setUp(self):
        self.grazer = Machine("grazer", 1, "Ram", 4, 1, 1, 2, ["front"], ["left", "right"], "gallop", 0, "player1")
        self.clawstrider = Melee("clawstrider", 3, "Melee", 8, 3, 2, 3, ["front"], ["back"], "", 1, "player1")

    def tearDown(self):
        pass

    def test_inheritance(self):
        self.assertEqual(8, self.clawstrider.get_health())
        self.assertEqual(4, self.grazer.get_health())

    def test_attack_with_facing(self):
        self.clawstrider.turn("left")
        self.clawstrider.attack(self.grazer)
        self.assertEqual(1, self.grazer.get_health())

        self.clawstrider.turn("down")
        self.clawstrider.attack(self.grazer)
        self.assertEqual(1, self.grazer.get_health())


if __name__ == "__main__":
    unittest.main()