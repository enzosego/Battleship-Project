import React, { useState, useEffect } from "react";
import { GameBoard } from "./components/GameBoard/GameBoard";
import { EndScreen } from "./components/EndScreen/EndScreen";
import "./App.scss";
const playerBoardFactory = require('./utils/player_board_factory/player_board_factory');
const computerBoardFactory = require('./utils/computer_board_factory/computer_board_factory');

const shipNameMap = {
  0: "Carrier",
  1: "Battleship",
  2: "Cruiser",
  3: "Submarine",
  4: "Destroyer"
}

export const App = () => {
  const [ playerBoard, setPlayerBoard ] = useState(() => playerBoardFactory());
  const [ computerBoard, setComputerBoard ] = useState(() => computerBoardFactory());
  const [ shipCount, setShipCount ] = useState(() => 0);
  const [ turn, setTurn ] = useState(() => "player");
  const [ hasGameStarted, setHasGameStarted ] = useState(() => false);
  const [ verticalAxis, setVerticalAxis ] = useState(() => false);
  const [ whoLost, setWhoLost ] = useState(() => "");

  const resetGame = () => {
    setPlayerBoard(() => playerBoardFactory());
    setComputerBoard(() => computerBoardFactory());
    setShipCount(0);
    setHasGameStarted(false);
    setWhoLost("");
  }

  useEffect(() => {
    const didPlayerLose = playerBoard.checkingForDefeat();
    if (didPlayerLose) 
      setWhoLost("player");
  }, [playerBoard]);

  useEffect(() => {
    const didComputerLose = computerBoard.checkingForDefeat();
    if (didComputerLose) 
      setWhoLost("computer");
  }, [computerBoard]);

  useEffect(() => {
    if (hasGameStarted === true)
      sortComputerShips();
  }, [hasGameStarted])

  const triggerGameStart = () => 
    setHasGameStarted(!hasGameStarted);

  const switchTurn = () => 
    turn === "player"
      ? setTurn("computer")
      : setTurn("player");

  const switchShipAxis = () => {
    setVerticalAxis(!verticalAxis);
    let boardCopy = {...playerBoard};
    boardCopy.changeShipDirection();
    setPlayerBoard(boardCopy);
  }

  const addPlayerShip = index => {
    if (hasGameStarted === true) return;
    const boardCopy = {...playerBoard};
    boardCopy.addShipToBoard(index , shipNameMap[shipCount]);
    setPlayerBoard(boardCopy);
    setShipCount(prevValue => prevValue+=1)
  }

  const sortComputerShips = () => {
    const boardCopy = {...computerBoard};
    boardCopy.randomlyAddShips();
    setComputerBoard(boardCopy);
  }

  const handlePlayerAttack = index => {
    switchTurn();
    let boardCopy = {...computerBoard};
    boardCopy.recieveAttack(index);
    setComputerBoard(boardCopy);
  }

  const handleComputerAttack = () => {
    switchTurn();
    let boardCopy = {...playerBoard};
    boardCopy.computerAttack();
    setPlayerBoard(boardCopy);
  }

  useEffect(() => {
    if (turn === "computer")
      handleComputerAttack();
  }, [turn])

  return (
    <section className="App">
      {whoLost === ""
        ? <GameBoard 
            triggerGameStart={triggerGameStart}
            hasGameStarted={hasGameStarted}
            switchShipAxis={switchShipAxis}
            verticalAxis={verticalAxis}
            addPlayerShip={addPlayerShip}
            handlePlayerAttack={handlePlayerAttack}
            playerBoard={playerBoard}
            computerBoard={computerBoard}/>
        : <EndScreen 
            whoLost={whoLost}
            resetGame={resetGame}/>
      }
    </section>
  );
};
