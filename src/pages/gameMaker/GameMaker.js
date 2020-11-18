import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import PhotoSelector from "../../components/imageInput/PhotoSelector";
import { createMaxSizeCanvas } from "./spriteSheet/helper";
import {
  generateSpritesheet,
  generateSpritesheetFromScratch,
} from "./spriteSheet/generateSpritesheet";
import { CreateGameStep } from "./CreateGameStep";
import { CallToActionButton } from "../../components/CallToActionButton";
import { SampleCard, SampleCards } from "./SampleCard";
import styled from "styled-components";
import { MdPhotoCamera } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";
// import { Machine } from "../../components/Machine";
import PreviewCanvas from "./PreviewCanvas";

const IN_LOCAL_TEST_MODE = false;

const GameMaker = ({
  spriteData,
  setSpriteData,
  setShowGame,
  IN_TEST_MODE,
}) => {
  const [photoCanvas, setPhotoCanvas] = useState(null);
  const [spritesheetMask, setSpritesheetMask] = useState(null);

  // load mask
  useEffect(() => {
    if (!spritesheetMask) {
      loadImage("./spritesheet-1-mask.png", setSpritesheetMask);
    }
    // FOR TESTING - LOAD SAMPLE IMMEDIATELY
    else if (IN_TEST_MODE || IN_LOCAL_TEST_MODE) {
      // loadImage("./tizzie-full-colour.jpg", setPhotoCanvas, true);
      loadImage("./filled-in-sheet.png", createSpritesheet, true);
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
    <Container>
      {!showGameCreateStep && (
        <div>
          <Section>
            <h4>Create your own...</h4>
            <p>
              Print a template, paint or decorate however you like, then add a
              photo of your sheet to the Game Maker 3000.
            </p>

            <PreviewCanvas
              firstInput={
                <CallToActionButton href={"/tizzie-fly-template.pdf"}>
                  Print
                </CallToActionButton>
              }
              secondInput={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {isMobile && (
                    <>
                      <PhotoSelector
                        setPhotoCanvas={setPhotoCanvas}
                        photoCanvas={photoCanvas}
                      >
                        <MdPhotoCamera />
                      </PhotoSelector>
                      or{" "}
                    </>
                  )}

                  <PhotoSelector
                    setPhotoCanvas={setPhotoCanvas}
                    photoCanvas={photoCanvas}
                    isFileSelector={true}
                  >
                    <FaRegImages /> <span>Add</span>
                  </PhotoSelector>
                </div>
              }
            />
          </Section>

          <Section>
            <h4>Or try on one of these beauties...</h4>
            <p>[Add artwork from the sixth formers here...]</p>

            <SampleCards>
              <SampleCard
                onSelect={onSampleSelect}
                img={"jennie-inkpen.jpg"}
                thumb={"jennie-inkpen_250x141.jpg"}
                label={"Fine Fineliner"}
                details={"by Jennie"}
              />
              <SampleCard
                onSelect={onSampleSelect}
                img={"jennie-paint.jpg"}
                thumb={"jennie-paint_250x141.jpg"}
                label={"Fine Fineliner"}
                details={"by Jennie"}
              />
              <SampleCard
                onSelect={onSampleSelect}
                img={"tizzie-full-colour-enhanced.jpg"}
                thumb={"tizzie-full-colour_250x141.jpg"}
                label={"Crayon Wonder"}
                details={"by me!"}
              />
              <SampleCard
                onSelect={onSampleSelect}
                img={"extreme2.jpg"}
                thumb={"extreme2_250x141.jpg"}
                label={"Extreme Test"}
                details={"by A.Bad Photographer"}
              />
            </SampleCards>
          </Section>
        </div>
      )}

      {showGameCreateStep && (
        <div>
          <CreateGameStep
            onChangePhoto={onChangePhoto}
            photoCanvas={photoCanvas}
            spriteData={spriteData}
            onCreateGame={onCreateGame}
            setShowGame={setShowGame}
          />
        </div>
      )}
    </Container>
  );
};

export default GameMaker;

const Container = styled.div`
  h1 {
    margin: 0 0 30px 0;
  }
  h4 {
    margin: 0 0 10px 0;
  }

  p {
    margin: 5px 0;
  }

  ol {
    li {
      padding-bottom: 10px;
    }
  }
`;

const Section = styled.div`
  /* border-top: 1px solid rgba(0, 0, 0, 0.2); */
  padding-top: 25px;
  margin: 0 0 25px 0;
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
