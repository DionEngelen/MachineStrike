import React from "react";
import { useState, useEffect } from "react";
import { hiddenBoardsKey } from "./hiddenkeys.js";
import "./PickBoard.css";
import raintrace from "../images/PickBoardImages/TheRaintrace.png";
import bulwark from "../images/PickBoardImages/TheBulwark.png";
import cinnabarSands from "../images/PickBoardImages/CinnabarSands.png";

export function PickBoard({chooseBoard}) {
    const leftSideImages = [{name: "raintrace", source: raintrace},
    {name: "bulwark", source: bulwark},
    {name: "cinnabarSands", source: cinnabarSands}];

    const [leftSideImage, setLeftSideImage] = useState(null);
    const [fetchedBoards, setFetchedBoards] = useState(null)
    const [board, setBoard] = useState(null);

    async function fetchBoard() {
        try {
            const response = await fetch(hiddenBoardsKey(), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const playBoards = await response.json();
                setFetchedBoards(playBoards);        
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
                {leftSideImage && <div>
                    {leftSideImage === raintrace &&
                    <p>The Raintrace, a vast forest known<br/>to be overgrown
                    by hundreds of exotic<br/>species both fauna and flora.<br/>
                    One could get easily lost.</p>}
                    {leftSideImage === bulwark &&
                    <p>The Bulwark consists of dangerous, glacial<br/> territories
                    inhabited by machines<br/>resistant to the frigid cold.<br/>
                    Most who enter do not survive.</p>}
                    {leftSideImage === cinnabarSands &&
                    <p>The arid climate of the Cinnabar Sands<br/>caused the clans to
                    scatter creating rivalry<br/> among them. Anyone wandering<br/>
                    them alone will not be spared.</p>}
                    <img src={leftSideImage} alt={leftSideImage}/>
                </div>}
            </div>
            <div className="select-board">
                <h2>Choose a board you like</h2>
                {leftSideImages.map((image, index)=> (
                    <div
                    className={image.name}
                    onMouseEnter={() => setLeftSideImage(image.source)}
                    onMouseLeave={() => setLeftSideImage(null)}>
                        <button
                        onMouseEnter={() => {setBoard(fetchedBoards[index])}}
                        onMouseLeave={() => setBoard(null)}
                        onClick={() => chooseBoard(board)}>{fetchedBoards ? fetchedBoards[index].name : ""}</button>
                    </div>
                ))}
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