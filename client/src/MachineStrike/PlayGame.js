import React from "react";
import { useState } from "react";
import { hiddenStartGameKey } from "./hiddenkeys";
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
                body: JSON.stringify({"player1": player1, "player2": player2, "currentBoard": board, "player1Machines": machinesp1,
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

    const checkIfAllMachinesHaveTilePositions = () => {
        if (startButtonIsClicked) {
            return false;
        }
        for (let i = 0; i < machinesp1.length; i++) {
            if (machinesp1[i].tile_position === null || machinesp1[i].tile_position === undefined) {
                return false;
            }
        }
        for (let i = 0; i < machinesp2.length; i++) {
            if (machinesp2[i].tile_position === null || machinesp2[i].tile_position === undefined) {
                return false;
            }
        }
        return true;
    }

    const navigateBoard = (e) => {
        if (!e.target.draggable && gameState) {
            const machinePiece = document.getElementById(e.target.id)
            let currentTile = document.getElementById(e.target.parentElement.id)
            let integerId = parseInt(e.target.parentElement.id)
            switch(e.key) {
                case "ArrowUp":
                    integerId -= 8
                    currentTile = document.querySelector(`#${CSS.escape(integerId.toString())}`)
                    currentTile.appendChild(machinePiece);
                    break;
                case "ArrowRight":
                    integerId += 1
                    currentTile = document.querySelector(`#${CSS.escape(integerId.toString())}`)
                    currentTile.appendChild(machinePiece);
                    break;
                case "ArrowDown":
                    integerId += 8
                    currentTile = document.querySelector(`#${CSS.escape(integerId.toString())}`)
                    currentTile.appendChild(machinePiece);
                    break;
                case "ArrowLeft":
                    integerId -= 1
                    currentTile = document.querySelector(`#${CSS.escape(integerId.toString())}`)
                    currentTile.appendChild(machinePiece);
                    break;
                default:
                    break;
            }
        }
    }

    const showMovementPreview = (e) => {
        const machinePiece = document.getElementById(e.target.id)
        const selectedTile = document.getElementById(e.target.parentElement.id)
        console.log(machinePiece);
        console.log(selectedTile);
    }

    const endTurn = () => {
        if (gameState.board.players[0].has_turn) {
            gameState.board.players[0].has_turn = false
            gameState.board.players[1].has_turn = true
        } else {
            gameState.board.players[0].has_turn = true
            gameState.board.players[1].has_turn = false
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
                        onMouseEnter={() => setShowMachineP1(machine)}
                        onMouseLeave={() => setShowMachineP1(null)}
                        className="player1machine machine-piece"
                        // onClick={showMovementPreview}
                        tabIndex={-1}
                        onKeyDown={navigateBoard}
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
                {checkIfAllMachinesHaveTilePositions() &&<button id="start-button"
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
                    onMouseEnter={() => setShowMachineP2(machine)}
                    onMouseLeave={() => setShowMachineP2(null)}
                    className="player2machine machine-piece"
                    tabIndex={-1}
                    onKeyDown={navigateBoard}
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