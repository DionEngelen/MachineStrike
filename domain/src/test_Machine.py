import unittest
from Machine import Machine

class TestMachine(unittest.TestCase):
    def test_machine_is_properly_initiated(self):
        machine = Machine("grazer", 1, "Ram", 4, 1, 1, 2, ["front"], ["left", "right"], "gallop")
        self.assertEqual("grazer", machine.name)

if __name__ == "__main__":
    unittest.main()