import React from "react"

const DefeatScreen = ({prop}) => {
  return (
    <section className={prop}>
      <h1>YOU LOST!</h1>
      <h3>Click anywhere to play again</h3>
    </section>
  )
}

const WinScreen = ({prop}) => {
  return (
    <section className={prop}>
      <h1>YOU WON!</h1>
      <h3>Click anywhere to play again</h3>
    </section>
  )
}

export const EndScreen = ({whoLost, resetGame}) => {
  return(
    <section onClick={resetGame}>
      {whoLost === "computer"
        ? <WinScreen prop={"end --win"}/>
        : <DefeatScreen prop={"end --defeat"}/>}
    </section>
    )
}
