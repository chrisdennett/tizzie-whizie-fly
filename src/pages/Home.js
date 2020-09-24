import { Link } from "@reach/router";
import React from "react";
import SpriteTester from "../game/SpriteTester";
import DrawGame from "./DrawGame";

const Home = ({
  gameCreated,
  setSpriteData,
  spriteData,
  setSourceImg,
  sourceImg,
}) => {
  return (
    <div>
      <h1>FLY TIZZIE FLY</h1>
      <h2>Paint your own game</h2>
      <p>Add brief intro to the project here.</p>

      {gameCreated && (
        <div>
          <Link to={"/playgame"}>PLAY GAME</Link>
        </div>
      )}

      <DrawGame setSpriteData={setSpriteData} spriteData={spriteData} />
      <SpriteTester spriteData={spriteData} />
    </div>
  );
};

export default Home;
