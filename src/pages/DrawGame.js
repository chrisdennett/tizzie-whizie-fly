import React from "react";
import { Link } from "@reach/router";
import SpriteSheetMaker from "../spriteSheet/SpriteSheetMaker";
import { defaultGameState } from "../game/gameState";

const DrawGame = ({ setSpriteData, spriteData }) => {
  return (
    <div>
      <h1>DrawGame</h1>
      <Link to="/playgame">Play your game</Link>
      <SpriteSheetMaker
        setSpriteData={setSpriteData}
        spriteData={spriteData}
        w={defaultGameState.gameW}
        h={defaultGameState.gameH}
      />
    </div>
  );
};

export default DrawGame;
