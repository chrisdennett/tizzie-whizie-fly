import React, { useState, useEffect } from "react";
import { defaultGameState } from "../gameLogic/gameState";
import styled from "styled-components";
import PhotoSelector from "./imageInput/PhotoSelector";
import { createMaxSizeCanvas } from "../spriteSheet/helper";
import { generateSpritesheet } from "../spriteSheet/generateSpritesheet";
import ExternalLink from "./ExternalLink";

const GameMaker = ({ setSpriteData, IN_TEST_MODE }) => {
  console.log("GAME_MAKER");
  const [spritesheetMask, setSpritesheetMask] = useState(null);

  const w = defaultGameState.gameW;
  const h = defaultGameState.gameH;

  // load mask
  useEffect(() => {
    if (!spritesheetMask) {
      loadImage("./spritesheet-1-mask.png", setSpritesheetMask);
    }
    // FOR TESTING - LOAD SAMPLE IMMEDIATELY
    else if (IN_TEST_MODE) {
      loadImage("./tizzie-crayon.jpg", createSpritesheet, true);
      // loadImage("./newMarker-3.jpg", createSpritesheet, true);
    }
    // eslint-disable-next-line
  }, [spritesheetMask, IN_TEST_MODE]);

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
            To make your game, you'll need to grab a template. All the things on
            it will be used in the game.{" "}
          </p>
          <ExternalLink href={"/tizzie-fly-template.pdf"}>
            GET THE TEMPLATE
          </ExternalLink>
          <img src={"/printable-template_250x177.png"} alt={"game template"} />
        </StepHolder>

        <StepHolder>
          <h2>2: Get your Art On!</h2>
          <p>
            Use paint, pencil, collage, clay. Whatever you like, just stay clear
            of those weird corner bits
          </p>

          <img
            src={"/crayon2_250x141.jpg"}
            alt={"coloured in template sheet"}
          />
        </StepHolder>

        <StepHolder>
          <h2>3: Snap and play!</h2>
          <p>Once you're finished, take a photo of it to generate your game.</p>

          <PhotoSelector onPhotoSelected={onPhotoSelected}>
            <button>PHOTO</button>
          </PhotoSelector>

          <img
            src={"/crayon2_250x141.jpg"}
            alt={"coloured in template sheet"}
          />
        </StepHolder>
      </GameSteps>

      <div>
        <h2>Or play one we made earlier...</h2>
        <div onClick={() => onSampleSelect("example-1.png")}>
          <h3>Crayon Wonder</h3>
          <img
            src={"/example-1_250x174.png"}
            alt={"coloured in template sheet"}
          />
        </div>
      </div>
    </div>
  );
};

export default GameMaker;

const GameSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StepHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 250px;
  padding: 20px;

  h2 {
    margin: 0;
  }

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
