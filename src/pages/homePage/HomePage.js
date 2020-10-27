import React, { useState } from "react";
import styled from "styled-components";
import GameMaker from "../gameMaker/GameMaker";
import About from "../About";
import SpriteTester from "../game/SpriteTester";
import { StepSelector } from "../gameMaker/StepSelector";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Intro from "./Intro";

export const HomePage = ({
  spriteData,
  setSpriteData,
  setShowGame,
  IN_TEST_MODE
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [currStep, setCurrStep] = useLocalStorage("currentStep", 0);

  const gameCreated = spriteData && spriteData.canvas;

  return (
    <Container>
      {showInfo && <About onClose={() => setShowInfo(false)} />}
      {/* <InfoButton onClick={() => setShowInfo(true)} /> */}

      <StepSelector currStep={currStep} setCurrStep={setCurrStep}>
        {currStep === 0 && (
          <StepHolder>
            <Intro onGetMaking={() => setCurrStep(1)} />
          </StepHolder>
        )}
        {currStep === 1 && (
          <StepHolder>
            <GameMaker
              setShowGame={setShowGame}
              spriteData={spriteData}
              setSpriteData={setSpriteData}
              IN_TEST_MODE={IN_TEST_MODE}
            />
          </StepHolder>
        )}
        {currStep === 2 && (
          <StepHolder>
            <About />
          </StepHolder>
        )}
      </StepSelector>

      {IN_TEST_MODE && gameCreated && (
        <div>
          <SpriteTester spriteData={spriteData} />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: auto;
`;

const StepHolder = styled.div`
  padding: 20px;
`;

// const GamePreviewHolder = styled.div`
//   padding: 20px;
//   background-image: url("/img/bg/cutting-mat-tile.png");
//   border-radius: 10px;
//   display: flex;
//   border-bottom: 3px solid rgba(0, 0, 0, 0.5);
//   border-right: 3px solid rgba(0, 0, 0, 0.5);
// `;
