import React, { useState } from "react";
import styled from "styled-components";
import GameMaker from "./gameMaker/GameMaker";
import About from "./about/About";
// import SpriteTester from "./game/SpriteTester";
import { StepSelector } from "./gameMaker/StepSelector";
// import { useLocalStorage } from "../hooks/useLocalStorage";
import { Home } from "./home/Home";
import { motion } from "framer-motion";

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
          <StepHolder
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Home onGetMaking={() => setCurrStep(1)} />
          </StepHolder>
        )}
        {_currStep === 1 && (
          <StepHolder
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GameMaker
              setShowGame={setShowGame}
              spriteData={spriteData}
              setSpriteData={setSpriteData}
              IN_TEST_MODE={IN_TEST_MODE}
            />
          </StepHolder>
        )}
        {_currStep === 2 && (
          <StepHolder
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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

const StepHolder = styled(motion.div)`
  padding: 2%;
`;

// const GamePreviewHolder = styled.div`
//   padding: 20px;
//   background-image: url("/img/bg/cutting-mat-tile.png");
//   border-radius: 10px;
//   display: flex;
//   border-bottom: 3px solid rgba(0, 0, 0, 0.5);
//   border-right: 3px solid rgba(0, 0, 0, 0.5);
// `;
