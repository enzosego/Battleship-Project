import React from "react"
import uniqid from "uniqid";

const classMapping = (tile, index, shipPreview) => {
  if (shipPreview.length === 1 && index === shipPreview[0])
    return "preview-error";
  if (shipPreview.includes(index))
    return "preview-tile";
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

export const Player = ({playerBoard, addPlayerShip, shipPreview, showShipPreview, hideShipPreview}) => {
  const appendingTiles = () => {
    let count = -1;
    const { board } = playerBoard;
    return board.map(tile => 
      <div 
        className={classMapping(tile, count+=1, shipPreview)}
        id={count}
        onClick={e => addPlayerShip(+e.target.id)}
        onMouseEnter={(e) => showShipPreview(+e.target.id)}
        key={uniqid()}>
      </div>)
  }

  return(
    <section 
      onMouseOut={hideShipPreview} 
      className="player-board">
      <section className="board-grid">
        {appendingTiles()}
      </section>
    </section>
    )
}
