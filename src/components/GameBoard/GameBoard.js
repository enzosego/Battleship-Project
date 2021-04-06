import React from "react";
import { Player } from "../Player/Player";
import { Computer } from "../Computer/Computer";

export const GameBoard = ({hasGameStarted, addPlayerShip, 
  handlePlayerAttack, playerBoard, computerBoard, 
  showShipPreview, hideShipPreview}) => {
  return(
    <section className="game-board">
      <Player 
        playerBoard={playerBoard}
        addPlayerShip={addPlayerShip}
        showShipPreview={showShipPreview}
        hideShipPreview={hideShipPreview}
        hasGameStarted={hasGameStarted}/>
      {hasGameStarted === false
        ? ""
        : <Computer 
          computerBoard={computerBoard}
          handlePlayerAttack={handlePlayerAttack}
          hasGameStarted={hasGameStarted}/>}
    </section>
    )
}
