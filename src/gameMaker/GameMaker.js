import React, { useState, useEffect } from "react";
import { defaultGameState } from "../gameLogic/gameState";
import styled from "styled-components";
import PhotoSelector from "../components/imageInput/PhotoSelector";
import { createMaxSizeCanvas } from "../spriteSheet/helper";
import { generateSpritesheet } from "../spriteSheet/generateSpritesheet";
import ExternalLink from "../components/ExternalLink";
import { StepSelector } from "./StepSelector";

const GameMaker = ({ setSpriteData, IN_TEST_MODE }) => {
  const [photoCanvas, setPhotoCanvas] = useState(null);
  const [spritesheetMask, setSpritesheetMask] = useState(null);
  const [currStep, setCurrStep] = useState(2);

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

  const onCreateGame = () => {
    createSpritesheet(photoCanvas);
  };

  const onSampleSelect = (imgName) => {
    loadImage(imgName, createSpritesheet, true);
  };

  return (
    <div>
      <GameSteps>
        <StepSelector currStep={currStep} setCurrStep={setCurrStep}>
          {currStep === 0 && (
            <StepHolder>
              <h2>Print the template</h2>
              <p>
                To make your game, you'll need to grab a template. All the
                things on it will be used in the game.{" "}
              </p>
              <ExternalLink href={"/tizzie-fly-template.pdf"}>
                GET THE TEMPLATE
              </ExternalLink>
              <img
                src={"/printable-template_250x177.png"}
                alt={"game template"}
              />
              <NextStepButton onClick={() => setCurrStep(1)}>
                Next
              </NextStepButton>
            </StepHolder>
          )}

          {currStep === 1 && (
            <StepHolder>
              <h2>Create your artwork</h2>
              <p>
                Use paint, pencil, collage, clay. Whatever you like, just stay
                clear of those weird corner bits because they need to be clearer
                clean for the magic to happen!
              </p>

              <img
                src={"/crayon2_250x141.jpg"}
                alt={"coloured in template sheet"}
              />

              <NextStepButton onClick={() => setCurrStep(2)} disabled="true">
                Next
              </NextStepButton>
            </StepHolder>
          )}

          {currStep === 2 && (
            <StepHolder>
              <h2>Snap a photo</h2>
              <p>
                Once you're finished, take a photo of it to generate your game.
              </p>

              <PhotoSelector
                setPhotoCanvas={setPhotoCanvas}
                photoCanvas={photoCanvas}
              >
                <NextStepButton
                  disabled={photoCanvas === null}
                  onClick={() => setCurrStep(3)}
                >
                  NEXT
                </NextStepButton>
              </PhotoSelector>
            </StepHolder>
          )}

          {currStep === 3 && (
            <StepHolder>
              <h2>Play your game</h2>
              <p>
                If all has gone how it should pressing this button should open
                your game.
              </p>
              <button onClick={onCreateGame}>CREATE GAME</button>
            </StepHolder>
          )}
        </StepSelector>
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

const GameSteps = styled.div``;

const NextStepButton = styled.button`
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;

const StepHolder = styled.div`
  padding: 20px;

  h2 {
    margin: 0;
    text-align: center;
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
