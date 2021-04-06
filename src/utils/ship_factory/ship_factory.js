const shipFactory = (shipName, axis, index) => {
  const LENGTH_MAPPING = {
    'Carrier': 5,
    'Battleship': 4,
    'Cruiser': 3,
    'Submarine': 3,
    'Destroyer': 2
  }
  const length = LENGTH_MAPPING[shipName]
  let hits = 0;
  let isSunk = false;
  const setSunk = () => {
    if (obj.hits >= length) obj.isSunk = true;
  };
  const addHit = () => {
    obj.hits++;
    setSunk();
  };
  const obj = { shipName, length, index, hits, axis, isSunk, addHit };
  return obj;
};

module.exports = shipFactory;
