import React from "react";
import { useState } from "react";
import { MakePlayers } from "./MakePlayers";
import { PickBoard } from "./PickBoard";
import { PickPieces } from "./PickPieces";
import { PlayGame } from "./PlayGame";
import "./MachineStrike.css";

export function MachineStrike() {
    const [chosenPlayer1, setChosenPlayer1] = useState(null);
    const [chosenPlayer2, setChosenPlayer2] = useState(null);
    const [chosenBoard, setChosenBoard] = useState(null);
    const [chosenMachines, setChosenMachines] = useState(null);
    if (!chosenPlayer1 && !chosenPlayer2) {
        return (
            <MakePlayers makeplayer1={setChosenPlayer1} makeplayer2={setChosenPlayer2}/>
        )
    }
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