import React from "react";
import uniqid from "uniqid";

const classMapping = tile => {
  if (tile.includes("hit")) 
    return "tile ship--hit";
  if (tile.includes("destroyed"))
    return "tile ship--destroyed";
  if (tile.includes("miss"))
    return "tile miss";
  if (tile.includes("sunk")) 
    return "tile ship--sunk";
  return "tile";
}

export const Computer = ({computerBoard, handlePlayerAttack, hasGameStarted}) => {
  const appendingTiles = () => {
    let count = -1;
    return computerBoard.board.map(tile => 
      <div 
        className={classMapping(tile)}
        id={count+=1}
        onClick={e => handlePlayerAttack(+e.target.id)}
        onMouseOver={e => e.target.style.backgroundColor = "#C83737"}
        onMouseLeave={e => e.target.style.backgroundColor = ""}
        key={uniqid()}>
      </div>)
  }

  return(
    <section className={!hasGameStarted ? "computer-board" : "computer-board-start"}>
      <h1>Computer</h1>
      <section className="board-grid --hover">
        {appendingTiles()}
      </section>
    </section>
    )
}
