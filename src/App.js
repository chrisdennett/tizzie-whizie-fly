import React, { useState } from "react";
import { Game } from "./game/Game";
import SpriteSheetMaker from "./spriteSheet/SpriteSheetMaker";
import { defaultGameState } from "./game/gameState";

function App() {
  const [spriteCanvas, setSpriteCanvas] = useState(null);
  const [gameState, setGameState] = useState(defaultGameState);

  return (
    <div>
      {spriteCanvas && (
        <Game
          spriteCanvas={spriteCanvas}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}

      {!spriteCanvas && (
        <SpriteSheetMaker
          setSpriteCanvas={setSpriteCanvas}
          w={defaultGameState.gameW}
          h={defaultGameState.gameH}
        />
      )}
    </div>
  );
}

export default App;
