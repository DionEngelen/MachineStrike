import React from "react";
import { useState } from "react";
import { hiddenStartGameKey, hiddenPlayGameKey } from "./hiddenkeys";
import "./PlayGame.css";

export function PlayGame({player1, player2, board, machinesp1, machinesp2}) {
    let [tileBeingDraggedTo, setTileBeingDraggedTo] = useState();
    const [gameState, setGameState] = useState();
    const [startButtonIsClicked, setStartButtonIsClicked] = useState(false);
    const [showMachineP1, setShowMachineP1] = useState(null);
    const [showMachineP2, setShowMachineP2] = useState(null);

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
            }
        } catch (error) {
            console.log(error.toString());
        }
    }

    async function tryPlayGame(tileIndex, machine) {
        for (let i = 0; i < gameState.board.machines.length; i++) {
            if (machine.tile_position === gameState.board.machines[i].tile_position) {
                machine = gameState.board.machines[i]
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
                body: JSON.stringify({"board": gameState.board, "machine": machine, "facing": machine.facing, "tile": tileIndex})
            })
            if (response.ok) {
                const newBoard = await response.json();
                console.log(newBoard);
                setGameState(newBoard);
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
                    if (gameState.board.tiles[integerId].landscape === "chasm" && machine.type !== "Swoop") {
                        break;
                    }
                    currentTile = document.querySelector(`#${CSS.escape(integerId.toString())}`);
                    if (currentTile.firstChild.id.includes("machine")) {
                        break;
                    }
                    currentTile.appendChild(machinePiece);
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
                    if (currentTile.firstChild.id.includes("machine")) {
                        break;
                    }
                    currentTile.appendChild(machinePiece);
                    break;
                case "ArrowDown":
                    integerId += 8
                    if (gameState.board.tiles[integerId].landscape === "chasm" && machine.type !== "Swoop") {
                        break;
                    }
                    currentTile = document.querySelector(`#${CSS.escape(integerId.toString())}`);
                    if (currentTile.firstChild.id.includes("machine")) {
                        break;
                    }
                    currentTile.appendChild(machinePiece);
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
                    if (currentTile.firstChild.id.includes("machine")) {
                        break;
                    }
                    currentTile.appendChild(machinePiece);
                    break;
                case "Enter":
                    tryPlayGame(integerId, machine)
                    break;
                default:
                    break;
            }
            e.target.focus()
        }
    }

    const endTurn = () => {
        if (gameState.board.players[0].has_turn) {
            gameState.board.players[0].has_turn = false;
            gameState.board.players[1].has_turn = true;
        } else {
            gameState.board.players[0].has_turn = true;
            gameState.board.players[1].has_turn = false;
        }
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
            const integerId = parseInt(e.target.parentElement.id)
            for (let i = 1; i <= machine.movement_range; i++) {
                previewMovement1(integerId, i, integerId, machine);
                if (i > 1) {
                    previewMovement2(integerId, i, integerId, machine);
                }
                if (i > 2) {
                    previewMovement3(integerId, i, integerId, machine);
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
            const integerId = parseInt(e.target.parentElement.id);
            for (let i = 1; i <= machine.movement_range; i++) {
                clearMovement1(integerId, i, integerId, machine);
                if (i > 1) {
                    clearMovement2(integerId, i, integerId, machine);
                }
                if (i > 2) {
                    clearMovement3(integerId, i, integerId, machine);
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

    return (
        <div className="game">
            <div className="p1-info">
                <p>Info player 1</p>
                {/* {showMachineP1 && <div className="show-machine"></div>} */}
                <p className="show-machine">Left</p>
                <div className="p1-machinepieces">
                {machinesp1.map((machine, index) => (
                        <div
                        key={index}
                        id={"p1machine" + index}
                        onFocus={(e) => showMovementPreview(e, machine)}
                        onBlur={(e) => clearMovementPreview(e, machine)}
                        className="player1machine machine-piece"
                        // onClick={(e) => showMovementPreview(e, machine)}
                        tabIndex={-1}
                        onKeyDown={(e) => navigateBoard(e, machine)}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e)=> e.preventDefault()}
                        onDragEnter={(e)=> e.preventDefault()}
                        onDragLeave={(e)=> e.preventDefault()}
                        onDragEnd={(e) => dragEnd(e, machine)}
                        >
                            {machine.name}<br/><br/><br/>Atk:{machine.attack} Hp:{machine.health}
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
                onClick={() => endTurn()}
                disabled={!gameState.board.players[0].two_machines_were_played ||
                !gameState.board.players[1].two_machines_were_played}
                >End turn</button>}
            </div>
            <div className="p2-info">
                <p>Info player 2</p>
                {/* {showMachineP2 && <div className="show-machine"></div>} */}
                <p className="show-machine">Right</p>
                <div className="p2-machinepieces">
                {machinesp2.map((machine, index) => (
                    <div
                    key={index}
                    id={"p2machine" + index}
                    onFocus={(e) => showMovementPreview(e, machine)}
                    onBlur={(e) => clearMovementPreview(e, machine)}
                    className="player2machine machine-piece"
                    tabIndex={-1}
                    onKeyDown={(e) => navigateBoard(e, machine)}
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={(e)=> e.preventDefault()}
                    onDragEnter={(e)=> e.preventDefault()}
                    onDragLeave={(e)=> e.preventDefault()}
                    onDragEnd={(e) => dragEnd(e, machine)}>
                        {machine.name}<br/><br/><br/>Atk:{machine.attack} Hp:{machine.health}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}