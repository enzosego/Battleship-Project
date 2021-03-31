import React from "react";
import { Player } from "../Player/Player";
import { Computer } from "../Computer/Computer";

export const GameBoard = ({triggerGameStart, hasGameStarted, switchShipAxis, verticalAxis,
  addPlayerShip, handlePlayerAttack, playerBoard, computerBoard}) => {
  return(
    <section className="game-board">
      <button onClick={triggerGameStart}>Start Game</button>
      <button onClick={switchShipAxis}>AXIS: {verticalAxis ? "Y" : "X"}</button>
      <Player 
        playerBoard={playerBoard}
        addPlayerShip={addPlayerShip}/>
      {hasGameStarted === false
        ? ""
        : <Computer 
          computerBoard={computerBoard}
          handlePlayerAttack={handlePlayerAttack}/>}
    </section>
    )
}
