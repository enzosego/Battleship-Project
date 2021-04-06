import { shipFactory } from "../ship_factory/ship_factory";

export const playerBoardFactory = () => {
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
  
  const lengthMapping = {
    "Carrier": 5,
    "Battleship": 4,
    "Cruiser": 3,
    "Submarine": 3,
    "Destroyer": 2,
  }
  
  let verticalShip = false;
  const changeShipDirection = () => 
    obj.verticalShip = !obj.verticalShip;

  const shipsOnBoard = {};

  const appendShip = (shipName) => {
    const { 
      board, shipsOnBoard 
    } = obj;
    const shipAxis = 
      shipsOnBoard[shipName].axis;
    const tileStart = 
      shipsOnBoard[shipName].index;
    const shipLength = 
      lengthMapping[shipName];

    let count = 1;
    if (shipAxis === "X") {
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

  const updateBoard = () => {
    const { 
      shipsOnBoard, board 
    } = obj;
    for (let i = 0; i < board.length; i++)
      board[i] = '';
    for (let shipName of Object.keys(shipsOnBoard)) 
      appendShip(shipName);
  }

  const addShipToBoard = (coordinate, shipName) => {
    const {
      verticalShip, shipsOnBoard
    } = obj;
    const shipAxis = 
      verticalShip === false
      ? "X"
      : "Y";
    shipsOnBoard[shipName] = 
      shipFactory(shipName, shipAxis, coordinate);
    updateBoard();
  }

  const removeShipFromBoard = (shipName) => {
    delete obj.shipsOnBoard[shipName];
    updateBoard();
  }

  const checkAvailableSpaces = (shipName) => {
    const {
      board, verticalShip
    } = obj;
    const shipLength = lengthMapping[shipName];
    let availableSpaces = [];
    if (verticalShip) 
      for (let i = 0; i < board.length; i++) {
        if (i + (shipLength*10) > 109)
          continue
        if (board[i] === "") {
          let count = 1;
          for (let j = i+10; j < ((shipLength) * 10)+i; j+=10) {
            if (board[j] === "") 
              count++;
            else break;
          }
          if (count === shipLength)
            availableSpaces.push(i);
        }
      }
    else {
      for (let i = 0; i < 100; i++) {
        const strNum = `${i}`;
        if (board[i] === "" && (strNum[1] < 11-shipLength || strNum < 11-shipLength)) {
          let count = 1;
          for (let j = i+1; j < (shipLength)+i; j++) {
            if (board[j] === "") {
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

  const checkingForDefeat = (returnCount) => {
    let sunkShipsCount = 0;
    for (const [key, ship] of Object.entries(obj.shipsOnBoard)) 
      if (ship.isSunk) 
        sunkShipsCount++;
    if (sunkShipsCount >= 5) 
      return true;
    if (returnCount)
      return sunkShipsCount;
    return false;
  }

  const setShipAsDestroyed = (shipName) => {
    let {
      board, shipsOnBoard,
      attackedPositions
    } = obj;
    const shipLength = lengthMapping[shipName];
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

  const checkImposiblePositions = () => {
    const { attackedPositions } = obj;
    const imposiblePositions = [];
    for (let i = 0; i < 100; i++) {
      if (attackedPositions.includes(i)) 
        continue;
      let count = 0;
      if (i % 10 === 0 || attackedPositions.includes(i-1))
        count++;
      if ((i-9) % 10 === 0 || attackedPositions.includes(i+1))
        count++;
      if (i-10 < 0 || attackedPositions.includes(i-10))
        count++;
      if (i+10 > 100 || attackedPositions.includes(i+10))
        count++;
      if (count >= 4)
        imposiblePositions.push(i);
    }
    return imposiblePositions;
  }

  const computerRandomAttack = () => {
    let { 
      recieveAttack, attackedPositions,
    } = obj;
    const imposiblePositions = checkImposiblePositions();
    console.log(imposiblePositions);
    let newCoordinate = 
      pickRandomCoordinate();
    while (attackedPositions.includes(newCoordinate) || imposiblePositions.includes(newCoordinate)) 
      newCoordinate  = pickRandomCoordinate();
    recieveAttack(newCoordinate);
  }

  const checkPositionsBeforeAttack = () => {
    let { board, lastHitIndex,
      shipToDestroy, shipsOnBoard,
      attackedPositions, posiblePositions
    } = obj;

    if (shipsOnBoard[shipToDestroy].hits > 1) {
      let firstHit;
      let lastHit;
      for (let i = 0; firstHit === undefined; i++)
        if ( board[i].includes(shipToDestroy) && board[i].includes('hit'))
          firstHit = i;
      for (let i = 99; lastHit === undefined; i--)
        if (board[i].includes(shipToDestroy) && board[i].includes('hit'))
          lastHit = i;
      if (shipsOnBoard[shipToDestroy].axis == "X") {
        if (!attackedPositions.includes(firstHit-1) && firstHit % 10 !== 0)
          posiblePositions.push(firstHit-1);
        if (!attackedPositions.includes(lastHit+1) && (lastHit-9) % 10 !== 0)
          posiblePositions.push(lastHit+1);
      }
      else {
        if (!attackedPositions.includes(firstHit-10) && firstHit-10 > -1)
          posiblePositions.push(firstHit-10);
        if (!attackedPositions.includes(lastHit+10) && lastHit+10 < 100)
          posiblePositions.push(lastHit+10);
      }
      return;
    }

    if (lastHitIndex+10 < 100)
      if (!attackedPositions.includes(lastHitIndex+10)) 
        posiblePositions.push(lastHitIndex+10);
    if (lastHitIndex-10 >= 0)
      if (!attackedPositions.includes(lastHitIndex-10)) 
        posiblePositions.push(lastHitIndex-10);
    if ((lastHitIndex-9) % 10 !== 0)
      if (!attackedPositions.includes(lastHitIndex+1)) 
        posiblePositions.push(lastHitIndex+1);
    if (lastHitIndex % 10 !== 0)
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
    randomlyAddShips,
    removeShipFromBoard,
    checkAvailableSpaces,
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
