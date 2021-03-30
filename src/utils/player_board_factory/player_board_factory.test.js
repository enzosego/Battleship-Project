const playerBoardFactory = require('./player_board_factory');

test("Factory creates the board", () => {
  const newBoard = playerBoardFactory();
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

test("Add a ship horizontally", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(2, 'Carrier');
  expect(newBoard).toMatchObject({
    board: [
      '', 'null', 'Carrier1', 'Carrier2', 'Carrier3', 'Carrier4', 'Carrier5', 'null', '', '',
      '', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '', '',
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

test("Add a ship horizontally at the top left of the board", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(0, 'Carrier');
  expect(newBoard).toMatchObject({
    board: [
      'Carrier1', 'Carrier2', 'Carrier3', 'Carrier4', 'Carrier5', 'null', '', '', '', '',
      'null', 'null', 'null', 'null', 'null', 'null', '', '', '', '',
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

test("Add a ship horizontally at the top right of the board", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(5, 'Carrier');
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', 'null', 'Carrier1', 'Carrier2', 'Carrier3', 'Carrier4', 'Carrier5',
      '', '', '', '', 'null', 'null', 'null', 'null', 'null', 'null',
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

test("Add a ship horizontally at the bottom right of the board", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(95, 'Carrier');
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
      '', '', '', '', 'null', 'null', 'null', 'null', 'null', 'null',
      '', '', '', '', 'null', 'Carrier1', 'Carrier2', 'Carrier3', 'Carrier4', 'Carrier5',
    ],
  })
})

test("Add a ship horizontally at the bottom left of the board", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(90, 'Carrier');
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
      'null', 'null', 'null', 'null', 'null', 'null', '', '', '', '',
      'Carrier1', 'Carrier2', 'Carrier3', 'Carrier4', 'Carrier5', 'null', '', '', '', '',
    ],
  })
})

test("Can also add ships vertically", () => {
  const newBoard = playerBoardFactory();
  newBoard.changeShipDirection();
  newBoard.addShipToBoard(4, "Cruiser");
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', 'null', 'Cruiser1', 'null', '', '', '', '',
      '', '', '', 'null', 'Cruiser2', 'null', '', '', '', '',
      '', '', '', 'null', 'Cruiser3', 'null', '', '', '', '',
      '', '', '', 'null', 'null', 'null', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]
  })
})

test("Adds ship vertically at the top right of the board", () => {
  const newBoard = playerBoardFactory();
  newBoard.changeShipDirection();
  newBoard.addShipToBoard(9, "Carrier");
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', '', '', '', '', 'null', 'Carrier1',
      '', '', '', '', '', '', '', '', 'null', 'Carrier2',
      '', '', '', '', '', '', '', '', 'null', 'Carrier3',
      '', '', '', '', '', '', '', '', 'null', 'Carrier4',
      '', '', '', '', '', '', '', '', 'null', 'Carrier5',
      '', '', '', '', '', '', '', '', 'null', 'null',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]
  })
})

test("Adds ship vertically at the top left of the board", () => {
  const newBoard = playerBoardFactory();
  newBoard.changeShipDirection();
  newBoard.addShipToBoard(0, "Carrier");
  expect(newBoard).toMatchObject({
    board: [
      'Carrier1', 'null', '', '', '', '', '', '', '', '',
      'Carrier2', 'null', '', '', '', '', '', '', '', '',
      'Carrier3', 'null', '', '', '', '', '', '', '', '',
      'Carrier4', 'null', '', '', '', '', '', '', '', '',
      'Carrier5', 'null', '', '', '', '', '', '', '', '',
      'null', 'null', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]
  })
})

test("Adds ship vertically at the bottom right of the board", () => {
  const newBoard = playerBoardFactory();
  newBoard.changeShipDirection();
  newBoard.addShipToBoard(59, "Carrier");
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', 'null', 'null',
      '', '', '', '', '', '', '', '', 'null', 'Carrier1',
      '', '', '', '', '', '', '', '', 'null', 'Carrier2',
      '', '', '', '', '', '', '', '', 'null', 'Carrier3',
      '', '', '', '', '', '', '', '', 'null', 'Carrier4',
      '', '', '', '', '', '', '', '', 'null', 'Carrier5',
    ]
  })
})

test("Adds ship vertically at the bottom left of the board", () => {
  const newBoard = playerBoardFactory();
  newBoard.changeShipDirection();
  newBoard.addShipToBoard(50, "Carrier");
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      'null', 'null', '', '', '', '', '', '', '', '',
      'Carrier1', 'null', '', '', '', '', '', '', '', '',
      'Carrier2', 'null', '', '', '', '', '', '', '', '',
      'Carrier3', 'null', '', '', '', '', '', '', '', '',
      'Carrier4', 'null', '', '', '', '', '', '', '', '',
      'Carrier5', 'null', '', '', '', '', '', '', '', '',
    ]
  })
})

test("Ships take hits correctly", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(2, 'Destroyer');
  newBoard.recieveAttack(2);
  expect(newBoard).toMatchObject({
    board: [
      '', 'null', 'Destroyer1-hit', 'Destroyer2', 'null', '', '', '', '', '',
      '', 'null', 'null', 'null', 'null', '', '', '', '', '',
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

test("Board tiles change when a ship is destroyed --- 1", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(2, "Cruiser");
  newBoard.recieveAttack(2);
  newBoard.recieveAttack(3);
  newBoard.recieveAttack(4);
  expect(newBoard).toMatchObject({
    board: [
      '', 'null-sunk', 'Cruiser1-destroyed', 'Cruiser2-destroyed', 'Cruiser3-destroyed', 'null-sunk', '', '', '', '',
      '', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', '', '', '', '',
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

test("Board tiles change when a ship is destroyed --- 2", () => {
  const newBoard = playerBoardFactory();
  newBoard.changeShipDirection();
  newBoard.addShipToBoard(9, "Carrier");
  newBoard.recieveAttack(9);
  newBoard.recieveAttack(19);
  newBoard.recieveAttack(29);
  newBoard.recieveAttack(39);
  newBoard.recieveAttack(49);
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', '', '', '', '', 'null-sunk', 'Carrier1-destroyed',
      '', '', '', '', '', '', '', '', 'null-sunk', 'Carrier2-destroyed',
      '', '', '', '', '', '', '', '', 'null-sunk', 'Carrier3-destroyed',
      '', '', '', '', '', '', '', '', 'null-sunk', 'Carrier4-destroyed',
      '', '', '', '', '', '', '', '', 'null-sunk', 'Carrier5-destroyed',
      '', '', '', '', '', '', '', '', 'null-sunk', 'null-sunk',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]
  })
})

test("Board tiles change when a ship is destroyed --- 3", () => {
  const newBoard = playerBoardFactory();
  newBoard.changeShipDirection();
  newBoard.addShipToBoard(0, "Carrier");
  newBoard.recieveAttack(0);
  newBoard.recieveAttack(10);
  newBoard.recieveAttack(20);
  newBoard.recieveAttack(30);
  newBoard.recieveAttack(40);
  expect(newBoard).toMatchObject({
    board: [
      'Carrier1-destroyed', 'null-sunk', '', '', '', '', '', '', '', '',
      'Carrier2-destroyed', 'null-sunk', '', '', '', '', '', '', '', '',
      'Carrier3-destroyed', 'null-sunk', '', '', '', '', '', '', '', '',
      'Carrier4-destroyed', 'null-sunk', '', '', '', '', '', '', '', '',
      'Carrier5-destroyed', 'null-sunk', '', '', '', '', '', '', '', '',
      'null-sunk', 'null-sunk', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]
  })
})

test("Board tiles change when a ship is destroyed --- 4", () => {
  const newBoard = playerBoardFactory();
  newBoard.changeShipDirection();
  newBoard.addShipToBoard(50, "Carrier");
  newBoard.recieveAttack(50);
  newBoard.recieveAttack(60);
  newBoard.recieveAttack(70);
  newBoard.recieveAttack(80);
  newBoard.recieveAttack(90);
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      'null-sunk', 'null-sunk', '', '', '', '', '', '', '', '',
      'Carrier1-destroyed', 'null-sunk', '', '', '', '', '', '', '', '',
      'Carrier2-destroyed', 'null-sunk', '', '', '', '', '', '', '', '',
      'Carrier3-destroyed', 'null-sunk', '', '', '', '', '', '', '', '',
      'Carrier4-destroyed', 'null-sunk', '', '', '', '', '', '', '', '',
      'Carrier5-destroyed', 'null-sunk', '', '', '', '', '', '', '', '',
    ]
  })
})

test("Board tiles change when a ship is destroyed --- 5", () => {
  const newBoard = playerBoardFactory();
  newBoard.changeShipDirection();
  newBoard.addShipToBoard(59, "Carrier");
  newBoard.recieveAttack(59);
  newBoard.recieveAttack(69);
  newBoard.recieveAttack(79);
  newBoard.recieveAttack(89);
  newBoard.recieveAttack(99);
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', 'null-sunk', 'null-sunk',
      '', '', '', '', '', '', '', '', 'null-sunk', 'Carrier1-destroyed',
      '', '', '', '', '', '', '', '', 'null-sunk', 'Carrier2-destroyed',
      '', '', '', '', '', '', '', '', 'null-sunk', 'Carrier3-destroyed',
      '', '', '', '', '', '', '', '', 'null-sunk', 'Carrier4-destroyed',
      '', '', '', '', '', '', '', '', 'null-sunk', 'Carrier5-destroyed',
    ]
  })
})

test("Board tiles change when a ship is destroyed --- 6", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(94, "Carrier");
  newBoard.recieveAttack(94);
  newBoard.recieveAttack(95);
  newBoard.recieveAttack(96);
  newBoard.recieveAttack(97);
  newBoard.recieveAttack(98);
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
      '', '', '', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk',
      '', '', '', 'null-sunk', 'Carrier1-destroyed', 'Carrier2-destroyed', 'Carrier3-destroyed', 'Carrier4-destroyed', 'Carrier5-destroyed', 'null-sunk',
    ]
  })
})

test("Board tiles change when a ship is destroyed --- 7", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(50, "Carrier");
  newBoard.recieveAttack(50);
  newBoard.recieveAttack(51);
  newBoard.recieveAttack(52);
  newBoard.recieveAttack(53);
  newBoard.recieveAttack(54);
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', '', '', '', '',
      'Carrier1-destroyed', 'Carrier2-destroyed', 'Carrier3-destroyed', 'Carrier4-destroyed', 'Carrier5-destroyed', 'null-sunk', '', '', '', '',
      'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]
  })
})

test("Board tiles change when a ship is destroyed --- 8", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(55, "Carrier");
  newBoard.recieveAttack(55);
  newBoard.recieveAttack(56);
  newBoard.recieveAttack(57);
  newBoard.recieveAttack(58);
  newBoard.recieveAttack(59);
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk',
      '', '', '', '', 'null-sunk', 'Carrier1-destroyed', 'Carrier2-destroyed', 'Carrier3-destroyed', 'Carrier4-destroyed', 'Carrier5-destroyed',
      '', '', '', '', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk', 'null-sunk',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]
  })
})

test("Battle is lost when all ships are taken down, ", () => {
  const newBoard = playerBoardFactory();
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
  const isBattleLost = newBoard.checkingForDefeat();
  expect(isBattleLost).toBe(true);
})

// testing Computer attacks

test("Computer launches random attack", () => {
  const newBoard = playerBoardFactory();
  newBoard.addShipToBoard(2, "Cruiser");
  newBoard.computerAttack();
  newBoard.computerAttack();
  newBoard.computerAttack();
  newBoard.computerAttack();
  expect(newBoard.positionsAttacked).not.toEqual([]);
})

test("Computer focuses on a single ship after hitting it --- Carrier", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(55, "Carrier");
  addShipToBoard(11, "Battleship")
  changeShipDirection();
  addShipToBoard(18, "Cruiser");
  addShipToBoard(77, "Submarine")
  addShipToBoard(72, "Destroyer")
  recieveAttack(55);
  for (let i = 0; i < 10; i++) 
    computerAttack();
  const isCarrierSunk = shipsOnBoard["Carrier"].isSunk;
  expect(isCarrierSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Battleship", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(55, "Carrier");
  addShipToBoard(11, "Battleship")
  changeShipDirection();
  addShipToBoard(18, "Cruiser");
  addShipToBoard(77, "Submarine")
  addShipToBoard(72, "Destroyer")
  recieveAttack(13);
  for (let i = 0; i < 10; i++) 
    computerAttack();
  const isBattleshipSunk = shipsOnBoard["Battleship"].isSunk;
  expect(isBattleshipSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Cruiser", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(11, "Battleship")
  addShipToBoard(55, "Carrier");
  changeShipDirection();
  addShipToBoard(18, "Cruiser");
  addShipToBoard(77, "Submarine")
  addShipToBoard(72, "Destroyer")
  recieveAttack(38);
  for (let i = 0; i < 10; i++) 
    computerAttack();
  const isCruiserSunk = shipsOnBoard["Cruiser"].isSunk;
  expect(isCruiserSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Submarine", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(55, "Carrier");
  addShipToBoard(11, "Battleship")
  changeShipDirection();
  addShipToBoard(18, "Cruiser");
  addShipToBoard(77, "Submarine")
  addShipToBoard(72, "Destroyer")
  recieveAttack(77);
  for (let i = 0; i < 10; i++) 
    computerAttack();
  const isSubmarineSunk = shipsOnBoard["Submarine"].isSunk;
  expect(isSubmarineSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Destroyer", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(55, "Carrier");
  addShipToBoard(11, "Battleship")
  changeShipDirection();
  addShipToBoard(18, "Cruiser");
  addShipToBoard(77, "Submarine")
  addShipToBoard(72, "Destroyer")
  recieveAttack(82);
  for (let i = 0; i < 10; i++) 
    computerAttack();
  const isDestroyerSunk = shipsOnBoard["Destroyer"].isSunk;
  expect(isDestroyerSunk).toBe(true);
})
