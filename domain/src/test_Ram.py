import unittest
from Machine import Machine
from Tile import Tile
from Melee import Melee
from Ram import Ram

class TestMelee(unittest.TestCase):
    def setUp(self):
        type1 = "Melee"
        type2 = "Ram"
        types = ["Melee", "Ram"]
        classes = [Melee, Ram]
        for machine_type in range(len(types)):
            if type1 == types[machine_type]:
                self.clawstrider = classes[machine_type]("clawstrider", 3, "Melee", 8, 3, 2, 3, ["front"], ["back"], "", 8, "player1")
            if type2 == types[machine_type]:
                self.grazer = classes[machine_type]("grazer", 1, "Ram", 4, 1, 1, 2, ["front"], ["left", "right"], "gallop", 0, "player1")

    def tearDown(self):
        pass

    def test_inheritance(self):
        self.assertEqual(8, self.clawstrider.get_health())
        self.assertEqual(4, self.grazer.get_health())
        self.assertTrue(True, isinstance(self.grazer, Machine))
        self.assertTrue(True, isinstance(self.grazer, Ram))

    def test_knock_back(self):
        self.grazer.turn("back")
        self.grazer.knock_back(self.clawstrider)
        self.assertEqual(16, self.clawstrider.get_tile_position())

if __name__ == "__main__":
    unittest.main()