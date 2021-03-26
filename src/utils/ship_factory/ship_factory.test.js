const shipFactory = require('./ship_factory');

test("Ship factory works", () => {
  const newShip = shipFactory('Carrier', "X");
  expect(newShip).toMatchObject({
    shipName: 'Carrier',
    length: 5,
    hits: 0,
    axis: 'X',
    isSunk: false,
  })});

test('Ship factory works for Battleships', () => {
  const newShip = shipFactory('Battleship', 'Y');
  expect(newShip).toMatchObject({
    shipName: 'Battleship',
    length: 4,
    hits: 0,
    axis: 'Y',
    isSunk: false,
  })
})

test('Ship factory works for Submarines', () => {
  const newShip = shipFactory('Submarine', 'Y');
  expect(newShip).toMatchObject({
    shipName: 'Submarine',
    length: 3,
    hits: 0,
    axis: 'Y',
    isSunk: false,
  })
})

test('Ship factory works for Destroyers', () => {
  const newShip = shipFactory('Destroyer', 'X');
  expect(newShip).toMatchObject({
    shipName: 'Destroyer',
    length: 2,
    hits: 0,
    axis: 'X',
    isSunk: false,
  })
})

test('Almost down but still going strong', () => {
  const newShip = shipFactory('Destroyer', 'X');
  newShip.addHit();
  expect(newShip).toMatchObject({
    shipName: 'Destroyer',
    length: 2,
    hits: 1,
    axis: 'X',
    isSunk: false,
  })
})

test("Ship sinks when hit too many times", () => {
  const newShip = shipFactory('Cruiser', 'Y');
  newShip.addHit();
  newShip.addHit();
  newShip.addHit();
  expect(newShip).toMatchObject({
    shipName: 'Cruiser',
    length: 3,
    hits: 3,
    axis: 'Y',
    isSunk: true,
  });
});
