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
    const tileStart = coordinate;
    const shipLength =
      shipsOnBoard[shipName].length;
    let count = 1;
    if (!obj.verticalShip) {
      if (tileStart % 10 != 0) {
        obj.board[tileStart-1] = "null";
        if (obj.board[(tileStart-1)+10] === "")
          obj.board[(tileStart-1)+10] = "null";
        if (obj.board[(tileStart-1)-10] === "")
          obj.board[(tileStart-1)-10] = "null";
      }
      if ((tileStart + shipLength) % 10 != 0) {
        obj.board[tileStart + shipLength] = "null";
        if (obj.board[(tileStart + shipLength)+10] === "")
          obj.board[(tileStart + shipLength)+10] = "null";
        if (obj.board[(tileStart + shipLength)-10] === "")
          obj.board[(tileStart + shipLength)-10] = "null";
      }
      for (let i = tileStart; i < tileStart + shipLength; i++) {
        obj.board[i] = `${shipName}${count}`;
        if (i+10 < 100)
          obj.board[i+10] = "null";
        if (i-10 > -1)
          obj.board[i-10] = "null";
        count++;
      }
    } else {
      if (tileStart >= 10) {
        obj.board[tileStart-10] = "null";
        if (obj.board[tileStart-10+1] == "" && (tileStart-9) % 10 != 0)
          obj.board[tileStart-10+1] = "null";
        if (obj.board[tileStart-10-1] == "" && tileStart % 10 != 0)
          obj.board[tileStart-10-1] = "null";
      }
      if ((tileStart + (10 * shipLength)) < 100) {
        obj.board[tileStart+(10 * shipLength)] = "null";
        if (obj.board[(tileStart+(10*shipLength))+1] == "" && (tileStart-9) % 10 != 0)
          obj.board[(tileStart+(10*shipLength))+1] = "null";
        if (obj.board[(tileStart+(10*shipLength))-1] == "" && tileStart % 10 != 0)
          obj.board[(tileStart+(10*shipLength))-1] = "null";
      }
      for (let i = tileStart; i < tileStart + (10 * shipsOnBoard[shipName].length); i+=10) {
        obj.board[i] = `${shipName}${count}`;
        if (i % 10 != 0)
          obj.board[i-1] = "null";
        if ((i-9) % 10 != 0)
          obj.board[i+1] = "null";
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

  const recieveAttack = (coordinate) => {
    const tileAttacked = obj.board[coordinate];
    if (tileAttacked === '') 
      obj.board[coordinate] = 'miss';  
    else if (tileAttacked === 'null') {
      obj.board[coordinate] += '-miss';
    } else {
      obj.shipsOnBoard[`${tileAttacked.slice(0, -1)}`].addHit();
      obj.board[coordinate] += '-hit';
      if (obj.shipsOnBoard[`${tileAttacked.slice(0, -1)}`].isSunk)
        setShipAsDestroyed(tileAttacked.slice(0, -1));
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

  let attackedPositions = [];
  const computerRandomAttack = () => {
    let newPositionToAttack = 
      Math.floor(Math.random() * 100);
    while (attackedPositions.includes(newPositionToAttack))
      newPositionToAttack = Math.floor(Math.random() * 100);
    obj.recieveAttack(newPositionToAttack);
    obj.attackedPositions.push(newPositionToAttack);
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

  const obj = { 
    board, 
    shipsOnBoard, 
    recieveAttack,
    addShipToBoard,
    isBattleLost,
    checkingForDefeat,
    verticalShip,
    changeShipDirection,
    attackedPositions,
    computerRandomAttack,
    randomlyAddShips,
    checkAvailableSpaces
  };
  return obj;
}

module.exports = boardFactory;
