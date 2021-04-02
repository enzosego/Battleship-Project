import React from "react";
import { Player } from "../Player/Player";
import { Computer } from "../Computer/Computer";

export const GameBoard = ({triggerGameStart, hasGameStarted, switchShipAxis, verticalAxis,
  addPlayerShip, handlePlayerAttack, playerBoard, computerBoard, removeLastShip, shipPreview, 
  showShipPreview, hideShipPreview}) => {
  return(
    <section className="game-board">
      <button onClick={triggerGameStart}>Start Game</button>
      <button onClick={switchShipAxis}>AXIS: {verticalAxis ? "Y" : "X"}</button>
      <button onClick={removeLastShip}>Remove ship</button>
      <Player 
        playerBoard={playerBoard}
        addPlayerShip={addPlayerShip}
        shipPreview={shipPreview}
        showShipPreview={showShipPreview}
        hideShipPreview={hideShipPreview}/>
      {hasGameStarted === false
        ? ""
        : <Computer 
          computerBoard={computerBoard}
          handlePlayerAttack={handlePlayerAttack}/>}
    </section>
    )
}
