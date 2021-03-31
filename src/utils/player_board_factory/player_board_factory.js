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

const playerBoardFactory = () => {
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

  const checkingForDefeat = () => {
    let sunkShipsCount = 0;
    for (const [key, ship] of Object.entries(obj.shipsOnBoard)) 
      if (ship.isSunk) 
        sunkShipsCount++;
    if (sunkShipsCount >= 5) 
      return true;
    return false;
  }

  const pickRandomCoordinate = (num = 100) => 
    Math.floor(Math.random() * num);

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
      if ((startIndex+shipLength) % 10 != 0) {
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
        if((startIndex-9) % 10 != 0) {
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
        if ((startIndex-9) % 10 != 0) {
          board[startIndex+(shipLength*10)+1] = "null-sunk"
          if (!attackedPositions.includes(startIndex+(shipLength*10)+1))
            attackedPositions.push(startIndex+(shipLength*10)+1);
        }
      }

      for (let i = startIndex; i < startIndex + (shipLength*10); i+=10) {
        board[i] = board[i].slice(0, -3);
        board[i] += "destroyed";
        if ((i-9) % 10 != 0) {
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
  let lastHitIndex;
  let shipToDestroy = "";
  let posiblePositions = [];

  const recieveAttack = (coordinate) => {
    let { 
      board, shipsOnBoard,
      attackedPositions
    } = obj;
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
    attackedPositions.push(coordinate);
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

    if (shipsOnBoard[shipToDestroy].hits > 3) {
      for (let i = 0; i < board.length; i++) 
        if (board[i].includes(`${shipToDestroy}`) && !attackedPositions.includes(i))
          posiblePositions.push(i);
      return;
    }

    if (shipsOnBoard[shipToDestroy].hits > 1) {
      const startIndex = board.indexOf(
        board.find(tile => tile.includes(`${shipToDestroy}1`))
      );
      const shipLength = shipsOnBoard[shipToDestroy].length;
      if (shipsOnBoard[shipToDestroy].axis == "X") {
        for (let i = startIndex; i <= startIndex+shipLength && i < 100; i++) 
          if (!attackedPositions.includes(i) && i % 10 != 0 && board[i] !== "") 
            posiblePositions.push(i);
        for (let i = startIndex+shipLength; i >= startIndex-1 && i > -1; i--) 
          if (!attackedPositions.includes(i) && (i-9) % 10 != 0 && board[i] !== "") 
            posiblePositions.push(i);
      }
      else {
        for (let i = startIndex; i <= startIndex+(shipLength*10) && i < 100; i+=10) 
          if (!attackedPositions.includes(i) && i > -1 && board[i] !== "") 
            posiblePositions.push(i);
        for (let i = startIndex+(shipLength*10); i >= startIndex-10 && i > -1; i-=10) 
          if (!attackedPositions.includes(i) && i < 100 && board[i] !== "") 
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
    checkingForDefeat,
    verticalShip,
    changeShipDirection,
    attackedPositions,
    lastHitIndex,
    posiblePositions,
    shipToDestroy,
    computerRandomAttack,
    computerAttack
  };
  return obj;
}

module.exports = playerBoardFactory;
