import React, { useState } from "react";
import styled from "styled-components";
import GameMaker from "./gameMaker/GameMaker";
import About from "./about/About";
// import SpriteTester from "./game/SpriteTester";
import { StepSelector } from "./gameMaker/StepSelector";
// import { useLocalStorage } from "../hooks/useLocalStorage";
import { Home } from "./home/Home";

export const Router = ({
  spriteData,
  setSpriteData,
  setShowGame,
  IN_TEST_MODE,
}) => {
  const [currStep, setCurrStep] = useState(0);
  const _currStep = IN_TEST_MODE ? 1 : currStep;

  // const gameCreated = spriteData && spriteData.canvas;

  return (
    <Container>
      <StepSelector currStep={currStep} setCurrStep={setCurrStep}>
        {_currStep === 0 && (
          <StepHolder>
            <Home onGetMaking={() => setCurrStep(0)} />
          </StepHolder>
        )}
        {_currStep === 1 && (
          <StepHolder>
            <GameMaker
              setShowGame={setShowGame}
              spriteData={spriteData}
              setSpriteData={setSpriteData}
              IN_TEST_MODE={IN_TEST_MODE}
            />
          </StepHolder>
        )}
        {_currStep === 2 && (
          <StepHolder>
            <About />
          </StepHolder>
        )}
      </StepSelector>

      {/* {IN_TEST_MODE && gameCreated && (
        <div>
          <SpriteTester spriteData={spriteData} />
        </div>
      )} */}
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
