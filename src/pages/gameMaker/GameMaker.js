import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import PhotoSelector from "../../components/imageInput/PhotoSelector";
import { createMaxSizeCanvas } from "../../spriteSheet/helper";
import {
  generateSpritesheet,
  generateSpritesheetFromScratch,
} from "../../spriteSheet/generateSpritesheet";
import { CreateGameStep } from "./CreateGameStep";
import { CallToActionButton } from "../../components/CallToActionButton";
import { SampleCard, SampleCards } from "./SampleCard";
import styled from "styled-components";
import { MdPhotoCamera } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";

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
    <Container>
      <h1>Get making!</h1>
      {!showGameCreateStep && (
        <div>
          <Section>
            <h4>Create your own...</h4>
            <ol>
              <li>
                Print the{" "}
                <CallToActionButton href={"/tizzie-fly-template.pdf"}>
                  Template
                </CallToActionButton>
              </li>
              <li>Paint or decorate however you like.</li>
              <li>
                {isMobile && (
                  <>
                    <PhotoSelector
                      setPhotoCanvas={setPhotoCanvas}
                      photoCanvas={photoCanvas}
                    >
                      <MdPhotoCamera /> <span>Snap</span>
                    </PhotoSelector>
                    or{" "}
                  </>
                )}
                {!isMobile && <>Snap and </>}
                <PhotoSelector
                  setPhotoCanvas={setPhotoCanvas}
                  photoCanvas={photoCanvas}
                  isFileSelector={true}
                >
                  <FaRegImages /> <span>Select</span>
                </PhotoSelector>
                your finished sheet.
              </li>
            </ol>
          </Section>

          <Section>
            <h4>Or try on one of these beauties...</h4>
            <p>[Add artwork from the sixth formers here...]</p>

            <SampleCards>
              <SampleCard
                onSelect={onSampleSelect}
                img={"tizzie-crayon.jpg"}
                thumb={"tizzie-crayon_250x141.jpg"}
                label={"Crayon Wonder"}
                details={"by me!"}
              />
              <SampleCard
                onSelect={onSampleSelect}
                img={"extreme.jpg"}
                thumb={"extreme_250x141.jpg"}
                label={"Extreme Test"}
                details={"by A.Bad Photographer"}
              />
            </SampleCards>
          </Section>

          <Section>
            <h3>Tips:</h3>
            <p>
              <b>Just keep clear of those weird corner bits</b>. Those need to
              be clearly visible for the magic to happen!
            </p>
          </Section>
        </div>
      )}

      {showGameCreateStep && (
        <div>
          <h4>Make the game...</h4>
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
  border-top: 1px solid rgba(0, 0, 0, 0.2);
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
