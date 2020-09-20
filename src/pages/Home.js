import React from "react";
import GameArtSelector from "../components/gameSelector/GameArtSelector";
import SpriteTester from "../game/SpriteTester";
import DrawGame from "./DrawGame";

const Home = ({ gameCreated, setSpriteData, spriteData }) => {
  return (
    <div>
      <h1>Home</h1>
      <p>Add brief intro to the project here.</p>
      <SpriteTester spriteData={spriteData} />
      <DrawGame setSpriteData={setSpriteData} />
      <GameArtSelector gameCreated={gameCreated} />
    </div>
  );
};

export default Home;
