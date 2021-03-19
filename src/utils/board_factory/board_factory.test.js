const boardFactory = require('./board_factory');

test("Factory creates the board", () => {
  const newBoard = boardFactory();
  expect(newBoard).toMatchObject({
    board: [
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
  ],
  });
});

test("Add a ship when needed", () => {
  const newBoard = boardFactory();
  newBoard.addShipToBoard(3, 'Carrier');
  expect(newBoard).toMatchObject({
    board: [
      '', '', 'Carrier1', 'Carrier2', 'Carrier3', 'Carrier4', 'Carrier5', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ],
  })
})

test("Ships take hits correctly", () => {
  const newBoard = boardFactory();
  newBoard.addShipToBoard(3, 'Destroyer');
  newBoard.recieveAttack(3);
  expect(newBoard).toMatchObject({
    board: [
      '', '', 'Destroyer1-hit', 'Destroyer2', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ],
    shipsOnBoard: {
      Destroyer: {
        hits: 1
      }
    }
  })
})

test("Board tiles change when a ship is destroyed", () => {
  const newBoard = boardFactory();
  newBoard.addShipToBoard(3, "Cruiser");
  newBoard.recieveAttack(3);
  newBoard.recieveAttack(4);
  newBoard.recieveAttack(5);
  expect(newBoard).toMatchObject({
    board: [
      '', '', 'Cruiser1-destroyed', 'Cruiser2-destroyed', 'Cruiser3-destroyed', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ],
    shipsOnBoard: {
      Cruiser: {
        length: 3,
        hits: 3,
        isSunk: true
      }
    }
  })
});

test("Battle is lost when all ships are taken down, ", () => {
  const newBoard = boardFactory();
  newBoard.shipsOnBoard.Carrier.addHit();
  newBoard.shipsOnBoard.Carrier.addHit();
  newBoard.shipsOnBoard.Carrier.addHit();
  newBoard.shipsOnBoard.Carrier.addHit();
  newBoard.shipsOnBoard.Carrier.addHit();
  newBoard.shipsOnBoard.Battleship.addHit();
  newBoard.shipsOnBoard.Battleship.addHit();
  newBoard.shipsOnBoard.Battleship.addHit();
  newBoard.shipsOnBoard.Battleship.addHit();
  newBoard.shipsOnBoard.Submarine.addHit();
  newBoard.shipsOnBoard.Submarine.addHit();
  newBoard.shipsOnBoard.Submarine.addHit();
  newBoard.shipsOnBoard.Cruiser.addHit();
  newBoard.shipsOnBoard.Cruiser.addHit();
  newBoard.shipsOnBoard.Cruiser.addHit();
  newBoard.shipsOnBoard.Destroyer.addHit();
  newBoard.shipsOnBoard.Destroyer.addHit();
  newBoard.checkingForDefeat();
  expect(newBoard.isBattleLost).toBe(true);
})
