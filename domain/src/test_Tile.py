import unittest
from Tile import Tile

class TestTile(unittest.TestCase):
    def test_get_encapsulated_attributes(self):
        tile = Tile(2, True, "mountain", 3)
        self.assertEqual(2, tile.get_index())
        self.assertEqual(True, tile.get_occupied())
        self.assertEqual("mountain", tile.get_landscape())
        self.assertEqual(3, tile.get_attack_buff())

    def test_prohibit_move_when_tile_is_occupied(self):
        tile1 = Tile(25, False, "hill", 2)
        tile2 = Tile(13, True, "grassland", 0)
        self.assertEqual(False, tile1.prohibit_move())
        self.assertEqual(True, tile2.prohibit_move())

    def test_setters(self):
        tile = Tile(2, True, "mountain", 3)
        tile.set_landscape("hill", 2)
        tile.set_occupied(False)
        self.assertEqual(2, tile.get_index())
        self.assertEqual(False, tile.get_occupied())
        self.assertEqual("hill", tile.get_landscape())
        self.assertEqual(2, tile.get_attack_buff())

if __name__ == "__main__":
    unittest.main()