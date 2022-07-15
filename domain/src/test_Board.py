import unittest
from Board import Board
from Player import Player
from Machine import Machine
from Tile import Tile

class TestBoard(unittest.TestCase):
    def setUp(self):
        machines = []
        grazer = Machine("grazer", 1, "Ram", 4, 1, 1, 2, ["front"], ["left", "right"], "gallop", 0, "player1")
        clawstrider = Machine("clawstrider", 3, "Melee", 8, 3, 2, 3, ["front"], ["back"], "", 1, "player1")
        bristleback = Machine("bristleback", 2, "Ram", 4, 2, 2, 2, ["front"], ["back"], "spray", 6, "player2")
        widemaw = Machine("widemaw", 3, "Pull", 6, 3, 2, 2, ["front"], ["back"], "", 7, "player2")
        longleg = Machine("longleg", 2, "Gunner", 6, 1, 2, 4, ["front"], ["back"], "empower", 12, "player1")
        sunwing = Machine("sunwing", 3, "Swoop", 6, 3, 2, 3, ["front"], ["back"], "", 14, "player2")
        machines.append(grazer)
        machines.append(clawstrider)
        machines.append(bristleback)
        machines.append(widemaw)
        machines.append(longleg)
        machines.append(sunwing)

        self.test_machine = Machine("longleg2", 2, "Gunner", 6, 1, 2, 4, ["front"], ["back"], "empower", 12, "player1")
        self.test_enemy = Machine("bristleback2", 2, "Gunner", 4, 2, 2, 3, ["front"], ["back"], "spray", 15, "player2")
        self.test_machine_2 = Machine("longleg2", 2, "Gunner", 6, 1, 2, 4, ["front"], ["back"], "empower", 23, "player1")

        players = []
        player1 = Player("Dion", True, [grazer, clawstrider, longleg])
        player2 = Player("John", False, [bristleback, widemaw, sunwing])
        players.append(player1)
        players.append(player2)

        self.test_player = Player("Test", True, [grazer, clawstrider, longleg])

        tiles = []
        landscapes = [["forest", 1], ["hill", 2], ["mountain", 3], ["grassland", 0]]
        for tile in range(64):
            tiles.append(Tile(tile, False, landscapes[tile % 4][0], landscapes[tile % 4][1]))

        self.test_tile = Tile(64, False, "hill", 2)

        self.board = Board(players, machines, tiles)

    def tearDown(self):
        pass

    def test_board_getters(self):
        self.assertEqual("Dion", self.board.get_players()[0].get_name())
        self.assertEqual("John", self.board.get_players()[1].get_name())
        self.assertEqual(0, self.board.get_players()[0].get_victorypoints())
        self.assertEqual(True, self.board.get_tiles()[1].get_occupied())
        self.assertEqual(False, self.board.get_tiles()[5].get_occupied())
        self.assertEqual("hill", self.board.get_tiles()[1].get_landscape())
        self.assertEqual("clawstrider", self.board.get_players()[0].get_machines()[1].get_name())
        self.assertEqual("clawstrider", self.board.get_machines()[1].get_name())

    def test_if_machine_turns_when_facing_changes(self):
        self.board.perform_move(self.board.get_machines()[0], "left", 1)
        self.assertEqual("left", self.board.get_machines()[0].get_facing())

    def test_if_machine_moves_or_stays_based_on_tile_destination(self):
        self.assertEqual(True, self.board.get_tiles()[0].get_occupied())
        self.board.perform_move(self.board.get_machines()[0], "front", 3)
        self.assertEqual(0, self.board.get_machines()[0].get_tile_position())

        self.board.perform_move(self.board.get_machines()[0], "front", 2)
        self.assertEqual(2, self.board.get_machines()[0].get_tile_position())

        self.assertEqual(True, self.board.get_tiles()[2].get_occupied())
        self.assertEqual(False, self.board.get_tiles()[0].get_occupied())

        self.board.perform_move(self.board.get_machines()[0], "front", 6)
        self.assertEqual(2, self.board.get_machines()[0].get_tile_position())

        self.assertEqual(2, self.board.get_machines()[0].get_tile_position())
        self.board.perform_move(self.board.get_machines()[0], "left", 4)
        self.assertEqual(4, self.board.get_machines()[0].get_tile_position())
        self.assertEqual("left", self.board.get_machines()[0].get_facing())

    def test_if_overcharged_blocks_move(self):
        self.board.get_machines()[0].set_overcharged(True)
        self.board.perform_move(self.board.get_machines()[0], "left", 2)
        self.assertEqual(0, self.board.get_machines()[0].get_tile_position())

    def test_if_occupied_tile_blocks_move(self):
        self.board.perform_move(self.board.get_machines()[0], "left", 1)
        self.assertEqual(0, self.board.get_machines()[0].get_tile_position())

    def test_if_chasm_blocks_move(self):
        self.board.get_tiles()[13].set_landscape("chasm", -2)
        self.board.perform_move(self.board.get_machines()[4], "left", 13)
        self.assertEqual(12, self.board.get_machines()[4].get_tile_position())

        self.board.get_players()[0].set_has_turn(False)
        self.board.get_players()[1].set_has_turn(True)
        self.board.perform_move(self.board.get_machines()[5], "left", 13)
        self.assertEqual(13, self.board.get_machines()[5].get_tile_position())

    def test_if_marsh_impedes_movement(self):
        self.board.get_players()[0].set_has_turn(False)
        self.board.get_players()[1].set_has_turn(True)
        self.board.get_tiles()[6].set_landscape("marsh", -1)
        self.board.perform_move(self.board.get_machines()[2], "left", 4)
        self.assertEqual(6, self.board.get_machines()[2].get_tile_position())
        self.assertEqual(1, self.board.get_machines()[2].get_movement_range())

        self.board.perform_move(self.board.get_machines()[2], "left", 5)
        self.assertEqual(5, self.board.get_machines()[2].get_tile_position())
        self.assertEqual(2, self.board.get_machines()[2].get_movement_range())

    def test_if_marsh_does_not_affect_Pull_type(self):
        self.board.get_players()[0].set_has_turn(False)
        self.board.get_players()[1].set_has_turn(True)
        self.board.get_tiles()[7].set_landscape("marsh", -1)
        self.board.perform_move(self.board.get_machines()[2], "left", 5)
        self.assertEqual(5, self.board.get_machines()[2].get_tile_position())
        self.assertEqual(2, self.board.get_machines()[2].get_movement_range())

    def test_end_turn(self):
        self.assertEqual(True, self.board.get_players()[0].get_has_turn())
        self.board.end_turn()
        self.assertEqual(True, self.board.get_players()[0].get_has_turn())
        self.board.get_players()[0].set_has_turn(False)
        self.board.get_players()[1].set_has_turn(True)
        self.board.end_turn()
        self.assertEqual(True, self.board.get_players()[1].get_has_turn())
    
    def test_remaining_getters_and_setters(self):
        self.assertEqual(2, self.test_tile.get_attack_buff())
        self.assertEqual(64, self.test_tile.get_index())

        self.test_machine.set_attack(4)
        self.test_machine.set_active(False)
        self.test_machine.set_attacked(True)
        self.test_machine.set_sprinted(True)
        self.test_machine.set_armor(["right"])
        self.test_machine.set_weak_spots(["left"])
        self.assertEqual(4, self.test_machine.get_attack())
        self.assertEqual("player1", self.test_machine.get_team())
        self.assertEqual(2, self.test_machine.get_attack_range())
        self.assertEqual(2, self.test_machine.get_points())
        self.assertEqual("empower", self.test_machine.get_ability())
        self.assertEqual(["right"], self.test_machine.get_armor())
        self.assertEqual(["left"], self.test_machine.get_weak_spots())

        self.test_player.set_name("Test2")
        self.test_player.set_won(True)
        self.test_player.set_victorypoints("8")
        self.test_player.set_machines([self.test_machine])
        self.assertEqual(True, self.test_player.get_won())

    def test_check_end_game(self):
        self.test_player.get_machines()[0].set_moved(True)
        self.test_player.get_machines()[1].set_moved(True)
        self.test_player.check_end_turn()
        self.assertEqual(True, self.test_player.get_two_machines_were_played())

    def test_switch_turn(self):
        self.test_player.set_two_machines_were_played(True)
        self.test_player.switch_turn(self.board.get_players()[0])
        self.assertEqual(False, self.test_player.get_has_turn())

    def test_check_valid_move(self):
        self.test_machine.check_valid_move(13)
        self.assertEqual("longleg2", self.test_machine.get_name())

    def test_check_out_of_bounds(self):
        self.test_machine.check_out_of_bounds(16)
        self.test_machine.check_out_of_bounds(17)
        self.test_machine.check_out_of_bounds(18)
        self.test_machine.check_out_of_bounds(19)
        self.test_machine.check_out_of_bounds(20)
        self.test_machine.check_out_of_bounds(21)
        self.test_machine.check_out_of_bounds(22)
        self.test_machine.check_out_of_bounds(23)
        self.assertEqual("longleg2", self.test_machine.get_name())

    def test_check_non_puller_from_marsh_to_other(self):
        self.board.get_tiles()[0].set_landscape("marsh", -1)
        self.board.perform_move(self.board.get_machines()[0], "front", 8)

    def test_attack_functions(self):
        self.test_machine.check_armor(self.test_enemy)
        self.test_machine.check_weak_spots(self.test_enemy)
        self.test_enemy.turn("back")
        self.test_machine.check_armor(self.test_enemy)
        self.test_machine.check_weak_spots(self.test_enemy)
        self.test_machine.check_within_attack_range(self.test_enemy)
        self.test_machine.check_armor_break(self.test_enemy)
        self.test_machine.armor_break(self.test_enemy)
        self.test_machine.push_back(self.test_enemy)
        self.test_machine_2.check_within_attack_range(self.test_enemy)

if __name__ == "__main__":
    unittest.main()