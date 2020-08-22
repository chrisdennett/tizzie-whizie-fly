import React, { useState, useEffect } from "react";
import { Game } from "./game/Game";
import SpriteSheetMaker from "./spriteSheet/SpriteSheetMaker";

function App() {
  const [sourceImg, setSourceImg] = useState(null);
  const [spriteCanvas, setSpriteCanvas] = useState(null);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    if (!sourceImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSourceImg(image);
      };

      image.src = "./marker-test.jpg";
      // image.src = "./template.png";
    }
  }, [sourceImg]);

  const doStartGame = () => setStartGame(true);

  return (
    <div>
      <button onClick={doStartGame}>START</button>
      {spriteCanvas && <Game spriteCanvas={spriteCanvas} />}
      {!startGame && (
        <SpriteSheetMaker
          sourceImg={sourceImg}
          setSpriteCanvas={setSpriteCanvas}
        />
      )}
    </div>
  );
}

export default App;
