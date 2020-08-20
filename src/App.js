import React, { useState, useEffect } from "react";
import { Game } from "./game/Game";

function App() {
  const [sourceImg, setSourceImg] = useState(null);

  useEffect(() => {
    if (!sourceImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSourceImg(image);
      };

      image.src = "./test.jpg";
    }
  }, [sourceImg]);

  return <div>{sourceImg && <Game spriteSheet={sourceImg} />}</div>;
}

export default App;
