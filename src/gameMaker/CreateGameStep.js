import React, { useState } from "react";
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

          <button onClick={nextStep}>{steps[currStep].label}</button>
        </div>
      )}

      {spriteData && (
        <div>
          <GameStartCanvas spriteData={spriteData} />
          <button onClick={() => setShowGame(true)}>PLAY YOUR GAME</button>
        </div>
      )}

      {/* {!spriteData && <button onClick={onCreateGame}>CREATE GAME</button>}

      {spriteData && (
        <button onClick={() => setShowGame(true)}>PLAY YOUR GAME</button>
      )} */}
    </div>
  );
};
