import React from "react";
import GameSelector from "../components/gameSelector/GameSelector";

const Home = ({ gameCreated }) => {
  return (
    <div>
      <h1>Home</h1>
      <p>Add brief intro to the project here.</p>
      <GameSelector gameCreated={gameCreated} />
    </div>
  );
};

export default Home;
