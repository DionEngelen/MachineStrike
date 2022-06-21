import React from "react";
import { useState } from "react";
import { PickBoard } from "./PickBoard";
import { PickPieces } from "./PickPieces";
import { PlayGame } from "./PlayGame";
import "./MachineStrike.css";

export function MachineStrike() {
    const [chosenBoard, setChosenBoard] = useState(null);
    const [chosenMachines, setChosenMachines] = useState(null);
    if (!chosenBoard) {
        return (
            <PickBoard chooseBoard={setChosenBoard}/>
        )
    }
    if (!chosenMachines) {
        return (
            <PickPieces chooseMachines={setChosenMachines}/>
        )
    }
    else {
        return (
            <PlayGame board={chosenBoard} machines={chosenMachines}/>
        )
    }
}