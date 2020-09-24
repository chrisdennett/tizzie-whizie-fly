import React, { useState } from "react";
import SpriteSheetMaker from "../spriteSheet/SpriteSheetMaker";
import { defaultGameState } from "../game/gameState";
import styled from "styled-components";
import PhotoSelector from "../components/imageInput/PhotoSelector";
import { createMaxSizeCanvas } from "../spriteSheet/helper";

const DrawGame = ({ setSpriteData, spriteData }) => {
  const [sourceImg, setSourceImg] = useState(null);

  const onPrintTemplate = () => {
    console.log("Template");
  };

  const onPhotoSelected = (photo) => {
    setSourceImg(photo);
  };

  const onSampleSelect = (imgName) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      const c = createMaxSizeCanvas(image);
      setSourceImg(c);
    };
    image.src = imgName;
  };

  return (
    <div>
      <GameSteps>
        <StepHolder>
          <h2>1: Print a Template</h2>
          <p>
            Grab yourself a sheet and use paint, pencil, collage, clay, whatever
            you like to create all the bits we need for the game.
          </p>
          <button onClick={onPrintTemplate}>PRINT TEMPLATE</button>
          <img src={"/printable-template_250x177.png"} alt={"game template"} />
        </StepHolder>

        <StepHolder>
          <h2>2: Get your Art On!</h2>
          <p>Once you're finished, take a photo of it to generate your game.</p>

          <PhotoSelector onPhotoSelected={onPhotoSelected}>
            <button>ADD/TAKE PHOTO</button>
          </PhotoSelector>

          <img
            src={"/crayon2_250x141.jpg"}
            alt={"coloured in template sheet"}
          />
        </StepHolder>
      </GameSteps>

      <div>
        <h2>Or play one we made earlier...</h2>
        <div onClick={() => onSampleSelect("crayon2.jpg")}>
          <h3>Crayon Wonder</h3>
          <img
            src={"/crayon2_250x141.jpg"}
            alt={"coloured in template sheet"}
          />
        </div>
      </div>

      <SpriteSheetMaker
        sourceImg={sourceImg}
        setSpriteData={setSpriteData}
        spriteData={spriteData}
        w={defaultGameState.gameW}
        h={defaultGameState.gameH}
      />
    </div>
  );
};

export default DrawGame;

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
