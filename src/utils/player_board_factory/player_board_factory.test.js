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

test("Ship is removed correctly --- Carrier", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  addShipToBoard(41, "Carrier");
  addShipToBoard(5, "Battleship");
  changeShipDirection();
  addShipToBoard(47, "Cruiser");
  addShipToBoard(59, "Submarine");
  addShipToBoard(70, "Destroyer");
  removeShipFromBoard("Carrier");
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', 'null', 'Battleship1', 'Battleship2', 'Battleship3', 'Battleship4', 'null',
      '', '', '', '', 'null', 'null', 'null', 'null', 'null', 'null',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', 'null', 'null', 'null', '',
      '', '', '', '', '', '', 'null', 'Cruiser1', 'null', 'null',
      '', '', '', '', '', '', 'null', 'Cruiser2', 'null', 'Submarine1',
      'null', 'null', '', '', '', '', 'null', 'Cruiser3', 'null', 'Submarine2',
      'Destroyer1', 'null', '', '', '', '', 'null', 'null', 'null', 'Submarine3',
      'Destroyer2', 'null', '', '', '', '', '', '', 'null', 'null',
      'null', 'null', '', '', '', '', '', '', '', '',
    ]
  })
})

test("Ship is removed correctly --- Battleship", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  changeShipDirection();
  addShipToBoard(11, "Carrier");
  addShipToBoard(44, "Battleship");
  changeShipDirection();
  addShipToBoard(14, "Cruiser");
  addShipToBoard(57, "Submarine");
  changeShipDirection();
  addShipToBoard(82, "Destroyer");
  removeShipFromBoard("Battleship");
  expect(newBoard).toMatchObject({
    board: [
      'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '', '',
      'null', 'Carrier1', 'null', 'null', 'Cruiser1', 'Cruiser2', 'Cruiser3', 'null', '', '',
      'null', 'Carrier2', 'null', 'null', 'null', 'null', 'null', 'null', '', '',
      'null', 'Carrier3', 'null', '', '', '', '', '', '', '',
      'null', 'Carrier4', 'null', '', '', '', 'null', 'null', 'null', 'null',
      'null', 'Carrier5', 'null', '', '', '', 'null', 'Submarine1', 'Submarine2', 'Submarine3',
      'null', 'null', 'null', '', '', '', 'null', 'null', 'null', 'null',
      '', 'null', 'null', 'null', '', '', '', '', '', '',
      '', 'null', 'Destroyer1', 'null', '', '', '', '', '', '',
      '', 'null', 'Destroyer2', 'null', '', '', '', '', '', '',
    ]
  })
})

test("Ship is removed correctly --- Cruiser", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  changeShipDirection();
  addShipToBoard(59, "Carrier");
  addShipToBoard(24, "Battleship");
  changeShipDirection();
  addShipToBoard(6, "Cruiser");
  addShipToBoard(83, "Submarine");
  addShipToBoard(1 ,"Destroyer");
  removeShipFromBoard("Cruiser");
  expect(newBoard).toMatchObject({
    board: [
      'null', 'Destroyer1', 'Destroyer2', 'null', '', '', '', '', '', '',
      'null', 'null', 'null', 'null', 'null', 'null', '', '', '', '',
      '', '', '', 'null', 'Battleship1', 'null', '', '', '', '',
      '', '', '', 'null', 'Battleship2', 'null', '', '', '', '',
      '', '', '', 'null', 'Battleship3', 'null', '', '', 'null', 'null',
      '', '', '', 'null', 'Battleship4', 'null', '', '', 'null', 'Carrier1',
      '', '', '', 'null', 'null', 'null', '', '', 'null', 'Carrier2',
      '', '', 'null', 'null', 'null', 'null', 'null', '', 'null', 'Carrier3',
      '', '', 'null', 'Submarine1', 'Submarine2', 'Submarine3', 'null', '', 'null', 'Carrier4',
      '', '', 'null', 'null', 'null', 'null', 'null', '', 'null', 'Carrier5',
    ]
  })
})

test("Ship is removed correctly --- Submarine", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  changeShipDirection();
  addShipToBoard(17, "Carrier");
  addShipToBoard(22, "Battleship");
  changeShipDirection();
  addShipToBoard(72, "Cruiser");
  addShipToBoard(2, "Submarine");
  addShipToBoard(97, "Destroyer");
  removeShipFromBoard("Submarine");
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', '', '', 'null', 'null', 'null', '',
      '', 'null', 'null', 'null', '', '', 'null', 'Carrier1', 'null', '',
      '', 'null', 'Battleship1', 'null', '', '', 'null', 'Carrier2', 'null', '',
      '', 'null', 'Battleship2', 'null', '', '', 'null', 'Carrier3', 'null', '',
      '', 'null', 'Battleship3', 'null', '', '', 'null', 'Carrier4', 'null', '',
      '', 'null', 'Battleship4', 'null', '', '', 'null', 'Carrier5', 'null', '',
      '', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '',
      '', 'null', 'Cruiser1', 'Cruiser2', 'Cruiser3', 'null', '', '', '', '',
      '', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null',
      '', '', '', '', '', '', 'null', 'Destroyer1', 'Destroyer2', 'null',
    ]
  })
})

test("Ship is removed correctly --- Destroyer", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  addShipToBoard(93, "Carrier");
  changeShipDirection();
  addShipToBoard(7, "Battleship");
  addShipToBoard(12, "Cruiser");
  addShipToBoard(70, "Submarine");
  changeShipDirection();
  addShipToBoard(78, "Destroyer");
  removeShipFromBoard("Destroyer");
  expect(newBoard).toMatchObject({
    board: [
      '', 'null', 'null', 'null', '', '', 'null', 'Battleship1', 'null', '',
      '', 'null', 'Cruiser1', 'null', '', '', 'null', 'Battleship2', 'null', '',
      '', 'null', 'Cruiser2', 'null', '', '', 'null', 'Battleship3', 'null', '',
      '', 'null', 'Cruiser3', 'null', '', '', 'null', 'Battleship4', 'null', '',
      '', 'null', 'null', 'null', '', '', 'null', 'null', 'null', '',
      '', '', '', '', '', '', '', '', '', '',
      'null', 'null', '', '', '', '', '', '', '', '',
      'Submarine1', 'null', '', '', '', '', '', '', '', '',
      'Submarine2', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '',
      'Submarine3', 'null', 'null', 'Carrier1', 'Carrier2', 'Carrier3', 'Carrier4', 'Carrier5', 'null', '',
    ]
  })
})

test("It's possible to add a ship after it got removed --- Carrier", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  addShipToBoard(41, "Carrier");
  addShipToBoard(5, "Battleship");
  changeShipDirection();
  addShipToBoard(47, "Cruiser");
  addShipToBoard(59, "Submarine");
  addShipToBoard(70, "Destroyer");
  removeShipFromBoard("Carrier");
  changeShipDirection();
  addShipToBoard(41, "Carrier")
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', 'null', 'Battleship1', 'Battleship2', 'Battleship3', 'Battleship4', 'null',
      '', '', '', '', 'null', 'null', 'null', 'null', 'null', 'null',
      '', '', '', '', '', '', '', '', '', '',
      'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '',
      'null', 'Carrier1', 'Carrier2', 'Carrier3', 'Carrier4', 'Carrier5', 'null', 'Cruiser1', 'null', 'null',
      'null', 'null', 'null', 'null', 'null', 'null', 'null', 'Cruiser2', 'null', 'Submarine1',
      'null', 'null', '', '', '', '', 'null', 'Cruiser3', 'null', 'Submarine2',
      'Destroyer1', 'null', '', '', '', '', 'null', 'null', 'null', 'Submarine3',
      'Destroyer2', 'null', '', '', '', '', '', '', 'null', 'null',
      'null', 'null', '', '', '', '', '', '', '', '',
    ]
  })
})

test("It's possible to add a ship after it got removed --- Battleship", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  changeShipDirection();
  addShipToBoard(11, "Carrier");
  addShipToBoard(44, "Battleship");
  changeShipDirection();
  addShipToBoard(14, "Cruiser");
  addShipToBoard(57, "Submarine");
  changeShipDirection();
  addShipToBoard(82, "Destroyer");
  removeShipFromBoard("Battleship");
  addShipToBoard(44, "Battleship")
  expect(newBoard).toMatchObject({
    board: [
      'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '', '',
      'null', 'Carrier1', 'null', 'null', 'Cruiser1', 'Cruiser2', 'Cruiser3', 'null', '', '',
      'null', 'Carrier2', 'null', 'null', 'null', 'null', 'null', 'null', '', '',
      'null', 'Carrier3', 'null', 'null', 'null', 'null', '', '', '', '',
      'null', 'Carrier4', 'null', 'null', 'Battleship1', 'null', 'null', 'null', 'null', 'null',
      'null', 'Carrier5', 'null', 'null', 'Battleship2', 'null', 'null', 'Submarine1', 'Submarine2', 'Submarine3',
      'null', 'null', 'null', 'null', 'Battleship3', 'null', 'null', 'null', 'null', 'null',
      '', 'null', 'null', 'null', 'Battleship4', 'null', '', '', '', '',
      '', 'null', 'Destroyer1', 'null', 'null', 'null', '', '', '', '',
      '', 'null', 'Destroyer2', 'null', '', '', '', '', '', '',
    ]
  })
})

test("It's possible to add a ship after it got removed --- Cruiser", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  changeShipDirection();
  addShipToBoard(59, "Carrier");
  addShipToBoard(24, "Battleship");
  changeShipDirection();
  addShipToBoard(6, "Cruiser");
  addShipToBoard(83, "Submarine");
  addShipToBoard(1 ,"Destroyer");
  removeShipFromBoard("Cruiser");
  addShipToBoard(6, "Cruiser")
  expect(newBoard).toMatchObject({
    board: [
      'null', 'Destroyer1', 'Destroyer2', 'null', '', 'null', 'Cruiser1', 'Cruiser2', 'Cruiser3', 'null',
      'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null',
      '', '', '', 'null', 'Battleship1', 'null', '', '', '', '',
      '', '', '', 'null', 'Battleship2', 'null', '', '', '', '',
      '', '', '', 'null', 'Battleship3', 'null', '', '', 'null', 'null',
      '', '', '', 'null', 'Battleship4', 'null', '', '', 'null', 'Carrier1',
      '', '', '', 'null', 'null', 'null', '', '', 'null', 'Carrier2',
      '', '', 'null', 'null', 'null', 'null', 'null', '', 'null', 'Carrier3',
      '', '', 'null', 'Submarine1', 'Submarine2', 'Submarine3', 'null', '', 'null', 'Carrier4',
      '', '', 'null', 'null', 'null', 'null', 'null', '', 'null', 'Carrier5',
    ]
  })
})

test("It's possible to add a ship after it got removed --- Submarine", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  changeShipDirection();
  addShipToBoard(17, "Carrier");
  addShipToBoard(22, "Battleship");
  changeShipDirection();
  addShipToBoard(72, "Cruiser");
  addShipToBoard(2, "Submarine");
  addShipToBoard(97, "Destroyer");
  removeShipFromBoard("Submarine");
  addShipToBoard(2, "Submarine");
  expect(newBoard).toMatchObject({
    board: [
      '', 'null', 'Submarine1', 'Submarine2', 'Submarine3', 'null', 'null', 'null', 'null', '',
      '', 'null', 'null', 'null', 'null', 'null', 'null', 'Carrier1', 'null', '',
      '', 'null', 'Battleship1', 'null', '', '', 'null', 'Carrier2', 'null', '',
      '', 'null', 'Battleship2', 'null', '', '', 'null', 'Carrier3', 'null', '',
      '', 'null', 'Battleship3', 'null', '', '', 'null', 'Carrier4', 'null', '',
      '', 'null', 'Battleship4', 'null', '', '', 'null', 'Carrier5', 'null', '',
      '', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '',
      '', 'null', 'Cruiser1', 'Cruiser2', 'Cruiser3', 'null', '', '', '', '',
      '', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null',
      '', '', '', '', '', '', 'null', 'Destroyer1', 'Destroyer2', 'null',
    ]
  })
})

test("It's possible to add a ship after it got removed --- Destroyer", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  addShipToBoard(93, "Carrier");
  changeShipDirection();
  addShipToBoard(7, "Battleship");
  addShipToBoard(12, "Cruiser");
  addShipToBoard(70, "Submarine");
  changeShipDirection();
  addShipToBoard(78, "Destroyer");
  removeShipFromBoard("Destroyer");
  addShipToBoard(78, "Destroyer");
  expect(newBoard).toMatchObject({
    board: [
      '', 'null', 'null', 'null', '', '', 'null', 'Battleship1', 'null', '',
      '', 'null', 'Cruiser1', 'null', '', '', 'null', 'Battleship2', 'null', '',
      '', 'null', 'Cruiser2', 'null', '', '', 'null', 'Battleship3', 'null', '',
      '', 'null', 'Cruiser3', 'null', '', '', 'null', 'Battleship4', 'null', '',
      '', 'null', 'null', 'null', '', '', 'null', 'null', 'null', '',
      '', '', '', '', '', '', '', '', '', '',
      'null', 'null', '', '', '', '', '', 'null', 'null', 'null',
      'Submarine1', 'null', '', '', '', '', '', 'null', 'Destroyer1', 'Destroyer2',
      'Submarine2', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null',
      'Submarine3', 'null', 'null', 'Carrier1', 'Carrier2', 'Carrier3', 'Carrier4', 'Carrier5', 'null', '',
    ]
  })
})

test("All ships get removed correctly", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  addShipToBoard(14, "Carrier");
  addShipToBoard(65, "Battleship");
  addShipToBoard(96, "Cruiser");
  changeShipDirection();
  addShipToBoard(0, "Submarine");
  addShipToBoard(51, "Destroyer");
  removeShipFromBoard("Carrier");
  removeShipFromBoard("Battleship");
  removeShipFromBoard("Cruiser");
  removeShipFromBoard("Submarine");
  removeShipFromBoard("Destroyer");
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
    ]
  })
})

test("It's possible to remove all ships then add them back again", () => {
  const newBoard = playerBoardFactory();
  const {
    removeShipFromBoard,
    addShipToBoard, changeShipDirection
  } = newBoard;
  addShipToBoard(41, "Carrier");
  addShipToBoard(5, "Battleship");
  changeShipDirection();
  addShipToBoard(47, "Cruiser");
  addShipToBoard(59, "Submarine");
  addShipToBoard(70, "Destroyer");
  removeShipFromBoard("Carrier");
  removeShipFromBoard("Battleship");
  removeShipFromBoard("Cruiser");
  removeShipFromBoard("Submarine");
  removeShipFromBoard("Destroyer");
  changeShipDirection();
  addShipToBoard(41, "Carrier")
  addShipToBoard(5, "Battleship");
  changeShipDirection();
  addShipToBoard(47, "Cruiser");
  addShipToBoard(59, "Submarine");
  addShipToBoard(70, "Destroyer");
  console.log(newBoard.board);
  expect(newBoard).toMatchObject({
    board: [
      '', '', '', '', 'null', 'Battleship1', 'Battleship2', 'Battleship3', 'Battleship4', 'null',
      '', '', '', '', 'null', 'null', 'null', 'null', 'null', 'null',
      '', '', '', '', '', '', '', '', '', '',
      'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '',
      'null', 'Carrier1', 'Carrier2', 'Carrier3', 'Carrier4', 'Carrier5', 'null', 'Cruiser1', 'null', 'null',
      'null', 'null', 'null', 'null', 'null', 'null', 'null', 'Cruiser2', 'null', 'Submarine1',
      'null', 'null', '', '', '', '', 'null', 'Cruiser3', 'null', 'Submarine2',
      'Destroyer1', 'null', '', '', '', '', 'null', 'null', 'null', 'Submarine3',
      'Destroyer2', 'null', '', '', '', '', '', '', 'null', 'null',
      'null', 'null', '', '', '', '', '', '', '', '',
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
  const {
    shipsOnBoard, checkingForDefeat,
    addShipToBoard, changeShipDirection
  } = newBoard;
  addShipToBoard(5, "Carrier");
  changeShipDirection();
  addShipToBoard(12, "Battleship");
  addShipToBoard(37, "Cruiser");
  addShipToBoard(71, "Submarine");
  changeShipDirection();
  addShipToBoard(96, "Destroyer");
  shipsOnBoard.Carrier.addHit();
  shipsOnBoard.Carrier.addHit();
  shipsOnBoard.Carrier.addHit();
  shipsOnBoard.Carrier.addHit();
  shipsOnBoard.Carrier.addHit();
  shipsOnBoard.Battleship.addHit();
  shipsOnBoard.Battleship.addHit();
  shipsOnBoard.Battleship.addHit();
  shipsOnBoard.Battleship.addHit();
  shipsOnBoard.Submarine.addHit();
  shipsOnBoard.Submarine.addHit();
  shipsOnBoard.Submarine.addHit();
  shipsOnBoard.Cruiser.addHit();
  shipsOnBoard.Cruiser.addHit();
  shipsOnBoard.Cruiser.addHit();
  shipsOnBoard.Destroyer.addHit();
  shipsOnBoard.Destroyer.addHit();
  checkingForDefeat();
  const isBattleLost = checkingForDefeat();
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
  for (let i = 0; i < 9; i++) 
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
  for (let i = 0; i < 8; i++) 
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
  for (let i = 0; i < 7; i++) 
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
  for (let i = 0; i < 6; i++) 
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
  for (let i = 0; i < 4; i++) 
    computerAttack();
  const isDestroyerSunk = shipsOnBoard["Destroyer"].isSunk;
  expect(isDestroyerSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Carrier -- 2", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  changeShipDirection();
  addShipToBoard(52, "Carrier");
  addShipToBoard(7, "Battleship");
  addShipToBoard(50, "Cruiser");
  changeShipDirection();
  addShipToBoard(12, "Submarine");
  addShipToBoard(76, "Destroyer");
  recieveAttack(72);
  for (let i = 0; i < 9; i++)
    computerAttack();
  const isCarrierSunk = shipsOnBoard["Carrier"].isSunk;
  expect(isCarrierSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Battleship -- 2", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(14, "Carrier");
  changeShipDirection();
  addShipToBoard(32, "Battleship");
  addShipToBoard(47, "Cruiser");
  addShipToBoard(54, "Submarine");
  changeShipDirection();
  addShipToBoard(86, "Destroyer");
  recieveAttack(42);
  for (let i = 0; i < 8; i++)
    computerAttack();
  const isBattleshipSunk = shipsOnBoard["Battleship"].isSunk;
  expect(isBattleshipSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Cruiser -- 2", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(22, "Carrier");
  changeShipDirection();
  addShipToBoard(38, "Battleship");
  changeShipDirection();
  addShipToBoard(74, "Cruiser");
  addShipToBoard(43, "Submarine");
  addShipToBoard(96, "Destroyer");
  recieveAttack(75);
  for (let i = 0; i < 7; i++)
    computerAttack();
  const isCruiserSunk = shipsOnBoard["Cruiser"].isSunk;
  expect(isCruiserSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Submarine -- 2", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  changeShipDirection();
  addShipToBoard(44, "Carrier");
  addShipToBoard(37, "Battleship");
  addShipToBoard(79, "Cruiser");
  changeShipDirection();
  addShipToBoard(5, "Submarine");
  addShipToBoard(12, "Destroyer");
  recieveAttack(5);
  for (let i = 0; i < 6; i++)
    computerAttack();
  const isSubmarineSunk = shipsOnBoard["Submarine"].isSunk;
  expect(isSubmarineSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Destroyer -- 2", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(21, "Carrier");
  changeShipDirection();
  addShipToBoard(27, "Battleship");
  addShipToBoard(42, "Cruiser");
  addShipToBoard(55, "Submarine");
  changeShipDirection();
  addShipToBoard(87, "Destroyer");
  recieveAttack(88);
  for (let i = 0; i < 4; i++)
    computerAttack();
  const isDestroyerSunk = shipsOnBoard["Destroyer"].isSunk;
  expect(isDestroyerSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Carrier -- 3", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(40, "Carrier");
  changeShipDirection();
  addShipToBoard(9, "Battleship");
  addShipToBoard(7, "Cruiser");
  addShipToBoard(56, "Submarine");
  changeShipDirection();
  addShipToBoard(98, "Destroyer");
  recieveAttack(42);
  for (let i = 0; i < 7; i++)
    computerAttack();
  const isCarrierSunk = shipsOnBoard["Carrier"].isSunk;
  expect(isCarrierSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Battleship -- 3", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(35, "Carrier");
  changeShipDirection();
  addShipToBoard(0, "Battleship");
  addShipToBoard(52, "Cruiser");
  addShipToBoard(65, "Submarine");
  changeShipDirection();
  addShipToBoard(98, "Destroyer");
  recieveAttack(30);
  for (let i = 0; i < 8; i++)
    computerAttack();
  const isBattleshipSunk = shipsOnBoard["Battleship"].isSunk;
  expect(isBattleshipSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Cruiser -- 3", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(21, "Carrier");
  changeShipDirection();
  addShipToBoard(27, "Battleship");
  changeShipDirection();
  addShipToBoard(90, "Cruiser");
  changeShipDirection();
  addShipToBoard(55, "Submarine");
  changeShipDirection();
  addShipToBoard(87, "Destroyer");
  recieveAttack(90);
  for (let i = 0; i < 4; i++)
    computerAttack();
  const isCruiserSunk = shipsOnBoard["Cruiser"].isSunk;
  expect(isCruiserSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Submarine -- 3", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(21, "Carrier");
  changeShipDirection();
  addShipToBoard(27, "Battleship");
  addShipToBoard(42, "Cruiser");
  addShipToBoard(9, "Submarine");
  changeShipDirection();
  addShipToBoard(87, "Destroyer");
  recieveAttack(19);
  for (let i = 0; i < 6; i++)
    computerAttack();
  const isSubmarineSunk = shipsOnBoard["Submarine"].isSunk;
  expect(isSubmarineSunk).toBe(true);
})

test("Computer focuses on a single ship after hitting it --- Destroyer -- 3", () => {
  const newBoard = playerBoardFactory();
  const {
    addShipToBoard, recieveAttack,
    computerAttack, changeShipDirection,
    shipsOnBoard
  } = newBoard;
  addShipToBoard(21, "Carrier");
  changeShipDirection();
  addShipToBoard(27, "Battleship");
  addShipToBoard(42, "Cruiser");
  addShipToBoard(55, "Submarine");
  changeShipDirection();
  addShipToBoard(98, "Destroyer");
  recieveAttack(99);
  for (let i = 0; i < 2; i++)
    computerAttack();
  const isDestroyerSunk = shipsOnBoard["Destroyer"].isSunk;
  expect(isDestroyerSunk).toBe(true);
})
