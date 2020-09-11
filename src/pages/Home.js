import React from "react";
import GameArtSelector from "../components/gameSelector/GameArtSelector";

const Home = ({ gameCreated }) => {
  return (
    <div>
      <h1>Home</h1>
      <p>Add brief intro to the project here.</p>
      <GameArtSelector gameCreated={gameCreated} />
    </div>
  );
};

export default Home;
