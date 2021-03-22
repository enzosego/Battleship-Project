import React from "react"
import uniqid from "uniqid";

const tileMapping = tile => {
  if (tile.includes("hit")) 
    return "tile ship--hit";
  if (tile.includes("destroyed"))
    return "tile ship--destroyed";
  if (tile !== "") 
    return "tile ship"
  return "tile";
}

export const Player = ({playerBoard, addShipToBoard}) => {
  const appendingTiles = () => 
    playerBoard.board.map(tile => 
      <div 
        className={tileMapping(tile)}
        key={uniqid()}>
      </div>)

  return(
    <section className="player-board">
      <section className="board-grid">
        {appendingTiles()}
      </section>
      <button onClick={() => addShipToBoard()}>Add new ship</button>
    </section>
    )
}
