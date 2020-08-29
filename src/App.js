import React, { useState } from "react";
import { Game } from "./game/Game";
import SpriteSheetMaker from "./spriteSheet/SpriteSheetMaker";
import { defaultGameState } from "./game/gameState";

function App() {
  const [spriteData, setSpriteData] = useState(null);
  const [gameState, setGameState] = useState(defaultGameState);

  return (
    <div>
      {spriteData && (
        <Game
          spriteData={spriteData}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}

      {/* {!spriteData && ( */}
      <SpriteSheetMaker
        setSpriteData={setSpriteData}
        w={defaultGameState.gameW}
        h={defaultGameState.gameH}
      />
      {/* )} */}
    </div>
  );
}

export default App;
