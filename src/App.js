import React, { useState } from "react";
import SpriteTester from "./game/SpriteTester";
import DrawGame from "./components/DrawGame";
import PlayGame from "./game/PlayGame";

import { defaultGameState } from "./game/gameState";

function App() {
  const [spriteData, setSpriteData] = useState(null);
  const [gameState, setGameState] = useState(defaultGameState);

  const gameCreated = spriteData && spriteData.canvas;
  const gameProps = { spriteData, gameState, setGameState };

  const onEndGame = () => {
    setSpriteData(null);
    setGameState(defaultGameState);
  };

  return (
    <div>
      {!gameCreated && (
        <div>
          <h1>FLY TIZZIE FLY</h1>
          <h2>Paint your own game</h2>
          <p>Add brief intro to the project here.</p>

          <DrawGame setSpriteData={setSpriteData} />
          <SpriteTester spriteData={spriteData} />
        </div>
      )}
      {gameCreated && (
        <div>
          <button onClick={onEndGame}>End game</button>
          <PlayGame {...gameProps} />
        </div>
      )}
    </div>
  );
}

export default App;
