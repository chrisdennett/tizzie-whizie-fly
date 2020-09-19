import React, { useState, useRef, useEffect } from "react";
import PhotoSelector from "../components/photoSelector/PhotoSelector";
import { WebcamFrameGrabber } from "../components/WebcamFrameGrabber";
import { generateSpritesheet } from "./generateSpritesheet";
import { createCanvasFromFile } from "./helper";

const SpriteSheetMaker = ({ setSpriteData, w, h }) => {
  const [useWebcam, setUseWebcam] = useState(false);
  const [sourceImg, setSourceImg] = useState(null);
  const [spritesheetMask, setSpritesheetMask] = useState(null);

  const sourceCanvasRef = useRef(null);
  const maskedCanvasRef = useRef(null);

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
    <div style={{ background: "gray" }}>
      <button onClick={onUseWebcam}>Use webcam</button>
      {useWebcam && <WebcamFrameGrabber setCurrFrame={onWebcamFrame} />}
      <PhotoSelector onPhotoSelected={onPhotoSelected} />
      <div>
        <canvas ref={maskedCanvasRef} style={{ border: "red 1px solid" }} />
        <canvas ref={sourceCanvasRef} style={{ display: "block" }} />
      </div>
    </div>
  );
};

export default SpriteSheetMaker;
