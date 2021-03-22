import React from "react";
import { GameBoard } from "./components/GameBoard/GameBoard";
import "./App.scss";

export const App = () => {
  return (
    <section className="App">
      <GameBoard />
    </section>
  );
};
