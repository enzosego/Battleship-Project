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

  const shipsOnBoard = pushingShipsOnBoard();
  const addShipToBoard = (coordinate, shipName) => {
    const tileStart = coordinate-1;
    let count = 1;
    for (let i = tileStart; i < tileStart + shipsOnBoard[shipName].length; i++) {
      obj.board[i] = `${shipName}${count}`;
      count++;
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
    const tileAttacked = obj.board[coordinate-1];
    if (tileAttacked === '') 
      obj.board[coordinate-1] = 'miss';  
    else {
      obj.shipsOnBoard[`${tileAttacked.slice(0, -1)}`].addHit();
      obj.board[coordinate-1] += '-hit';
      if (obj.shipsOnBoard[`${tileAttacked.slice(0, -1)}`].isSunk)
        setShipAsDestroyed(tileAttacked.slice(0, -1));
    }
  }

  let isBattleLost = false;
  const checkingForDefeat = () => {
    let sunkShipsCount = 0;
    for (const ship of Object.entries(obj.shipsOnBoard)) 
      if (ship[1].isSunk) sunkShipsCount++;
    if (sunkShipsCount >= 5) 
      obj.isBattleLost = true;
  }

  const obj = { 
    board, 
    recieveAttack,
    shipsOnBoard, 
    addShipToBoard,
    isBattleLost,
    checkingForDefeat
  };
  return obj;
}

module.exports = boardFactory;
