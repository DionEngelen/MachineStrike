import React from "react";
import { useState, useEffect } from "react";
import "./PickBoard.css";

export function PickBoard({chooseBoard}) {
    const [boards, setBoards] = useState([])
    const [board, setBoard] = useState(null);

    async function fetchBoard() {
        try {
            const response = await fetch("http://localhost:5000/boards", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const playBoards = await response.json();
                console.log(playBoards);
                setBoards(playBoards);
                console.log(boards);
            }
        } catch (error) {
            console.log(error.toString());
        }
    }

    useEffect (() => {
        fetchBoard();
    },[]);

    return(
        <div className="pick-board">
            <div className="leftside">
            </div>
            <div className="select-board">
                <h2>Choose a board you like</h2>
                <div className="raintrace">
                    <button
                    onMouseEnter={() => {setBoard(boards[0])}}
                    onMouseLeave={() => setBoard(null)}
                    onClick={() => chooseBoard(board)}>The Raintrace</button>
                </div>
                <div className="bulwark">
                    <button
                    onMouseEnter={() => setBoard(boards[1])}
                    onMouseLeave={() => setBoard(null)}
                    onClick={() => chooseBoard(board)}>The Bulwark</button>
                </div>
                <div className="cinnabar-sands">
                    <button
                    onMouseEnter={() => setBoard(boards[2])}
                    onMouseLeave={() => setBoard(null)}
                    onClick={() => chooseBoard(board)}>Cinnabar Sands</button>
                </div>
            </div>
            <div className="show-board">
                {board && board.tiles.map((tile, index) => (
                    <div
                    key={index}
                    className={tile}></div>
                    ))
                }
            </div>
        </div>
    )
}