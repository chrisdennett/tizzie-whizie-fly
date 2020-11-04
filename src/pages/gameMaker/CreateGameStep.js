import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CallToActionButton } from "../../components/CallToActionButton";
import PreviewCanvas from "./PreviewCanvas";
import {
  findSheetCorners,
  getUnwarpedCanvas,
} from "../../spriteSheet/generateSpritesheet";
import GameStartCanvas from "./GameStartCanvas";

export const CreateGameStep = ({
  spriteData,
  onCreateGame,
  setShowGame,
  photoCanvas,
  onChangePhoto,
}) => {
  const [currStep, setCurrStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [corners, setCorners] = useState(null);
  const [unwarpedCanvas, setUnwarpedCanvas] = useState(null);

  const steps = [
    { label: "Finding Corners" },
    { label: "Straightening out the sheet" },
    { label: "Creating game characters" },
    { label: "Play Game" },
  ];

  useEffect(() => {
    if (currStep > 0) {
      setTimeout(nextStep, 900);
    }
    // eslint-disable-next-line
  }, [currStep]);

  const startSequence = () => {
    setIsRunning(true);
    setTimeout(nextStep, 500);
  };

  const nextStep = () => {
    if (currStep === 0) {
      const c = findSheetCorners(photoCanvas);
      setCorners(c);
    } else if (currStep === 1 && corners) {
      const uc = getUnwarpedCanvas(photoCanvas, corners);
      setUnwarpedCanvas(uc);
      setCorners(null);
    } else if (currStep === 2 && unwarpedCanvas) {
      onCreateGame(unwarpedCanvas);
    } else if (currStep === 3 && spriteData) {
      // setShowGame(true);
    }

    if (currStep < steps.length - 1) {
      setCurrStep((prev) => prev + 1);
    }
  };

  const currLabel = steps[currStep].label;

  return (
    <Container>
      {!spriteData && (
        <div>
          {photoCanvas && (
            <PreviewCanvasHolder>
              {isRunning && (
                <StepLabel>
                  <span>{currLabel}</span>
                </StepLabel>
              )}
              <PreviewCanvas
                source={unwarpedCanvas ? unwarpedCanvas : photoCanvas}
                corners={corners}
              />
            </PreviewCanvasHolder>
          )}
          <NextButtonHolder>
            <ReplcePhotoButton onClick={onChangePhoto}>
              Cancel
            </ReplcePhotoButton>
            <CallToActionButton onClick={startSequence} disabled={isRunning}>
              {isRunning ? "Making Game" : "DO IT!"}
            </CallToActionButton>
          </NextButtonHolder>
        </div>
      )}

      {spriteData && (
        <div>
          <GameStartCanvas spriteData={spriteData} />
          <NextButtonHolder>
            <ReplcePhotoButton onClick={onChangePhoto}>
              Cancel
            </ReplcePhotoButton>

            <CallToActionButton onClick={() => setShowGame(true)}>
              LAUNCH GAME
            </CallToActionButton>
          </NextButtonHolder>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div``;

const NextButtonHolder = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PreviewCanvasHolder = styled.div`
  position: relative;
`;

const StepLabel = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    background: rgba(255, 255, 255, 0.7);
    padding: 10px;
    font-size: 1.1em;
    border: 1px solid black;
    border-radius: 3px;
    font-size: 1.1em;
    text-align: center;
    max-width: 150px;
  }
`;

const ReplcePhotoButton = styled.button`
  padding: 5px 10px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  background-color: ${(props) => (props.disabled ? "#ccc" : "#b92c2cb0")};
  border: 1px solid black;
  border-radius: 3px;
  font-size: 1.1em;
`;