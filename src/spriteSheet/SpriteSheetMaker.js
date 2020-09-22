import React, { useState, useEffect } from "react";
import ImageInputSelector from "../components/imageInput/ImageInputSelector";
import { generateSpritesheet } from "./generateSpritesheet";

const SpriteSheetMaker = ({ setSpriteData, w, h, spriteData }) => {
  const [, setFrameNumber] = useState(0);
  const [sourceImg, setSourceImg] = useState(null);
  const [spritesheetMask, setSpritesheetMask] = useState(null);

  useEffect(() => {
    const generatedSheetData = generateSpritesheet(
      sourceImg,
      spritesheetMask,
      w,
      h
    );

    setSpriteData(generatedSheetData);

    // eslint-disable-next-line
  }, [sourceImg, spritesheetMask, w, h]);

  // load mask
  useEffect(() => {
    if (!spritesheetMask) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSpritesheetMask(image);
      };
      image.src = "./spritesheet-1-mask.png";
    }
  }, [spritesheetMask]);

  return (
    <div>
      <ImageInputSelector
        setFrameNumber={setFrameNumber}
        srcImg={spriteData ? spriteData.canvas : null}
        setSrcImg={setSourceImg}
      />
    </div>
  );
};

export default SpriteSheetMaker;
