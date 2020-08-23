import React, { useState, useEffect } from "react";
import { Game } from "./game/Game";
import SpriteSheetMaker from "./spriteSheet/SpriteSheetMaker";
import { defaultGameState } from "./game/gameState";

function App() {
  const [sourceImg, setSourceImg] = useState(null);
  const [spriteCanvas, setSpriteCanvas] = useState(null);
  const [gameState, setGameState] = useState(defaultGameState);

  useEffect(() => {
    if (!sourceImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSourceImg(image);
      };

      image.src = "./spritesheet.jpg";
    }
  }, [sourceImg]);

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
          sourceImg={sourceImg}
          setSpriteCanvas={setSpriteCanvas}
          w={defaultGameState.gameW}
          h={defaultGameState.gameH}
        />
      )}
    </div>
  );
}

export default App;
