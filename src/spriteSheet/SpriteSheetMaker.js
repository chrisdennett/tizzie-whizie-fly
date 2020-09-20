import React, { useState, useEffect } from "react";
import PhotoSelector from "../components/photoSelector/PhotoSelector";
import { WebcamFrameGrabber } from "../components/WebcamFrameGrabber";
import { generateSpritesheet } from "./generateSpritesheet";
import { createCanvasFromFile } from "./helper";

const SpriteSheetMaker = ({ setSpriteData, w, h }) => {
  const [useWebcam, setUseWebcam] = useState(false);
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

  // load sample image
  useEffect(() => {
    if (!sourceImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSourceImg(image);
      };
      image.src = "./spritesheet-1.png";
    }
  }, [sourceImg]);

  const onPhotoSelected = (imgFile) => {
    createCanvasFromFile(imgFile, (img) => {
      setSourceImg(img);
    });
  };

  const onWebcamFrame = (frameCanvas) => {
    if (frameCanvas) {
      setSourceImg(frameCanvas);
    }
  };

  const onUseWebcam = () => setUseWebcam((prev) => !prev);

  return (
    <div>
      <button onClick={onUseWebcam}>Use webcam</button>
      {useWebcam && <WebcamFrameGrabber setCurrFrame={onWebcamFrame} />}
      <PhotoSelector onPhotoSelected={onPhotoSelected} />
    </div>
  );
};

export default SpriteSheetMaker;
