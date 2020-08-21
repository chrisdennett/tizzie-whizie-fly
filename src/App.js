import React, { useState, useEffect } from "react";
import { Game } from "./game/Game";
import SpriteSheetMaker from "./spriteSheet/SpriteSheetMaker";

function App() {
  const [sourceImg, setSourceImg] = useState(null);

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

  return (
    <div>
      <SpriteSheetMaker sourceImg={sourceImg} />

      {/* {sourceImg && <Game spriteSheet={sourceImg} />} */}
    </div>
  );
}

export default App;
