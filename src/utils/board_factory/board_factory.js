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
  const addHitToBoard = (coordinate) => 
    obj.board[coordinate-1] = "hit";
  const addMissToBoard = (coordinate) =>
    obj.board[coordinate-1] = "miss";
  const addShipToBoard = (coordinate, length, shipName) => {
    const tileStart = coordinate-1;
    for (let i = tileStart; i < tileStart + length; i++) {
      obj.board[i] = board.includes(shipName) 
        ? `${shipName}2` : `${shipName}`;
    }
  }
  const obj = { board, addHitToBoard, addMissToBoard, addShipToBoard };
  return obj;
}

module.exports = boardFactory;
