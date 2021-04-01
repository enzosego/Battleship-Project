const shipFactory = require('./ship_factory');

test("Ship factory works", () => {
  const newShip = shipFactory('Carrier', "X", 5);
  expect(newShip).toMatchObject({
    shipName: 'Carrier',
    length: 5,
    index: 5,
    hits: 0,
    axis: 'X',
    isSunk: false,
  })});

test('Ship factory works for Battleships', () => {
  const newShip = shipFactory('Battleship', 'Y', 12);
  expect(newShip).toMatchObject({
    shipName: 'Battleship',
    length: 4,
    index: 12,
    hits: 0,
    axis: 'Y',
    isSunk: false,
  })
})

test('Ship factory works for Submarines', () => {
  const newShip = shipFactory('Submarine', 'Y', 66);
  expect(newShip).toMatchObject({
    shipName: 'Submarine',
    length: 3,
    index: 66,
    hits: 0,
    axis: 'Y',
    isSunk: false,
  })
})

test('Ship factory works for Cruisers', () => {
  const newShip = shipFactory('Cruiser', 'X', 97);
  expect(newShip).toMatchObject({
    shipName: 'Cruiser',
    length: 3,
    index: 97,
    hits: 0,
    axis: 'X',
    isSunk: false,
  })
})

test('Ship factory works for Destroyers', () => {
  const newShip = shipFactory('Destroyer', 'X', 83);
  expect(newShip).toMatchObject({
    shipName: 'Destroyer',
    length: 2,
    index: 83,
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
