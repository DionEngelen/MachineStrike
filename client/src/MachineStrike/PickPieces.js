import React from "react";
import { useState } from "react";
import "./PickPieces.css";

export function PickPieces({chooseMachines}) {
    const types = ["Melee", "Gunner", "Ram", "Dash", "Swoop", "Pull"];
    const machines = [{
            name: "burrower",
            type: "Melee",
            points: 2
        }, {
            name: "stalker",
            type: "Melee",
            points: 5
        }, {
            name: "scrounger",
            type: "Gunner",
            points: 2
        }, {
            name: "widemaw",
            type: "Pull",
            points: 4
        }, {
            name: "charger",
            type: "Dash",
            points: 2
        }, {
            name: "skydrifter",
            type: "Swoop",
            points: 3
        }, {
            name: "bristleback",
            type: "Ram",
            points: 3
        }]
    const [machine, setMachine] = useState(null);
    const [machineList, setMachineList] = useState([]);

    const addMachine = (newMachine) => {
        console.log(newMachine);
        let points = 0;
        for (let i = 0; i < machineList.length; i++) {
            points += machineList[i].points;
        }
        points += newMachine.points;
        console.log(points);
        if (points > 10){
            return;
        }
        machineList.push(newMachine);
        setMachineList(machineList);
        console.log(machineList);
    }

    const removeMachine = (machineToRemove) => {
        const removeableIndex = machineList.indexOf(machineToRemove);
        machineList.splice(removeableIndex, 1);
        setMachineList(machineList);
    }

    return (
        <div className="pick-pieces">
            <div className="show-list">
                <h3>Selected pieces:</h3>
                <p className="question">Not satisfied?</p>
                <p>Click to remove a piece</p>
                {machineList.length > 0 && machineList.map((machine) => (
                    <button
                    className="unit-of-machinesquad"
                    onClick={() => removeMachine(machine)}>{machine.name}</button>
                ))}
                <button
                onClick={() => chooseMachines(machineList)}>Confirm choice</button>
            </div>
            <div className="machine-pieces">
                {types.map((type, index) => {
                    // console.log(type);
                    return (
                    <div
                    className={type}
                    key={index}>
                        <h3>{type}</h3>
                        {machines.filter((machine) => (
                            machine.type === type
                        )).map((filteredMachine, index) => {
                            // console.log({filteredMachine})
                            return (
                            <button
                            key={index}
                            onMouseEnter={() => setMachine(filteredMachine)}
                            onMouseLeave={() => setMachine(null)}
                            onClick={() => addMachine(filteredMachine)}>{filteredMachine.name}</button>
                        )})}
                    </div>
                    )})}
            </div>
            <div className="show-pieces">
                {machine && <div className={machine.name}></div>}
            </div>
        </div>
    )
}