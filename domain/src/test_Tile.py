import unittest
from Tile import Tile

class TestTile(unittest.TestCase):
    def setUp(self):
        self.tile_test = Tile(7, False, "mountain", 3)

    def tearDown(self):
        pass

    def test_get_encapsulated_attributes(self):
        self.assertEqual(7, self.tile_test.get_index())
        self.assertEqual(False, self.tile_test.get_occupied())
        self.assertEqual("mountain", self.tile_test.get_landscape())
        self.assertEqual(3, self.tile_test.get_attack_buff())

    def test_setters(self):
        self.tile_test.set_landscape("hill", 2)
        self.tile_test.set_occupied(True)
        self.assertEqual(True, self.tile_test.get_occupied())
        self.assertEqual("hill", self.tile_test.get_landscape())
        self.assertEqual(2, self.tile_test.get_attack_buff())

if __name__ == "__main__":
    unittest.main()