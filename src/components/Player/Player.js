import React from "react"
import uniqid from "uniqid";

const classMapping = tile => {
  if (tile.includes("hit")) 
    return "tile ship--hit";
  if (tile.includes("destroyed"))
    return "tile ship--destroyed";
  if (tile !== "" && !tile.includes("null")) 
    return "tile ship"
  return "tile";
}

export const Player = ({playerBoard, addPlayerShip}) => {
  const appendingTiles = () => {
    let count = -1;
    return playerBoard.board.map(tile => 
      <div 
        className={classMapping(tile)}
        id={count+=1}
        onClick={e => addPlayerShip(+e.target.id)}
        key={uniqid()}>
      </div>)
  }

  return(
    <section className="player-board">
      <section className="board-grid">
        {appendingTiles()}
      </section>
    </section>
    )
}
