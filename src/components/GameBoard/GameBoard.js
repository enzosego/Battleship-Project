import React, { useState, useEffect } from "react";
import { Player } from "../Player/Player";
import { Computer } from "../Computer/Computer";
const playerBoardFactory = require('../../utils/player_board_factory/player_board_factory');
const computerBoardFactory = require('../../utils/computer_board_factory/computer_board_factory');

const shipNameMap = {
  0: "Carrier",
  1: "Battleship",
  2: "Cruiser",
  3: "Submarine",
  4: "Destroyer"
}

export const GameBoard = () => {
  const [ playerBoard, setPlayerBoard ] = useState(() => playerBoardFactory());
  const [ computerBoard, setComputerBoard ] = useState(() => computerBoardFactory());
  const [ shipCount, setShipCount ] = useState(() => 0);
  const [ turn, setTurn ] = useState(() => "player");
  const [ hasGameStarted, setHasGameStarted ] = useState(() => false);

  useEffect(() => {
    console.log(turn);
  }, [turn]);
  
  const addPlayerShip = index => {
    const updatedBoard = {...playerBoard};
    updatedBoard.addShipToBoard(index , shipNameMap[shipCount]);
    setPlayerBoard(updatedBoard);
    setShipCount(prevValue => prevValue+=1)
  }

  const sortComputerShips = () => {
    const updatedBoard = {...computerBoard};
    updatedBoard.randomlyAddShips();
    setComputerBoard(updatedBoard);
  }

  useEffect(() => {
    if (hasGameStarted === true)
      sortComputerShips();
  }, [hasGameStarted])

  const handleGameStart = () => {
    setHasGameStarted(!hasGameStarted);
  }

  const handlePlayerAttack = index => {
    let newBoard = {...computerBoard};
    newBoard.recieveAttack(index);
    setComputerBoard(newBoard);
  }

  const switchTurn = () => 
    turn === "player"
      ? setTurn("computer")
      : setTurn("player");
  return(
    <section className="game-board">
      <button onClick={handleGameStart}>Start Game</button>
      <Player 
        playerBoard={playerBoard}
        addPlayerShip={addPlayerShip}/>
      {hasGameStarted === false
        ? ""
        : <Computer 
          computerBoard={computerBoard}
          handlePlayerAttack={handlePlayerAttack}/>}
    </section>
    )
}
