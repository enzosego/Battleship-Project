import React, { useState, useEffect } from "react";
const boardFactory = require('./utils/board_factory/board_factory');
const shipFactory = require('./utils/ship_factory/ship_factory');

export const App = () => {
  const [ board, setBoard ] = useState(() => boardFactory());
  const [ Carrier, setCarrier ] = useState(() => shipFactory('Carrier'));
  const [ Battleship, setBattleship ] = useState(() => shipFactory('Battleship'));
  const [ Cruiser, setCruiser ] = useState(() => shipFactory('Cruiser'));
  const [ Submarine, setSubmarine ] = useState(() => shipFactory('Submarine'));
  const [ Destroyer, setDestroyer ] = useState(() => shipFactory('Destroyer'));
  return (
    <div>
      <h1>whatever</h1>
    </div>
  );
};
