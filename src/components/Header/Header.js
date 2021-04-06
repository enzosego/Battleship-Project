import React from "react"

export const Header = ({triggerGameStart, switchShipAxis,
removeLastShip, randomlyAddPlayerShips, verticalAxis, 
  hasGameStarted, resetGame}) => {
  return(
    <header>
      <button onClick={hasGameStarted ? resetGame : triggerGameStart}>
        {hasGameStarted ? "Restart" : "Start Game"}
      </button>
      {!hasGameStarted 
        ? <button className="switch-axis-btn" onClick={switchShipAxis}>AXIS: {verticalAxis ? "Y" : "X"}</button>
        : ""}
      {!hasGameStarted 
        ?<button className="remove-ship-btn" onClick={removeLastShip}>Remove ship</button>
        : ""}
      {!hasGameStarted 
        ?<button onClick={randomlyAddPlayerShips}>Random Ships</button>
        : ""}
    </header>
    )
}
