import React, { useState, useEffect } from "react";
import { Player } from "../Player/Player";
import { Computer } from "../Computer/Computer";
const boardFactory = require('../../utils/board_factory/board_factory');

const shipNamesArray = {
  1: "Carrier",
  2: "Battleship",
  3: "Cruiser",
  4: "Submarine",
  5: "Destroyer"
}

export const GameBoard = () => {
  const [ playerBoard, setPlayerBoard ] = useState(() => boardFactory());
  const [ computerBoard, setComputerBoard ] = useState(() => boardFactory());
  const [ computerAttacks, setComputerAttacks ] = useState(() => []);
  const [ shipCount, setShipCount ] = useState(1);
  const [ turn, setTurn ] = useState("player");

  useEffect(() => {
    if (shipCount == 6) setShipCount(1);
  }, [shipCount])

  useEffect(() => {
    if (turn === "computer") {

    }
  }, [turn])

  const addShipToBoard = () => {
    const updatedBoard = {...playerBoard};
    updatedBoard.addShipToBoard(shipCount*10 ,shipNamesArray[shipCount]);
    //board == playerBoard
    //  ? setPlayerBoard(updatedBoard)
    //  : setComputerBoard(updatedBoard);
    setPlayerBoard(updatedBoard);
    setShipCount(prevValue => prevValue+=1)
  }

  const switchTurn = () => 
    setTurn(prevValue => !prevValue);
  return(
    <section className="game-board">
      <Player 
        playerBoard={playerBoard}
        addShipToBoard={addShipToBoard}/>
      <Computer 
        computerBoard={computerBoard}
        addShipToBoard={addShipToBoard}/>
    </section>
    )
}
