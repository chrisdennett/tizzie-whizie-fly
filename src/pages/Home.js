import React from "react";
import GameArtSelector from "../components/gameSelector/GameArtSelector";
import DrawGame from "./DrawGame";

const Home = ({ gameCreated, setSpriteData }) => {
  return (
    <div>
      <h1>Home</h1>
      <p>Add brief intro to the project here.</p>
      <DrawGame setSpriteData={setSpriteData} />
      <GameArtSelector gameCreated={gameCreated} />
    </div>
  );
};

export default Home;
