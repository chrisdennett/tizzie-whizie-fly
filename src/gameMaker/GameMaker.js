import React, { useState, useEffect } from "react";
// import { defaultGameState } from "../gameLogic/gameState";
import styled from "styled-components";
import PhotoSelector from "../components/imageInput/PhotoSelector";
import { createMaxSizeCanvas } from "../spriteSheet/helper";
import {
  generateSpritesheet,
  generateSpritesheetFromScratch,
} from "../spriteSheet/generateSpritesheet";
import ExternalLink from "../components/ExternalLink";
import { StepSelector } from "./StepSelector";
import { CreateGameStep } from "./CreateGameStep";
import { CallToActionButton } from "../components/CallToActionButton";

const IN_LOCAL_TEST_MODE = false;

const GameMaker = ({
  spriteData,
  setSpriteData,
  setShowGame,
  IN_TEST_MODE,
}) => {
  const [photoCanvas, setPhotoCanvas] = useState(null);
  const [spritesheetMask, setSpritesheetMask] = useState(null);

  // load mask
  useEffect(() => {
    if (!spritesheetMask) {
      loadImage("./spritesheet-1-mask.png", setSpritesheetMask);
    }
    // FOR TESTING - LOAD SAMPLE IMMEDIATELY
    else if (IN_TEST_MODE || IN_LOCAL_TEST_MODE) {
      loadImage("./tizzie-crayon.jpg", createSpritesheet, true);
      // loadImage("./tizzie-crayon.jpg", createSpritesheet, true);
    }
    // eslint-disable-next-line
  }, [spritesheetMask, IN_TEST_MODE]);

  // USED IN TEST TO GO STRAIGHT TO A GAME
  const createSpritesheet = (sourceImg) => {
    const generatedSheetData = generateSpritesheetFromScratch(
      sourceImg,
      spritesheetMask
    );
    setSpriteData(generatedSheetData);
    setShowGame(true);
  };

  const onCreateGame = (unwarpedCanvas) => {
    const generatedSheetData = generateSpritesheet(
      unwarpedCanvas,
      spritesheetMask
    );
    setSpriteData(generatedSheetData);
  };

  const onSampleSelect = (imgName) => {
    loadImage(imgName, setPhotoCanvas, true);
  };

  const onChangePhoto = () => {
    setSpriteData(null);
    setPhotoCanvas(null);
  };

  const showGameCreateStep = spriteData !== null || photoCanvas !== null;

  return (
    <div>
      <h1>Get making!</h1>

      <p>
        <b>1)</b> Print the{" "}
        <CallToActionButton href={"/tizzie-fly-template.pdf"}>
          Template
        </CallToActionButton>
      </p>

      <p>
        <b>2)</b> Paint or decorate.
      </p>

      {!showGameCreateStep && (
        <PhotoSelector
          setPhotoCanvas={setPhotoCanvas}
          photoCanvas={photoCanvas}
        />
      )}

      {showGameCreateStep && (
        <CreateGameStep
          onChangePhoto={onChangePhoto}
          photoCanvas={photoCanvas}
          spriteData={spriteData}
          onCreateGame={onCreateGame}
          setShowGame={setShowGame}
        />
      )}

      <div>
        <h3>Tips:</h3>
        <h4>Painting / decorating</h4>
        <p>
          <b>Just keep clear of those weird corner bits</b>. Those need to be
          clearly visible for the magic to happen!
        </p>

        <h4>Taking the photo</h4>
        <p>
          <b>making sure all four magic corner squares can be seen</b>.
        </p>
      </div>

      <h2>Or play one we made earlier...</h2>
      <div onClick={() => onSampleSelect("example-1.png")}>
        <h3>Crayon Wonder</h3>
        <img
          src={"/example-1_250x174.png"}
          alt={"coloured in template sheet"}
        />
      </div>
    </div>
  );
};

export default GameMaker;

const loadImage = (imgUrl, callback, setMax = false) => {
  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.onload = () => {
    if (setMax) {
      const c = createMaxSizeCanvas(image);
      callback(c);
    } else {
      callback(image);
    }
  };
  image.src = imgUrl;
};
