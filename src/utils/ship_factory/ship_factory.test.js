const shipFactory = require('./ship_factory');

test("Ship factory works", () => {
  const newShip = shipFactory('Carrier');
  expect(newShip).toMatchObject({
    shipName: 'Carrier',
    length: 5,
    hits: 0,
    isSunk: false,
  })});

test('Ship factory works for Battleships', () => {
  const newShip = shipFactory('Battleship');
  expect(newShip).toMatchObject({
    shipName: 'Battleship',
    length: 4,
    hits: 0,
    isSunk: false,
  })
})

test('Ship factory works for Submarines', () => {
  const newShip = shipFactory('Submarine');
  expect(newShip).toMatchObject({
    shipName: 'Submarine',
    length: 3,
    hits: 0,
    isSunk: false,
  })
})

test('Ship factory works for Destroyers', () => {
  const newShip = shipFactory('Destroyer');
  expect(newShip).toMatchObject({
    shipName: 'Destroyer',
    length: 2,
    hits: 0,
    isSunk: false,
  })
})

test('Almost down but still going strong', () => {
  const newShip = shipFactory('Destroyer');
  newShip.addHit();
  expect(newShip).toMatchObject({
    shipName: 'Destroyer',
    length: 2,
    hits: 1,
    isSunk: false,
  })
})

test("Ship sinks when hit too many times", () => {
  const newShip = shipFactory('Cruiser');
  newShip.addHit();
  newShip.addHit();
  newShip.addHit();
  expect(newShip).toMatchObject({
    shipName: 'Cruiser',
    length: 3,
    hits: 3,
    isSunk: true,
  });
});
