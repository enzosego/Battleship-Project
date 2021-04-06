import React from "react"
import uniqid from "uniqid";

const classMapping = (tile) => {
  if (tile.includes("hit")) 
    return "tile ship--hit";
  if (tile.includes("destroyed"))
    return "tile ship--destroyed";
  if (tile.includes("miss"))
    return "tile miss";
  if (tile.includes("sunk"))
    return "tile ship--sunk";
  if (tile !== "" && !tile.includes("null")) 
    return "tile ship"
  return "tile";
}

export const Player = ({playerBoard, addPlayerShip, 
  showShipPreview, hideShipPreview, hasGameStarted}) => {
  const appendingTiles = () => {
    let count = -1;
    const { board } = playerBoard;
    return board.map(tile => 
      <div 
        className={classMapping(tile)}
        id={count+=1}
        onClick={e => addPlayerShip(+e.target.id)}
        onMouseEnter={showShipPreview}
        onMouseOut={hideShipPreview}
        key={uniqid()}>
      </div>)
  }

  return(
    <section 
      className="player-board">
      <h1>{hasGameStarted ? 'You' : 'Place your ships, ready for battle!'}</h1>
      <section className={hasGameStarted ? "board-grid" : "board-grid --hover"}>
        {appendingTiles()}
      </section>
    </section>
    )
}
