import React from "react";
import { useState, useEffect } from "react";
import { hiddenStartGameKey, hiddenPlayGameKey, hiddenEndTurnKey } from "./hiddenkeys";
import "./PlayGame.css";
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

export function PlayGame({player1, player2, board, machinesp1, machinesp2, setMachinesp1, setMachinesp2}) {
    const machineImages = [burrower, grazer, lancehorn, charger, plowhorn, longleg,
    bristleback, scrapper, skydrifter, bellowback, widemaw, snapmaw,
    clawstrider, sunwing, clamberjaw, ravager, rollerback, dreadwing,
    rockbreaker, thunderjaw, tideripper, fireclaw, scorcher, slitherfang];

    let [tileBeingDraggedTo, setTileBeingDraggedTo] = useState();
    const [playImages, setPlayImages] = useState([])
    const [gameState, setGameState] = useState();
    const [startButtonIsClicked, setStartButtonIsClicked] = useState(false);
    const [showMachineP1, setShowMachineP1] = useState(null);
    const [showMachineP2, setShowMachineP2] = useState(null);

    const fillPlayImages = () => {
        for (let i = 0; i < machinesp1.length; i++) {
            playImages.push(machineImages[machinesp1[i].machine - 1])
        }
        for (let i = 0; i < machinesp2.length; i++) {
            playImages.push(machineImages[machinesp2[i].machine - 1])
        }
        setPlayImages(playImages)
    }

    useEffect(() => {
        fillPlayImages()
    }, [])

    async function trySetBoard() {
        setStartButtonIsClicked(true);
        try {
            const response = await fetch(hiddenStartGameKey(), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"player1": player1, "player2": player2,
            "currentBoard": board, "player1Machines": machinesp1,
            "player2Machines": machinesp2})
            })
            if (response.ok) {
                const startBoard = await response.json();
                console.log(startBoard);
                setGameState(startBoard);
                const initiatedMachinesp1 = []
                const initiatedMachinesp2 = []
                for (let i = 0; i < startBoard.board.machines.length; i++) {
                    if (startBoard.board.machines[i].team === "player1") {
                        initiatedMachinesp1.push(startBoard.board.machines[i])
                    } else {
                        initiatedMachinesp2.push(startBoard.board.machines[i])
                    }
                }
                setMachinesp1(initiatedMachinesp1)
                setMachinesp2(initiatedMachinesp2)
            }
        } catch (error) {
            console.log(error.toString());
        }
    }

    async function tryPlayGame(tileIndex, machine) {
        let correctMachine
        let newFacing = machine.facing
        if (machine.rotation === 0) {
            newFacing = "front"
        } else if (machine.rotation === 90){
            newFacing = "right"
        } else if (machine.rotation === 180) {
            newFacing = "back"
        } else if (machine.rotation === 270) {
            newFacing = "left"
        }
        removeRotation(machinesp1)
        removeRotation(machinesp2)
        for (let i = 0; i < gameState.board.machines.length; i++) {
            if (machine.tile_position === gameState.board.machines[i].tile_position) {
                correctMachine = gameState.board.machines[i]
                break;
            }
        }
        try {
            const response = await fetch(hiddenPlayGameKey(), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"board": gameState.board, "machine": correctMachine, "facing": newFacing, "tile": tileIndex})
            })
            if (response.ok) {
                const newBoard = await response.json();
                console.log(newBoard);
                setGameState(newBoard);
                const playedMachinesp1 = []
                const playedMachinesp2 = []
                for (let i = 0; i < newBoard.board.machines.length; i++) {
                    if (newBoard.board.machines[i].team === "player1") {
                        playedMachinesp1.push(newBoard.board.machines[i])
                    } else {
                        playedMachinesp2.push(newBoard.board.machines[i])
                    }
                }
                setMachinesp1(playedMachinesp1)
                setMachinesp2(playedMachinesp2)
            } 
        } catch (error) {
            console.log(error)
        }
    }

    const removeRotation = (machines) => {
        for (let i = 0; i < machines.length; i++) {
            delete machines[i].rotation
        }
    }

    async function tryEndTurn() {
        let player
        for (let i = 0; i < gameState.board.players.length; i++) {
            if (gameState.board.players[i].has_turn) {
                player = gameState.board.players[i]
                break;
            }
        }
        try {
            const response = await fetch(hiddenEndTurnKey(), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"board": gameState.board, "player": player})
            })
            if (response.ok) {
                const newBoard = await response.json();
                console.log(newBoard);
                setGameState(newBoard);
                const playedMachinesp1 = []
                const playedMachinesp2 = []
                for (let i = 0; i < newBoard.board.machines.length; i++) {
                    if (newBoard.board.machines[i].team === "player1") {
                        playedMachinesp1.push(newBoard.board.machines[i])
                    } else {
                        playedMachinesp2.push(newBoard.board.machines[i])
                    }
                }
                setMachinesp1(playedMachinesp1)
                setMachinesp2(playedMachinesp2)
            } 
        } catch (error) {
            console.log(error)
        }
    }



    const checkIfAllMachinesHaveTilePositions = () => {
        if (startButtonIsClicked) {
            return false;
        }
        for (let i = 0; i < machinesp1.length; i++) {
            if (machinesp1[i].tile_position === null ||
            machinesp1[i].tile_position === undefined) {
                return false;
            }
        }
        for (let i = 0; i < machinesp2.length; i++) {
            if (machinesp2[i].tile_position === null ||
            machinesp2[i].tile_position === undefined) {
                return false;
            }
        }
        return true;
    }

    const navigateBoard = (e, machine) => {
        if (!e.target.draggable && gameState) {
            const machinePiece = document.getElementById(e.target.id);
            let currentTile = document.getElementById(e.target.parentElement.id);
            let integerId = parseInt(e.target.parentElement.id);
            switch(e.key) {
                case "ArrowUp":
                    integerId -= 8;
                    if ((!currentTile.firstChild && integerId !== machine.tile_position) || integerId < 0) {
                        break;
                    }
                    if (gameState.board.tiles[integerId].landscape === "chasm" && machine.type !== "Swoop") {
                        break;
                    }
                    currentTile = document.querySelector(`#${CSS.escape(integerId.toString())}`);
                    if (currentTile.firstChild && currentTile.firstChild.id.includes("machine")) {
                        break;
                    }
                    currentTile.appendChild(machinePiece);
                    e.target.focus()
                    break;
                case "ArrowRight":
                    integerId += 1;
                    if (gameState.board.tiles[integerId].landscape === "chasm" && machine.type !== "Swoop") {
                        break;
                    }
                    if (integerId % 8 === 0) {
                        break;
                    }
                    currentTile = document.querySelector(`#${CSS.escape(integerId.toString())}`);
                    if (currentTile.firstChild && currentTile.firstChild.id.includes("machine")) {
                        break;
                    }
                    if (!currentTile.firstChild && integerId !== machine.tile_position) {
                        break;
                    }
                    currentTile.appendChild(machinePiece);
                    e.target.focus();
                    break;
                case "ArrowDown":
                    integerId += 8
                    if ((!currentTile.firstChild && integerId !== machine.tile_position) || integerId > 63) {
                        break;
                    }
                    if (gameState.board.tiles[integerId].landscape === "chasm" && machine.type !== "Swoop") {
                        break;
                    }
                    currentTile = document.querySelector(`#${CSS.escape(integerId.toString())}`);
                    if (currentTile.firstChild && currentTile.firstChild.id.includes("machine")) {
                        break;
                    }
                    currentTile.appendChild(machinePiece);
                    e.target.focus();
                    break;
                case "ArrowLeft":
                    integerId -= 1;
                    if (gameState.board.tiles[integerId].landscape === "chasm" && machine.type !== "Swoop") {
                        break;
                    }
                    if (integerId % 8 === 7) {
                        break;
                    }
                    currentTile = document.querySelector(`#${CSS.escape(integerId.toString())}`);
                    if (currentTile.firstChild && currentTile.firstChild.id.includes("machine")) {
                        break;
                    }
                    if (!currentTile.firstChild && integerId !== machine.tile_position) {
                        break;
                    }
                    currentTile.appendChild(machinePiece);
                    e.target.focus();
                    break;
                case "Enter":
                    e.target.blur();
                    tryPlayGame(integerId, machine)
                    break;
                case " ":
                    rotatePiece(machinePiece, machine)
                    e.target.focus();
                    break;
                default:
                    break;
            }  
        }
    }

    const rotatePiece = (machinePiece, machine) => {
        if (!machine.rotation) {
            if (machine.facing === "front") {
                machine.rotation = 360
            } else if (machine.facing === "right") {
                machine.rotation = 90
            } else if (machine.facing === "back") {
                machine.rotation = 180
            } else if (machine.facing === "left") {
                machine.rotation = 270
            }
        }
        if (machine.rotation === 360) {
            machine.rotation = 90
        } else if (machine.rotation === 90) {
            machine.rotation = 180
        } else if (machine.rotation === 180) {
            machine.rotation = 270
        } else if (machine.rotation === 270) {
            machine.rotation = 360
        }
        machinePiece.style.transform = `rotate(${machine.rotation}deg)`;
    }

    const dragStart = (e) => {
        e.dataTransfer.setData("text", e.target.id);
    }

    const dragDrop = (e) => {
        const moveData = e.dataTransfer.getData("text");
        if (moveData.includes("p1")) {
            if (e.target.id >= 48) {
                tileBeingDraggedTo = parseInt(e.target.id);
                setTileBeingDraggedTo(tileBeingDraggedTo);
                e.target.appendChild(document.getElementById(moveData));
            } else {
                tileBeingDraggedTo = null;
                setTileBeingDraggedTo(tileBeingDraggedTo);
            }
        } else {
            if (e.target.id <= 15) {
                tileBeingDraggedTo = parseInt(e.target.id);
                setTileBeingDraggedTo(tileBeingDraggedTo);
                e.target.appendChild(document.getElementById(moveData));
            } else {
                tileBeingDraggedTo = null;
                setTileBeingDraggedTo(tileBeingDraggedTo);
            }            
        }
    }

    const dragEnd = (e, machine) => {
        if (tileBeingDraggedTo != null) {
            machine.tile_position = tileBeingDraggedTo;
            e.target.draggable = false;
        }
        setTileBeingDraggedTo(null);
    }














    const showMovementPreview = (e, machine) => {
        if (gameState) {
            for (let i = 1; i <= machine.movement_range; i++) {
                previewMovement1(machine.tile_position, i, machine.tile_position, machine);
                if (i > 1) {
                    previewMovement2(machine.tile_position, i, machine.tile_position, machine);
                }
                if (i > 2) {
                    previewMovement3(machine.tile_position, i, machine.tile_position, machine);
                }
            }
        }
    }

    const previewMovement1 = (integerId, i, currentTile, machine) => {
        const leftPreview = integerId - i;
        const leftTile = document.querySelector(`#${CSS.escape(leftPreview.toString())}`);
        if (leftTile && currentTile % 8 !== 0 && leftPreview % 8 !== 7 &&
        (gameState.board.tiles[leftPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (currentTile % 8 !== 1 || leftPreview % 8 !== 6) {
                if (!leftTile.firstChild) {
                let tilePreviewLeft = document.createElement("div");
                tilePreviewLeft.classList.add("move-preview");
                leftTile.appendChild(tilePreviewLeft);
                }
            }
            
        }
        const upPreview = integerId - i * 8;
        const upTile = document.querySelector(`#${CSS.escape(upPreview.toString())}`);
        if (upTile && (gameState.board.tiles[upPreview].landscape !== "chasm" || machine.type === "Swoop")) {            
            if (!upTile.firstChild) {
                let tilePreviewUp = document.createElement("div");
                tilePreviewUp.classList.add("move-preview");
                upTile.appendChild(tilePreviewUp);
            }
        }
        const rightPreview = integerId + i;
        const rightTile = document.querySelector(`#${CSS.escape(rightPreview.toString())}`);
        if (rightTile && currentTile % 8 !== 7 && rightPreview % 8 !== 0 &&
        (gameState.board.tiles[rightPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (currentTile % 8 !== 6 || rightPreview % 8 !== 1) {
                if (!rightTile.firstChild) {
                let tilePreviewRight = document.createElement("div");
                tilePreviewRight.classList.add("move-preview");
                rightTile.appendChild(tilePreviewRight);
                }
            }
            
        }
        const downPreview = integerId + i * 8;
        const downTile = document.querySelector(`#${CSS.escape(downPreview.toString())}`);
        if (downTile && (gameState.board.tiles[downPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (!downTile.firstChild) {
                let tilePreviewDown = document.createElement("div");
                tilePreviewDown.classList.add("move-preview");
                downTile.appendChild(tilePreviewDown);
            }
        }   
    }

    const previewMovement2 = (integerId, i, currentTile, machine) => {
        const leftPreview = integerId - (i - 1) - 8;
        const leftTile = document.querySelector(`#${CSS.escape(leftPreview.toString())}`);
        if (leftTile && currentTile % 8 !== 0 && leftPreview % 8 !== 7 &&
        (gameState.board.tiles[leftPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (!leftTile.firstChild) {
                let tilePreviewLeft = document.createElement("div");
                tilePreviewLeft.classList.add("move-preview");
                leftTile.appendChild(tilePreviewLeft);
            }
        }
        const upPreview = integerId - (i - 1) * 8 + 1;
        const upTile = document.querySelector(`#${CSS.escape(upPreview.toString())}`);
        if (upTile && upPreview % 8 !== 0 && (gameState.board.tiles[upPreview].landscape !== "chasm" || machine.type === "Swoop")) {            
            if (!upTile.firstChild) {
                let tilePreviewUp = document.createElement("div");
                tilePreviewUp.classList.add("move-preview");
                upTile.appendChild(tilePreviewUp);
            }
        }
        const rightPreview = integerId + (i - 1) + 8;
        const rightTile = document.querySelector(`#${CSS.escape(rightPreview.toString())}`);
        if (rightTile && currentTile % 8 !== 7 && rightPreview % 8 !== 0 &&
        (gameState.board.tiles[rightPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (!rightTile.firstChild) {
                let tilePreviewRight = document.createElement("div");
                tilePreviewRight.classList.add("move-preview");
                rightTile.appendChild(tilePreviewRight);
            }
        }
        const downPreview = integerId + (i - 1) * 8 - 1;
        const downTile = document.querySelector(`#${CSS.escape(downPreview.toString())}`);
        if (downTile && downPreview % 8 !== 7 && (gameState.board.tiles[downPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (!downTile.firstChild) {
                let tilePreviewDown = document.createElement("div");
                tilePreviewDown.classList.add("move-preview");
                downTile.appendChild(tilePreviewDown);
            }
        }   
    }

    const previewMovement3 = (integerId, i, currentTile, machine) => {
        const leftPreview = integerId - (i - 2) - 16;
        const leftTile = document.querySelector(`#${CSS.escape(leftPreview.toString())}`);
        if (leftTile && currentTile % 8 !== 0 && leftPreview % 8 !== 7 &&
        (gameState.board.tiles[leftPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (!leftTile.firstChild && leftPreview % 8 !== 7) {
            let tilePreviewLeft = document.createElement("div");
            tilePreviewLeft.classList.add("move-preview");
            leftTile.appendChild(tilePreviewLeft);
            }  
        }
        const upPreview = integerId - ((i - 2) * 8) + 2;
        const upTile = document.querySelector(`#${CSS.escape(upPreview.toString())}`);
        if (upTile && (gameState.board.tiles[upPreview].landscape !== "chasm" || machine.type === "Swoop")) {            
            if (!upTile.firstChild && upPreview % 8 !== 0) {
                let tilePreviewUp = document.createElement("div");
                tilePreviewUp.classList.add("move-preview");
                upTile.appendChild(tilePreviewUp);
            }
        }
        const rightPreview = integerId + (i - 2) + 16;
        const rightTile = document.querySelector(`#${CSS.escape(rightPreview.toString())}`);
        if (rightTile && currentTile % 8 !== 7 &&
        (gameState.board.tiles[rightPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (!rightTile.firstChild && rightPreview % 8 !== 0) {
            let tilePreviewRight = document.createElement("div");
            tilePreviewRight.classList.add("move-preview");
            rightTile.appendChild(tilePreviewRight);
            }
        }
        const downPreview = integerId + ((i - 2) * 8) - 2;
        const downTile = document.querySelector(`#${CSS.escape(downPreview.toString())}`);
        if (downTile && (gameState.board.tiles[downPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (!downTile.firstChild && downPreview % 8 !== 7) {
                let tilePreviewDown = document.createElement("div");
                tilePreviewDown.classList.add("move-preview");
                downTile.appendChild(tilePreviewDown);
            }
        }   
    }







    

    const clearMovementPreview = (e, machine) => {
        if (gameState) {
            for (let i = 1; i <= machine.movement_range; i++) {
                clearMovement1(machine.tile_position, i, machine.tile_position, machine);
                if (i > 1) {
                    clearMovement2(machine.tile_position, i, machine.tile_position, machine);
                }
                if (i > 2) {
                    clearMovement3(machine.tile_position, i, machine.tile_position, machine);
                }
            }   
        }
    }

    const clearMovement1 = (integerId, i, currentTile, machine) => {
        const leftPreview = integerId - i;
        const leftTile = document.querySelector(`#${CSS.escape(leftPreview.toString())}`);
        if (leftTile && currentTile % 8 !== 0 && leftPreview % 8 !== 7 &&
        (gameState.board.tiles[leftPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (currentTile % 8 !== 1 || leftPreview % 8 !== 6) {
                if (leftTile.firstChild.className !== "player1machine machine-piece" &&
                leftTile.firstChild.className !== "player2machine machine-piece") {
                leftTile.removeChild(leftTile.lastChild)
                }
            }
        }
        const upPreview = integerId - i * 8;
        const upTile = document.querySelector(`#${CSS.escape(upPreview.toString())}`);
        if (upTile && (gameState.board.tiles[upPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (upTile.firstChild.className !== "player1machine machine-piece" &&
            upTile.firstChild.className !== "player2machine machine-piece") {
            upTile.removeChild(upTile.lastChild)
            }
        }
        const rightPreview = integerId + i;
        const rightTile = document.querySelector(`#${CSS.escape(rightPreview.toString())}`);
        if (rightTile && currentTile % 8 !== 7 && rightPreview % 8 !== 0 &&
        (gameState.board.tiles[rightPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (currentTile % 8 !== 6 || rightPreview % 8 !== 1) {
                if (rightTile.firstChild.className !== "player1machine machine-piece" &&
                rightTile.firstChild.className !== "player2machine machine-piece") {
                rightTile.removeChild(rightTile.lastChild)
                }
            }
            
        }
        const downPreview = integerId + i * 8;
        const downTile = document.querySelector(`#${CSS.escape(downPreview.toString())}`);
        if (downTile && (gameState.board.tiles[downPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (downTile.firstChild.className !== "player1machine machine-piece" &&
            downTile.firstChild.className !== "player2machine machine-piece") {
            downTile.removeChild(downTile.lastChild)
            }
        }
    }

    const clearMovement2 = (integerId, i, currentTile, machine) => {
        const leftPreview = integerId - (i - 1) - 8;
        const leftTile = document.querySelector(`#${CSS.escape(leftPreview.toString())}`);
        if (leftTile && currentTile % 8 !== 0 && leftPreview % 8 !== 7 &&
        (gameState.board.tiles[leftPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (leftTile.firstChild.className !== "player1machine machine-piece" &&
            leftTile.firstChild.className !== "player2machine machine-piece") {
            leftTile.removeChild(leftTile.lastChild)
            }
        }
        const upPreview = integerId - (i - 1) * 8 + 1;
        const upTile = document.querySelector(`#${CSS.escape(upPreview.toString())}`);
        if (upTile && upPreview % 8 !== 0 && (gameState.board.tiles[upPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (upTile.firstChild.className !== "player1machine machine-piece" &&
            upTile.firstChild.className !== "player2machine machine-piece") {
            upTile.removeChild(upTile.lastChild)
            }
        }
        const rightPreview = integerId + (i - 1) + 8;
        const rightTile = document.querySelector(`#${CSS.escape(rightPreview.toString())}`);
        if (rightTile && currentTile % 8 !== 7 && rightPreview % 8 !== 0 &&
        (gameState.board.tiles[rightPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (rightTile.firstChild.className !== "player1machine machine-piece" &&
            rightTile.firstChild.className !== "player2machine machine-piece") {
            rightTile.removeChild(rightTile.lastChild)
            }
        }
        const downPreview = integerId + (i - 1) * 8 - 1;
        const downTile = document.querySelector(`#${CSS.escape(downPreview.toString())}`);
        if (downTile && downPreview % 8 !== 7 && (gameState.board.tiles[downPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (downTile.firstChild.className !== "player1machine machine-piece" &&
            downTile.firstChild.className !== "player2machine machine-piece") {
            downTile.removeChild(downTile.lastChild)
            }
        }
    }

    const clearMovement3 = (integerId, i, currentTile, machine) => {
        const leftPreview = integerId - (i - 2) - 16;
        const leftTile = document.querySelector(`#${CSS.escape(leftPreview.toString())}`);
        if (leftTile && currentTile % 8 !== 0 && leftPreview % 8 !== 7 &&
        (gameState.board.tiles[leftPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (leftTile.firstChild.className !== "player1machine machine-piece" &&
            leftTile.firstChild.className !== "player2machine machine-piece" && leftPreview % 8 !== 7) {
            leftTile.removeChild(leftTile.lastChild)
            }
        }
        const upPreview = integerId - ((i - 2) * 8) + 2;
        const upTile = document.querySelector(`#${CSS.escape(upPreview.toString())}`);
        if (upTile && upPreview % 8 !== 0 && (gameState.board.tiles[upPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (upTile.firstChild.className !== "player1machine machine-piece" &&
            upTile.firstChild.className !== "player2machine machine-piece" && upPreview % 8 !== 0) {
            upTile.removeChild(upTile.lastChild)
            }
        }
        const rightPreview = integerId + (i - 2) + 16;
        const rightTile = document.querySelector(`#${CSS.escape(rightPreview.toString())}`);
        if (rightTile && currentTile % 8 !== 7 && rightPreview % 8 !== 0 &&
        (gameState.board.tiles[rightPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (rightTile.firstChild.className !== "player1machine machine-piece" &&
            rightTile.firstChild.className !== "player2machine machine-piece" && rightPreview % 8 !== 0) {
            rightTile.removeChild(rightTile.lastChild)
            }
        }
        const downPreview = integerId + ((i - 2) * 8) - 2;
        const downTile = document.querySelector(`#${CSS.escape(downPreview.toString())}`);
        if (downTile && downPreview % 8 !== 7 && (gameState.board.tiles[downPreview].landscape !== "chasm" || machine.type === "Swoop")) {
            if (downTile.firstChild.className !== "player1machine machine-piece" &&
            downTile.firstChild.className !== "player2machine machine-piece" && downPreview % 8 !== 7) {
            downTile.removeChild(downTile.lastChild)
            }
        }
    }

    const colorBorders = (machine) => {
        let style = {
            borderTopColor: "black",
            borderLeftColor: "black",
            borderRightColor: "black",
            borderBottomColor: "black",
            opacity: 1
        } 
        if (machine.armor.includes("front")) {
            style.borderTopColor = "blue"
        } if (machine.armor.includes("left")) {
            style.borderLeftColor = "blue"
        } if (machine.armor.includes("right")){
            style.borderRightColor = "blue"
        } if (machine.armor.includes("back")) {
            style.borderBottomColor = "blue"
        } if (machine.weak_spots.includes("front")) {
            style.borderTopColor = "red"
        } if (machine.weak_spots.includes("left")) {
            style.borderLeftColor = "red"
        } if (machine.weak_spots.includes("right")){
            style.borderRightColor = "red"
        } if (machine.weak_spots.includes("back")) {
            style.borderBottomColor = "red"
        }
        if (gameState) {
            if (!gameState.board.players[0].has_turn && machinesp1.includes(machine)) {
            style.opacity = 0.55
        } if (!gameState.board.players[1].has_turn && machinesp2.includes(machine)) {
            style.opacity = 0.55
        }
        }
          
        return style
    }

    const showMachine = (e, machine) => {
        if (gameState) {
            setShowMachineP1(machine)
        }
    }
    const clearMachine = (e, machine) => {
        if (gameState) {
            setShowMachineP1(null)
        }
    }
    const showMachineSecondPlayer = (e, machine) => {
        if (gameState) {
            setShowMachineP2(machine)
        }
    }
    const clearMachineSecondPlayer = (e, machine) => {
        if (gameState) {
            setShowMachineP2(null)
        }
    }

    return (
        <div className="game">
            <div className="p1-info">
                <p></p>
                {!showMachineP1 && <p></p>}
                {showMachineP1 && <div className="show-piecesgame">
                    <div className="show-machinegame">
                        <div className="name-and-pointsgame">
                            <h3>{showMachineP1.name.charAt(0).toUpperCase() + showMachineP1.name.slice(1)}</h3>
                            <p>Points: {showMachineP1.points}</p>
                        </div>
                        <div>
                            <img
                            className="shown-machinegame"
                            src={playImages[gameState.board.machines.indexOf(showMachineP1)]}
                            alt={showMachineP1.name}/>
                        </div>
                        <div className="statsgame">
                            <p className="attackgame">Atk: {showMachineP1.attack}</p>
                            <p className="healthgame">Hp: {showMachineP1.health}</p>
                            <p className="attackrangegame">Atk range: {showMachineP1.attack_range}</p>
                            <p className="moverangegame">Move range: {showMachineP1.movement_range}</p>
                            <p className="armorgame">Armored spots: {showMachineP1.armor[0]} {showMachineP1.armor[1] &&
                            showMachineP1.armor[1]} {showMachineP1.armor[2] && showMachineP1.armor[2]}</p>
                            <p className="weak-spotsgame">Weak spots:<br/>{showMachineP1.weak_spots[0]} {showMachineP1.weak_spots[1] &&
                            showMachineP1.weak_spots[1]} {showMachineP1.weak_spots[2] && showMachineP1.weak_spots[2]}</p>
                            <p className="abilitygame">Ability: {showMachineP1.ability}</p>
                        </div>
                    </div>
                </div>}
                <div className="p1-machinepieces">
                {machinesp1.map((machine, index) => (
                        <div
                        key={index}
                        id={"p1machine" + index}
                        style={colorBorders(machine)}
                        onFocus={(e) => showMovementPreview(e, machine)}
                        onBlur={(e) => clearMovementPreview(e, machine)}
                        className="player1machine machine-piece"
                        onMouseEnter={(e) => showMachine(e, machine)}
                        onMouseLeave={(e) => clearMachine(e, machine)}
                        tabIndex={-1}
                        onKeyDown={(e) => navigateBoard(e, machine)}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e)=> e.preventDefault()}
                        onDragEnter={(e)=> e.preventDefault()}
                        onDragLeave={(e)=> e.preventDefault()}
                        onDragEnd={(e) => dragEnd(e, machine)}
                        >
                            <br/>{machine.name}<br/><br/>Atk:{machine.attack} Hp:{machine.health}
                        </div>
                ))}
                </div>
            </div>
            <div className="gameboard">
                {board.tiles.map((tile, index) => (
                    <div
                    key={index}
                    id={index}
                    className={tile}
                    onDragOver={(e)=> e.preventDefault()}
                    onDragEnter={(e)=> e.preventDefault()}
                    onDragLeave={(e)=> e.preventDefault()}
                    onDrop={dragDrop}
                    ></div>
                    ))}
                {checkIfAllMachinesHaveTilePositions() && <button id="start-button"
                onClick={() => trySetBoard()}>Start game</button>}
                {gameState && <button className="end-turn-button"
                onClick={() => tryEndTurn()}
                disabled={!gameState.board.players[0].two_machines_were_played &&
                !gameState.board.players[1].two_machines_were_played}
                >End turn</button>}
            </div>
            <div className="p2-info">
                <p></p>
                {!showMachineP2 && <p></p>}
                {showMachineP2 && <div className="show-piecesgame">
                    <div className="show-machinegame">
                        <div className="name-and-pointsgame">
                            <h3>{showMachineP2.name.charAt(0).toUpperCase() + showMachineP2.name.slice(1)}</h3>
                            <p>Points: {showMachineP2.points}</p>
                        </div>
                        <div>
                            <img
                            className="shown-machinegame"
                            src={playImages[gameState.board.machines.indexOf(showMachineP2)]}
                            alt={showMachineP2.name}/>
                        </div>
                        <div className="statsgame">
                            <p className="attackgame">Atk: {showMachineP2.attack}</p>
                            <p className="healthgame">Hp: {showMachineP2.health}</p>
                            <p className="attackrangegame">Atk range: {showMachineP2.attack_range}</p>
                            <p className="moverangegame">Move range: {showMachineP2.movement_range}</p>
                            <p className="armorgame">Armored spots: {showMachineP2.armor[0]} {showMachineP2.armor[1] &&
                            showMachineP2.armor[1]} {showMachineP2.armor[2] && showMachineP2.armor[2]}</p>
                            <p className="weak-spotsgame">Weak spots:<br/>{showMachineP2.weak_spots[0]} {showMachineP2.weak_spots[1] &&
                            showMachineP2.weak_spots[1]} {showMachineP2.weak_spots[2] && showMachineP2.weak_spots[2]}</p>
                            <p className="abilitygame">Ability: {showMachineP2.ability}</p>
                        </div>
                    </div>
                </div>}
                <div className="p2-machinepieces">
                {machinesp2.map((machine, index) => (
                    <div
                    key={index}
                    id={"p2machine" + index}
                    style={colorBorders(machine)}
                    onFocus={(e) => showMovementPreview(e, machine)}
                    onBlur={(e) => clearMovementPreview(e, machine)}
                    className="player2machine machine-piece"
                    onMouseEnter={(e) => showMachineSecondPlayer(e, machine)}
                    onMouseLeave={(e) => clearMachineSecondPlayer(e, machine)}
                    tabIndex={-1}
                    onKeyDown={(e) => navigateBoard(e, machine)}
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={(e)=> e.preventDefault()}
                    onDragEnter={(e)=> e.preventDefault()}
                    onDragLeave={(e)=> e.preventDefault()}
                    onDragEnd={(e) => dragEnd(e, machine)}>
                        <br/>{machine.name}<br/><br/>Atk:{machine.attack} Hp:{machine.health}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}