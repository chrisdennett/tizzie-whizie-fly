import React, { useState, useEffect } from "react";
import { defaultGameState } from "../game/gameState";
import styled from "styled-components";
import PhotoSelector from "./imageInput/PhotoSelector";
import { createMaxSizeCanvas } from "../spriteSheet/helper";
import { generateSpritesheet } from "../spriteSheet/generateSpritesheet";
import ExternalLink from "./ExternalLink";

const DrawGame = ({ setSpriteData, windowSize }) => {
  const [spritesheetMask, setSpritesheetMask] = useState(null);

  const w = defaultGameState.gameW;
  const h = defaultGameState.gameH;

  // load mask
  useEffect(() => {
    if (!spritesheetMask) {
      loadImage("./spritesheet-1-mask.png", setSpritesheetMask);
    }
  }, [spritesheetMask]);

  const createSpritesheet = (sourceImg) => {
    const generatedSheetData = generateSpritesheet(
      sourceImg,
      spritesheetMask,
      w,
      h
    );

    setSpriteData(generatedSheetData);
  };

  const onPhotoSelected = (photo) => {
    createSpritesheet(photo);
  };

  const onSampleSelect = (imgName) =>
    loadImage(imgName, createSpritesheet, true);

  return (
    <div>
      <GameSteps>
        <StepHolder>
          <h2>1: Print a Template</h2>
          <p>
            Grab yourself a sheet and use paint, pencil, collage, clay, whatever
            you like to create all the bits we need for the game.
          </p>
          <ExternalLink href={"/tizzie-fly-template.pdf"}>
            PRINT TEMPLATE
          </ExternalLink>
          <img src={"/printable-template_250x177.png"} alt={"game template"} />
        </StepHolder>

        <StepHolder>
          <h2>2: Get your Art On!</h2>
          <p>Once you're finished, take a photo of it to generate your game.</p>

          <PhotoSelector onPhotoSelected={onPhotoSelected}>
            <button>ADD/TAKE PHOTO</button>
          </PhotoSelector>

          <img
            src={"/crayon2_250x141.jpg"}
            alt={"coloured in template sheet"}
          />
        </StepHolder>

        <StepHolder>
          <h2>3: Play your game!</h2>
          <p>Once you're finished, take a photo of it to generate your game.</p>

          <img
            src={"/crayon2_250x141.jpg"}
            alt={"coloured in template sheet"}
          />
        </StepHolder>
      </GameSteps>

      <div>
        <h2>Or play one we made earlier...</h2>
        <div onClick={() => onSampleSelect("crayon2.jpg")}>
          <h3>Crayon Wonder</h3>
          <img
            src={"/crayon2_250x141.jpg"}
            alt={"coloured in template sheet"}
          />
        </div>
      </div>
    </div>
  );
};

export default DrawGame;

const GameSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StepHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 250px;
  padding: 20px;

  img {
    border: 1px solid rgba(0, 0, 0, 0.8);
  }
`;

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
