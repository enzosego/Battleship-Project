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

const shipLengthMap = {
  0: 5,
  1: 4,
  2: 3,
  3: 3,
  4: 2
}

export const App = () => {
  const [ playerBoard, setPlayerBoard ] = useState(() => playerBoardFactory());
  const [ computerBoard, setComputerBoard ] = useState(() => computerBoardFactory());
  const [ shipCount, setShipCount ] = useState(() => 0);
  const [ turn, setTurn ] = useState(() => "player");
  const [ hasGameStarted, setHasGameStarted ] = useState(() => false);
  const [ verticalAxis, setVerticalAxis ] = useState(() => false);
  const [ whoLost, setWhoLost ] = useState(() => "");

  useEffect(() => {
    const didPlayerLose = playerBoard.checkingForDefeat();
    if (didPlayerLose) 
      setTimeout(() => setWhoLost("player"), 2000);
  }, [playerBoard]);

  useEffect(() => {
    const didComputerLose = computerBoard.checkingForDefeat();
    if (didComputerLose) 
      setTimeout(() => setWhoLost("computer"), 2000);
  }, [computerBoard]);

  useEffect(() => {
    if (hasGameStarted === true)
      sortComputerShips();
  }, [hasGameStarted])

  useEffect(() => {
    const didPlayerLose = playerBoard.checkingForDefeat();
    const didComputerLose = computerBoard.checkingForDefeat();
    if (turn === "computer" && !didComputerLose && !didPlayerLose) 
      setTimeout(handleComputerAttack, 1500);
  }, [turn])

  const triggerGameStart = () => 
    setHasGameStarted(!hasGameStarted);

  const resetGame = () => {
    setHasGameStarted(false);
    setPlayerBoard(() => playerBoardFactory());
    setComputerBoard(() => computerBoardFactory());
    setVerticalAxis(false);
    setShipCount(0);
    setWhoLost("");
    setTurn("player");
  }

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

  const isPositionViable = (index) => {
    const shipLength = shipLengthMap[shipCount]-1;
    if (verticalAxis) {
      if (index+(shipLength*10) > 99)
        return false;
    } else {
      if (index > 10 && +`${index}`[0] < +`${index+shipLength}`[0])
        return false;
      if (`${index}`.length < `${index+shipLength}`.length)
        return false;
    }
    return true;
  }

  const removeLastShip = () => {
    if (shipCount <= 0) return;
    const boardCopy = {...playerBoard};
    const shipToRemove = shipNameMap[shipCount-1];
    boardCopy.removeShipFromBoard(shipToRemove);
    setPlayerBoard(boardCopy);
    setShipCount(prevValue => prevValue-1);
  }

  const addPlayerShip = index => {
    if (hasGameStarted === true) return;
    if (!isPositionViable(index)) return;
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
    if (turn === "computer") return;
    const didPlayerLose = playerBoard.checkingForDefeat();
    if (didPlayerLose) return;
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
            computerBoard={computerBoard}
            removeLastShip={removeLastShip}/>
        : <EndScreen 
            whoLost={whoLost}
            resetGame={resetGame}/>
      }
    </section>
  );
};
