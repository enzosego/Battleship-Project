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

const computerBoardFactory = () => {
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

  const setShipAsDestroyed = (shipName) => {
    let {
      board, shipsOnBoard,
      attackedPositions
    } = obj;
    const shipLength = shipsOnBoard[shipName].length;
    const startIndex = board.indexOf(
      board.find(tile => tile.includes(`${shipName}1`))
    );
    if (shipsOnBoard[shipName].axis === "X") {
      if (startIndex % 10 != 0) {
        board[startIndex-1] = "null-sunk";
        if (!attackedPositions.includes(startIndex-1))
          attackedPositions.push(startIndex-1);
        if (startIndex-11 >= 0) {
          board[startIndex-11] = "null-sunk";
          if (!attackedPositions.includes(startIndex-11))
            attackedPositions.push(startIndex-11);
        }
        if(startIndex+9 < 100) {
          board[startIndex+9] = "null-sunk";
          if (!attackedPositions.includes(startIndex+9))
            attackedPositions.push(startIndex+9);
        }
      }
      if (startIndex+shipLength % 10 != 0) {
        board[startIndex+shipLength] = "null-sunk";
        if (!attackedPositions.includes(startIndex+shipLength))
          attackedPositions.push(startIndex+shipLength);
        if (startIndex+shipLength-10 >= 0) {
          board[startIndex+shipLength-10] = "null-sunk"
          if (!attackedPositions.includes(startIndex+shipLength-10))
            attackedPositions.push(startIndex+shipLength-10);
        }
        if (startIndex+shipLength+10 < 100) {
          board[startIndex+shipLength+10] = "null-sunk"
          if (!attackedPositions.includes(startIndex+shipLength+10))
            attackedPositions.push(startIndex+shipLength+10);
        }
      }

      for (let i = startIndex; i < startIndex + shipLength; i++) {
        board[i] = board[i].slice(0, -3);
        board[i] += "destroyed";
        if (i+10 < 100) {
          board[i+10] = "null-sunk";
          if (!attackedPositions.includes(i+10))
            attackedPositions.push(i+10);
        }
        if (i-10 >= 0) {
          board[i-10] = "null-sunk";
          if (!attackedPositions.includes(i-10))
            attackedPositions.push(i-10);
        }
      }
    }
    else {
      if (startIndex-10 >= 0) {
        board[startIndex-10] = "null-sunk";
        if (!attackedPositions.includes(startIndex-10))
          attackedPositions.push(startIndex-10);
        if (startIndex % 10 != 0) {
          board[startIndex-11] = "null-sunk";
          if (!attackedPositions.includes(startIndex-11))
            attackedPositions.push(startIndex-11);
        }
        if(startIndex-9 % 10 != 0) {
          board[startIndex-9] = "null-sunk";
          if (!attackedPositions.includes(startIndex-9))
            attackedPositions.push(startIndex-9);
        }
      }
      if (startIndex+(shipLength*10) < 100) {
        board[startIndex+(shipLength*10)] = "null-sunk";
        if (!attackedPositions.includes(startIndex+(shipLength*10)))
          attackedPositions.push(startIndex+(shipLength*10));
        if (startIndex % 10 != 0) {
          board[startIndex+(shipLength*10)-1] = "null-sunk"
          if (!attackedPositions.includes(startIndex+(shipLength*10)-1))
            attackedPositions.push(startIndex+(shipLength*10)-1);
        }
        if (startIndex-9 % 10 != 0) {
          board[startIndex+(shipLength*10)+1] = "null-sunk"
          if (!attackedPositions.includes(startIndex+(shipLength*10)+1))
            attackedPositions.push(startIndex+(shipLength*10)+1);
        }
      }

      for (let i = startIndex; i < startIndex + (shipLength*10); i+=10) {
        board[i] = board[i].slice(0, -3);
        board[i] += "destroyed";
        if (i-9 % 10 != 10) {
          board[i+1] = "null-sunk";
          if (!attackedPositions.includes(i+1))
            attackedPositions.push(i+1);
        }
        if (i % 10 != 0) {
          board[i-1] = "null-sunk";
          if (!attackedPositions.includes(i-1))
            attackedPositions.push(i-1);
        }
      }
    }
  }

  let attackedPositions = [];

  const recieveAttack = (coordinate) => {
    let { 
      board, shipsOnBoard,
      attackedPositions
    } = obj;
    if (attackedPositions.includes(coordinate)) return;
    const tileAttacked = board[coordinate];
    if (tileAttacked === '') 
      board[coordinate] = 'miss';  
    else if (tileAttacked === 'null') 
      board[coordinate] += '-miss';
    else {
      const shipName = tileAttacked.slice(0, -1);
      shipsOnBoard[shipName].addHit();
      board[coordinate] += '-hit';
      if (shipsOnBoard[shipName].isSunk) 
        setShipAsDestroyed(shipName);
    }
    attackedPositions.push(coordinate);
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
  };
  return obj;
}

module.exports = computerBoardFactory;
