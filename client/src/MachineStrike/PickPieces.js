import React from "react";
import { useState, useEffect } from "react";
import { hiddenMachinesKey } from "./hiddenkeys";
import "./PickPieces.css";
import burrower from "../images/GameImages/Burrower.png";
import grazer from "../images/GameImages/Grazer.png";
import lancehorn from "../images/GameImages/Lancehorn.png";
import charger from "../images/GameImages/Charger.png";
import plowhorn from "../images/GameImages/Plowhorn.png";
import longleg from "../images/GameImages/Longleg.png";
import bristleback from "../images/GameImages/Bristleback.png";
import scrapper from "../images/GameImages/Scrapper.png";
import skydrifter from "../images/GameImages/Skydrifter.png";
import bellowback from "../images/GameImages/Bellowback.png";
import widemaw from "../images/GameImages/Widemaw.png";
import snapmaw from "../images/GameImages/Snapmaw.png";
import clawstrider from "../images/GameImages/Clawstrider.png";
import sunwing from "../images/GameImages/Sunwing.png";
import clamberjaw from "../images/GameImages/Clamberjaw.png";
import ravager from "../images/GameImages/Ravager.png";
import rollerback from "../images/GameImages/Rollerback.png";
import dreadwing from "../images/GameImages/Dreadwing.png";
import rockbreaker from "../images/GameImages/Rockbreaker.png";
import thunderjaw from "../images/GameImages/Thunderjaw.png";
import tideripper from "../images/GameImages/Tideripper.png";
import fireclaw from "../images/GameImages/Fireclaw.png";
import scorcher from "../images/GameImages/Scorcher.png";
import slitherfang from "../images/GameImages/Slitherfang.png";

export function PickPieces({chooseMachines, player}) {
    const types = ["Melee", "Gunner", "Ram", "Dash", "Swoop", "Pull"];
    const machineImages = [burrower, grazer, lancehorn, charger, plowhorn, longleg,
    bristleback, scrapper, skydrifter, bellowback, widemaw, snapmaw,
    clawstrider, sunwing, clamberjaw, ravager, rollerback, dreadwing,
    rockbreaker, thunderjaw, tideripper, fireclaw, scorcher, slitherfang];

    const [victoryPoints, setVictoryPoints] = useState(0);
    const [fetchedMachines, setFetchedMachines] = useState([]);
    const [machine, setMachine] = useState(null);
    const [machineList, setMachineList] = useState([]);

    async function fetchMachines() {
        try {
            const response = await fetch(hiddenMachinesKey(), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const playMachines = await response.json();
                setFetchedMachines(playMachines);
            }
        } catch (error) {
            console.log(error.toString());
        }
    }

    const addMachine = (newMachine) => {
        const machineOccurrence = machineList.filter(sameMachine => sameMachine.name === newMachine.name).length;
        if (machineOccurrence >= 2) {
            return;
        }
        let points = 0;
        for (let i = 0; i < machineList.length; i++) {
            points += machineList[i].points;
        }
        points += newMachine.points;
        if (points > 10){
            return;
        }
        setVictoryPoints(points);
        const copyOfMachine = JSON.parse(JSON.stringify(newMachine))
        machineList.push(copyOfMachine);
        setMachineList(machineList);
    }

    const removeMachine = (machineToRemove) => {
        let currentPoints = victoryPoints
        currentPoints -= machineToRemove.points;
        const removeableIndex = machineList.indexOf(machineToRemove);
        setVictoryPoints(currentPoints);
        machineList.splice(removeableIndex, 1);
        setMachineList(machineList);
    }

    const confirmChoice = (myMachines) => {
        chooseMachines(myMachines);
        setMachineList([]);
        setVictoryPoints(0);
    }

    useEffect (() => {
        fetchMachines();
    },[]);

    return (
        <div className="pick-pieces">
            <div className="show-list">
                <h2>{player.name} choose your pieces</h2>
                <h3>Selected pieces:</h3>
                <p>Total points: {victoryPoints > 0 ? victoryPoints : "0"}/10</p>
                {machineList.length > 0 && machineList.map((machine, index) => (
                    <button
                    key={index}
                    className="unit-of-machinesquad"
                    onMouseEnter={() => setMachine(machine)}
                    onMouseLeave={() => setMachine(null)}
                    onClick={() => removeMachine(machine)}>{machine.name}</button>
                ))}
                <button
                className="confirm-button"
                disabled={victoryPoints < 10}
                onClick={() => confirmChoice(machineList)}>Confirm choice</button>
                <p className="question">Not satisfied?</p>
                <p>Click to remove a piece</p>
            </div>
            <div className="machine-pieces">
            {types.map((type, index) => (
                <div
                className={type}
                key={index}>
                    <h3>{type}</h3>
                    {fetchedMachines.filter((machine) => (
                        machine.type === type
                    )).map((filteredMachine, index) => (
                        <button
                        key={index}
                        onMouseEnter={() => setMachine(filteredMachine)}
                        onMouseLeave={() => setMachine(null)}
                        onClick={() => addMachine(filteredMachine)}>{filteredMachine.name}</button>
                    ))}
                </div>
            ))}
            </div>
            <div className="show-pieces">
                {machine && <div className={machine.name}>
                    <div className="name-and-points">
                        <h3>{machine.name.charAt(0).toUpperCase() + machine.name.slice(1)}</h3>
                        <p>Points: {machine.points}</p>
                    </div>
                    <div>
                        <img
                        className="shown-machine"
                        src={machineImages[machine.machine - 1]}
                        alt={machine.name}/>
                    </div>
                    <div className="stats">
                        <p className="attack">Atk: {machine.attack}</p>
                        <p className="health">Hp: {machine.health}</p>
                        <p className="attackrange">Atk range: {machine.attack_range}</p>
                        <p className="moverange">Move range: {machine.movement_range}</p>
                        <p className="armor">Armored spots: {machine.armor[0]} {machine.armor[1] &&
                        machine.armor[1]} {machine.armor[2] && machine.armor[2]}</p>
                        <p className="weak-spots">Weak spots:<br/>{machine.weak_spots[0]} {machine.weak_spots[1] &&
                        machine.weak_spots[1]} {machine.weak_spots[2] && machine.weak_spots[2]}</p>
                        <p className="ability">Ability: {machine.ability}</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}