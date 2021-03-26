const shipFactory = require('../ship_factory/ship_factory');

const pushingShipsOnBoard = () => {
  const Carrier = shipFactory("Carrier");
  const Battleship = shipFactory("Battleship");
  const Cruiser = shipFactory("Cruiser");
  const Submarine = shipFactory("Submarine");
  const Destroyer = shipFactory("Destroyer");
  return {
    Carrier,
    Battleship, 
    Cruiser, 
    Submarine, 
    Destroyer
  };
}

const boardFactory = () => {
  let board = [
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
  ]
  
  let verticalShip = false;
  const changeShipDirection = () => 
    obj.verticalShip = !obj.verticalShip;

  const shipsOnBoard = pushingShipsOnBoard();

  const addShipToBoard = (coordinate, shipName) => {
    const {
      board,
      verticalShip,
      shipsOnBoard
    } = obj;
    const tileStart = coordinate;
    const shipLength =
      shipsOnBoard[shipName].length;
    let count = 1;
    if (!verticalShip) {
      shipsOnBoard[shipName].axis = "X";
      if (tileStart % 10 != 0) {
        board[tileStart-1] = "null";
        if (board[(tileStart-1)+10] === "")
          board[(tileStart-1)+10] = "null";
        if (board[(tileStart-1)-10] === "")
          board[(tileStart-1)-10] = "null";
      }
      if ((tileStart + shipLength) % 10 != 0) {
        board[tileStart + shipLength] = "null";
        if (board[(tileStart + shipLength)+10] === "")
          board[(tileStart + shipLength)+10] = "null";
        if (board[(tileStart + shipLength)-10] === "")
          board[(tileStart + shipLength)-10] = "null";
      }
      for (let i = tileStart; i < tileStart + shipLength; i++) {
        board[i] = `${shipName}${count}`;
        if (i+10 < 100)
          board[i+10] = "null";
        if (i-10 > -1)
          board[i-10] = "null";
        count++;
      }
    } else {
      shipsOnBoard[shipName].axis = "Y";
      if (tileStart >= 10) {
        board[tileStart-10] = "null";
        if (board[tileStart-10+1] == "" && (tileStart-9) % 10 != 0)
          board[tileStart-10+1] = "null";
        if (board[tileStart-10-1] == "" && tileStart % 10 != 0)
          board[tileStart-10-1] = "null";
      }
      if ((tileStart + (10 * shipLength)) < 100) {
        board[tileStart+(10 * shipLength)] = "null";
        if (board[(tileStart+(10*shipLength))+1] == "" && (tileStart-9) % 10 != 0)
          board[(tileStart+(10*shipLength))+1] = "null";
        if (board[(tileStart+(10*shipLength))-1] == "" && tileStart % 10 != 0)
          board[(tileStart+(10*shipLength))-1] = "null";
      }
      for (let i = tileStart; i < tileStart + (10 * shipsOnBoard[shipName].length); i+=10) {
        board[i] = `${shipName}${count}`;
        if (i % 10 != 0)
          board[i-1] = "null";
        if ((i-9) % 10 != 0)
          board[i+1] = "null";
        count++;
      }
    }
  }

  const setShipAsDestroyed = (shipName) => {
    let count = 0;
    for (let i = 0; i < obj.board.length; i++) {
      if (count >= obj.shipsOnBoard[shipName].length) break;
      if (board[i].includes(shipName)) {
        board[i] = board[i].slice(0, -3);
        board[i] += "destroyed";
        count++;
      }
    }
  }

  let isBattleLost = false;
  const checkingForDefeat = () => {
    let sunkShipsCount = 0;
    for (const [key, ship] of Object.entries(obj.shipsOnBoard)) 
      if (ship.isSunk) 
        sunkShipsCount++;
    if (sunkShipsCount >= 5) 
      obj.isBattleLost = true;
  }

  const checkAvailableSpaces = (shipName) => {
    const shipLength = obj.shipsOnBoard[shipName].length;
    let availableSpaces = [];
    if (obj.verticalShip) 
      for (let i = 0; i < obj.board.length; i++) {
        if (i + (shipLength*10) > 109)
          continue
        if (obj.board[i] === "") {
          let count = 1;
          for (let j = i+10; j < ((shipLength) * 10)+i; j+=10) {
            if (obj.board[j] === "") 
              count++;
            else break;
          }
          if (count === shipLength)
            availableSpaces.push(i);
        }
      }
    else {
      for (let i = 0; i < obj.board.length; i++) {
        const strNum = `${i}`;
        if (obj.board[i] === "" && (strNum[1] < 11-shipLength || strNum < 11-shipLength)) {
          let count = 1;
          for (let j = i+1; j < (shipLength)+i; j++) {
            if (obj.board[j] === "") {
              count++;
            }
            else break;
          }
          if (count === shipLength)
            availableSpaces.push(i);
        }
      }
    }
    return availableSpaces;
  }

  const changeDirectionRandomly = () => 
    Math.random() > 0.5
      ? changeShipDirection()
      : "";

  const pickRandomCoordinate = (num = 100) => 
    Math.floor(Math.random() * num);

  const addIndividualShip = (shipName) => {
    changeDirectionRandomly();
    let availableSpaces = checkAvailableSpaces(shipName);
    if (availableSpaces.length === 0) {
      obj.changeShipDirection();
      availableSpaces = checkAvailableSpaces(shipName);
    }
    const randomIndex = pickRandomCoordinate(availableSpaces.length);
    obj.addShipToBoard(availableSpaces[randomIndex], shipName);
  }


  const randomlyAddShips = () => {
    addIndividualShip("Carrier");
    addIndividualShip("Battleship");
    addIndividualShip("Cruiser");
    addIndividualShip("Submarine");
    addIndividualShip("Destroyer");
  }

  let attackedPositions = [];
  let lastHitIndex;
  let shipToDestroy = "";
  let posiblePositions = [];

  const recieveAttack = (coordinate) => {
    let { 
      board, shipsOnBoard,
      attackedPositions
    } = obj;
    attackedPositions.push(coordinate);
    const tileAttacked = board[coordinate];
    if (tileAttacked === '') 
      board[coordinate] = 'miss';  
    else if (tileAttacked === 'null') 
      board[coordinate] += '-miss';
    else {
      const shipName = tileAttacked.slice(0, -1);
      shipsOnBoard[shipName].addHit();
      board[coordinate] += '-hit';
      if (shipsOnBoard[shipName].isSunk) {
        setShipAsDestroyed(shipName);
        obj.shipToDestroy = "";
      }
      else {
        obj.lastHitIndex = coordinate;
        obj.shipToDestroy = shipName;
      }
    }
    obj.posiblePositions = [];
  }

  const computerRandomAttack = () => {
    const { recieveAttack, attackedPositions } = obj;
    let newCoordinate = 
      pickRandomCoordinate();
    while (attackedPositions.includes(newCoordinate)) 
      newCoordinate  = pickRandomCoordinate();
    recieveAttack(newCoordinate);
  }

  const checkPositionsBeforeAttack = () => {
    let { board, lastHitIndex,
      shipToDestroy, shipsOnBoard,
      attackedPositions, posiblePositions
    } = obj;

    if (shipsOnBoard[shipToDestroy].hits > 1) {
      const startIndex = board.indexOf(
        board.find(tile => tile.includes(`${shipToDestroy}1`))
      );
      const shipLength = shipsOnBoard[shipToDestroy].length;
      if (shipsOnBoard[shipToDestroy].axis == "X") {
        for (let i = startIndex; i < startIndex+shipLength && i < 100; i++) 
          if (!attackedPositions.includes(i) && board[i] !== "") 
            posiblePositions.push(i);
        for (let i = startIndex; i > startIndex-shipLength && i > -1; i--) 
          if (!attackedPositions.includes(i) && board[i] !== "") 
            posiblePositions.push(i);
      }
      else {
        for (let i = startIndex; i < startIndex+(shipLength*10) && i < 100; i+=10) 
          if (!attackedPositions.includes(i) && board[i] !== "") 
            posiblePositions.push(i);
        for (let i = startIndex; i < startIndex-(shipLength*10) && i > -1; i-=10) 
          if (!attackedPositions.includes(i) && board[i] !== "") 
            posiblePositions.push(i);
      }
      return;
    }

    if (lastHitIndex+10 < 100)
      if (!attackedPositions.includes(lastHitIndex+10)) 
        posiblePositions.push(lastHitIndex+10);
    if (lastHitIndex-10 >= 0)
      if (!attackedPositions.includes(lastHitIndex-10)) 
        posiblePositions.push(lastHitIndex-10);
    if (lastHitIndex+1 < 100 && lastHitIndex-9 % 10 !== 0)
      if (!attackedPositions.includes(lastHitIndex+1)) 
        posiblePositions.push(lastHitIndex+1);
    if (lastHitIndex-1 >= 0 && lastHitIndex % 10 !== 0)
      if (!attackedPositions.includes(lastHitIndex-1)) 
        posiblePositions.push(lastHitIndex-1);
  }

  const computerSentientAttack = () => {
    let { recieveAttack, posiblePositions } = obj;
    checkPositionsBeforeAttack();
    const randomIndex = Math.floor(Math.random() * posiblePositions.length);
    recieveAttack(posiblePositions[randomIndex]);
  }

  const computerAttack = () => {
    let { shipToDestroy } = obj;
    if (shipToDestroy === "") 
      computerRandomAttack();
    else 
      computerSentientAttack();
  }

  const obj = { 
    board, 
    shipsOnBoard, 
    recieveAttack,
    addShipToBoard,
    isBattleLost,
    checkingForDefeat,
    verticalShip,
    changeShipDirection,
    randomlyAddShips,
    checkAvailableSpaces,
    attackedPositions,
    lastHitIndex,
    posiblePositions,
    shipToDestroy,
    computerRandomAttack,
    computerAttack
  };
  return obj;
}

module.exports = boardFactory;
