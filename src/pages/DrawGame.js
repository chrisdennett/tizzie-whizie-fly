import React from "react";
import SpriteSheetMaker from "../spriteSheet/SpriteSheetMaker";
import { defaultGameState } from "../game/gameState";
import styled from "styled-components";

const DrawGame = ({ setSpriteData, spriteData }) => {
  return (
    <div>
      <GameSteps>
        <IntructionStep
          title={"1: Print a Template"}
          description={
            "Grab yourself a sheet and use paint, pencil, collage, clay, whatever you like to create all the bits we need for the game."
          }
          img={"/printable-template_250x177.png"}
          buttLabel={"PRINT TEMPLATE"}
        />
        <IntructionStep
          title={"2: Get your Art On!"}
          description={
            "Once you're finished, take a photo of it to generate your game."
          }
          img={"/crayon2_250x141.jpg"}
          buttLabel={"ADD/TAKE PHOTO"}
        />
      </GameSteps>
      <SpriteSheetMaker
        setSpriteData={setSpriteData}
        spriteData={spriteData}
        w={defaultGameState.gameW}
        h={defaultGameState.gameH}
      />
    </div>
  );
};

export default DrawGame;

const IntructionStep = ({ title, description, img, onClick, buttLabel }) => {
  return (
    <StepHolder>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClick}>{buttLabel}</button>
      <img src={img} alt={title} />
    </StepHolder>
  );
};

const GameSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StepHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 300px;

  img {
    border: 1px solid rgba(0, 0, 0, 0.8);
  }
`;
