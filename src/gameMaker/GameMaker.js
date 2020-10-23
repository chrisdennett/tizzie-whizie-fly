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
import { useLocalStorage } from "../hooks/useLocalStorage";

const IN_LOCAL_TEST_MODE = false;

const GameMaker = ({
  spriteData,
  setSpriteData,
  setShowGame,
  IN_TEST_MODE,
}) => {
  const [photoCanvas, setPhotoCanvas] = useState(null);
  const [spritesheetMask, setSpritesheetMask] = useState(null);
  const [currStep, setCurrStep] = useLocalStorage("currentStep", 0);

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
      <GameSteps>
        <StepSelector
          currStep={currStep}
          setCurrStep={setCurrStep}
          playTabDisabled={photoCanvas === null}
        >
          {currStep === 0 && (
            <StepHolder>
              <h2>1) Print & Make</h2>
              <p>
                Print and decorate however you like - paint, pencil, collage,
                clay, whatever!
              </p>
              <p>
                <b>Just keep clear of those weird corner bits</b>. Those need to
                be clearly visible for the magic to happen!
              </p>

              <StyledExternalLink href={"/tizzie-fly-template.pdf"}>
                GET THE TEMPLATE
              </StyledExternalLink>

              <NextButtonHolder>
                <CallToActionButton onClick={() => setCurrStep(1)}>
                  Next
                </CallToActionButton>
              </NextButtonHolder>
            </StepHolder>
          )}

          {currStep === 1 && (
            <StepHolder>
              <h2>2) Snap & Play</h2>
              <p>
                Take of photo of your sheet{" "}
                <b>making sure all four magic corner squares can be seen</b>.
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

const StyledExternalLink = styled(ExternalLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  font-weight: bold;
  border: 1px solid black;
  width: 250px;
  height: 177px;
  background-image: url("/spritesheet-for-pdf_250x177.png");
`;

const NextButtonHolder = styled.div`
  margin-top: 15px;
  width: 100%;
  text-align: right;
`;

const StepHolder = styled.div`
  padding: 20px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

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
