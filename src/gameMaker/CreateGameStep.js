import React, { useState } from "react";
import styled from "styled-components";
import { CallToActionButton } from "../components/CallToActionButton";
import PreviewCanvas from "../components/imageInput/PreviewCanvas";
import {
  findSheetCorners,
  getUnwarpedCanvas,
} from "../spriteSheet/generateSpritesheet";
import GameStartCanvas from "./GameStartCanvas";

export const CreateGameStep = ({
  spriteData,
  onCreateGame,
  setShowGame,
  photoCanvas,
  onChangePhoto,
}) => {
  const [currStep, setCurrStep] = useState(0);
  const [corners, setCorners] = useState(null);
  const [unwarpedCanvas, setUnwarpedCanvas] = useState(null);

  const steps = [
    { label: "Find Corners" },
    { label: "Straighten out the sheet" },
    { label: "Create game characters" },
    { label: "Play Game" },
  ];

  const nextStep = () => {
    if (currStep === 0) {
      const c = findSheetCorners(photoCanvas);
      setCorners(c);
    } else if (currStep === 1) {
      const uc = getUnwarpedCanvas(photoCanvas, corners);
      setUnwarpedCanvas(uc);
      setCorners(null);
    } else if (currStep === 2) {
      onCreateGame(unwarpedCanvas);
    } else if (currStep === 3) {
      setShowGame(true);
    }

    if (currStep < steps.length - 1) {
      setCurrStep((prev) => prev + 1);
    }
  };

  return (
    <div>
      {!spriteData && (
        <div>
          {photoCanvas && (
            <PreviewCanvas
              source={unwarpedCanvas ? unwarpedCanvas : photoCanvas}
              corners={corners}
            />
          )}
          <NextButtonHolder>
            <ReplcePhotoButton onClick={onChangePhoto}>Redo</ReplcePhotoButton>
            <CallToActionButton onClick={nextStep}>
              {steps[currStep].label}
            </CallToActionButton>
          </NextButtonHolder>
        </div>
      )}

      {spriteData && (
        <div>
          <GameStartCanvas spriteData={spriteData} />
          <NextButtonHolder>
            <ReplcePhotoButton onClick={onChangePhoto}>Redo</ReplcePhotoButton>

            <CallToActionButton onClick={() => setShowGame(true)}>
              PLAY YOUR GAME
            </CallToActionButton>
          </NextButtonHolder>
        </div>
      )}

      {/* {!spriteData && <button onClick={onCreateGame}>CREATE GAME</button>}

      {spriteData && (
        <button onClick={() => setShowGame(true)}>PLAY YOUR GAME</button>
      )} */}
    </div>
  );
};

const NextButtonHolder = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  /* flex-wrap: wrap; */
`;

const ReplcePhotoButton = styled.button`
  padding: 5px 10px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  background-color: ${(props) => (props.disabled ? "#ccc" : "#b92c2cb0")};
  border: 1px solid black;
  border-radius: 3px;
  font-size: 1.1em;
  word-wrap: break-word;
`;
