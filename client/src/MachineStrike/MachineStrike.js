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
    const [chosenMachinesp1, setChosenMachinesp1] = useState(null);
    const [chosenMachinesp2, setChosenMachinesp2] =useState(null);
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
    if (!chosenMachinesp1) {
        return (
            <PickPieces chooseMachines={setChosenMachinesp1} player={chosenPlayer1}/>
        )
    }
    if (!chosenMachinesp2) {
        return (
            <PickPieces chooseMachines={setChosenMachinesp2} player={chosenPlayer2}/>
        )
    }
    else {
        return (
            <PlayGame board={chosenBoard} machinesp1={chosenMachinesp1} machinesp2={chosenMachinesp2}/>
        )
    }
}