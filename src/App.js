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
  const [ turn, setTurn ] = useState(() => "player");
  const [ hasGameStarted, setHasGameStarted ] = useState(() => false);
  const [ verticalAxis, setVerticalAxis ] = useState(() => false);
  const [ whoLost, setWhoLost ] = useState(() => "");
  const [ shipCount, setShipCount ] = useState(() => 0);
  const [ shipPreview, setShipPreview ] = useState(() => []);
  const [ availableSpaces, setAvailableSpaces ] = useState(() => []);

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
    const didPlayerLose = 
      playerBoard.checkingForDefeat();
    const didComputerLose = 
      computerBoard.checkingForDefeat();
    if (turn === "computer" && !didComputerLose && !didPlayerLose) 
      setTimeout(handleComputerAttack, 1000);
  }, [turn])

  useEffect(() => {
    const shipName =
      shipNameMap[shipCount];
    const newSpaces = 
      playerBoard.checkAvailableSpaces(shipName);
    setAvailableSpaces(newSpaces);
  }, [shipCount, verticalAxis]);

  const triggerGameStart = () => {
    if (shipCount >= 5)
      setHasGameStarted(!hasGameStarted);
  }

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

  const isPositionViable = (index) => 
    availableSpaces.includes(index)

  const addPlayerShip = index => {
    if (hasGameStarted === true) return;
    if (!isPositionViable(index)) return;
    const boardCopy = {...playerBoard};
    boardCopy.addShipToBoard(index , shipNameMap[shipCount]);
    setPlayerBoard(boardCopy);
    setShipCount(prevValue => prevValue+=1)
  }

  const randomlyAddPlayerShips = () => {
    const boardCopy = {...playerBoard};
    boardCopy.randomlyAddShips();
    boardCopy.shipsOnBoard.Destroyer.axis === "Y"
      ? setVerticalAxis(true)
      : setVerticalAxis(false);
    setPlayerBoard(boardCopy);
    setShipCount(5);
  }

  const showShipPreview = (index) => {
    if (shipCount >= 5) return;
    if (!isPositionViable(index)) {
      setShipPreview([index]);
      return;
    }
    const shipLength = shipLengthMap[shipCount]-1;
    const newShipPreview = [];
    if (verticalAxis) 
      for (let i = index; i <= index+(shipLength*10); i+=10) 
        newShipPreview.push(i);
    else 
      for (let i = index; i <= index+shipLength; i++) 
        newShipPreview.push(i);
    setShipPreview(newShipPreview);
  }

  const hideShipPreview = () => 
    setShipPreview([]);

  const removeLastShip = () => {
    if (shipCount <= 0) return;
    const boardCopy = {...playerBoard};
    const shipToRemove = shipNameMap[shipCount-1];
    boardCopy.removeShipFromBoard(shipToRemove);
    setPlayerBoard(boardCopy);
    setShipCount(prevValue => prevValue-1);
  }

  const sortComputerShips = () => {
    const boardCopy = {...computerBoard};
    boardCopy.randomlyAddShips();
    setComputerBoard(boardCopy);
  }

  const handlePlayerAttack = index => {
    if (turn === "computer") return;
    const didPlayerLose = 
      playerBoard.checkingForDefeat();
    if (didPlayerLose) return;
    let boardCopy = {...computerBoard};
    const { board } = boardCopy;
    if (board[index].includes("miss") 
      || board[index].includes("sunk") 
      || board[index].includes("destroyed")
      || board[index].includes("hit"))
      return;
    switchTurn();
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
            removeLastShip={removeLastShip}
            shipPreview={shipPreview}
            showShipPreview={showShipPreview}
            hideShipPreview={hideShipPreview}
            randomlyAddPlayerShips={randomlyAddPlayerShips}/>
        : <EndScreen 
            whoLost={whoLost}
            resetGame={resetGame}/>
      }
    </section>
  );
};
