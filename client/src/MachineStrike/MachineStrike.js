import React from "react";
import { useState } from "react";
import { PickBoard } from "./PickBoard";
import { PickPieces } from "./PickPieces";
import "./MachineStrike.css";

export function MachineStrike() {
    const [chosenBoard, setChosenBoard] = useState(null);
    const [chosenMachines, setChosenMachines] = useState(null);
    if (!chosenBoard) {
        console.log("hello2")
        return (
            <PickBoard chooseBoard={setChosenBoard}/>
        )
    }
    if (!chosenMachines) {
        console.log("hello")
        return (
            <PickPieces chooseMachines={setChosenMachines}/>
        )
    }
}