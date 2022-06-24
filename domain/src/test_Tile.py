import unittest
from Tile import Tile

class TestTile(unittest.TestCase):
    def setUp(self):
        tiles = []
        landscapes = [["forest", 1], ["hill", 2], ["mountain", 3], ["grassland", 0]]
        for tile in range(64):
            tiles.append(Tile(tile, False, landscapes[tile % 4][0], landscapes[tile % 4][1]))
        self.tile = tiles[5]
        self.tile1 = tiles[3]
        self.tile2 = tiles[10]

    def tearDown(self):
        pass

    def test_get_encapsulated_attributes(self):
        self.assertEqual(5, self.tile.get_index())
        self.assertEqual(False, self.tile.get_occupied())
        self.assertEqual("hill", self.tile.get_landscape())
        self.assertEqual(2, self.tile.get_attack_buff())

    def test_prohibit_move_when_tile_is_occupied(self):
        self.assertEqual(False, self.tile1.prohibit_move())
        self.tile2.set_occupied(True)
        self.assertEqual(True, self.tile2.prohibit_move())

    def test_setters(self):
        self.tile.set_landscape("mountain", 3)
        self.tile.set_occupied(True)
        self.assertEqual(5, self.tile.get_index())
        self.assertEqual(True, self.tile.get_occupied())
        self.assertEqual("mountain", self.tile.get_landscape())
        self.assertEqual(3, self.tile.get_attack_buff())

if __name__ == "__main__":
    unittest.main()