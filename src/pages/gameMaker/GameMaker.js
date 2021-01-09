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
import { RivotBar } from "../../components/RivotBar";
import { artistData } from "../../artistData";

const IN_LOCAL_TEST_MODE = false;

const GameMaker = ({
  spriteData,
  setSpriteData,
  setShowGame,
  IN_TEST_MODE,
}) => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setSpriteData(null);
    setPhotoCanvas(null);
    loadImage(
      imgName,
      (canvas) => {
        setPhotoCanvas(canvas);
        setIsLoading(false);
      },
      true
    );

    try {
      window.scroll({
        top: 145,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  };

  const onChangePhoto = () => {
    setSpriteData(null);
    setPhotoCanvas(null);
  };

  const showGameCreateStep = spriteData !== null || photoCanvas !== null;

  return (
    <Container>
      <p>
        Print a template, paint or decorate however you like, then add a photo
        of your sheet to the Game Maker 3000.
      </p>

      {!showGameCreateStep && (
        <div>
          <Section>
            <PreviewCanvas
              isLoading={isLoading}
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

      <ExamplesOuter>
        <ExamplesContent>
          <h4>Or try one created by local artists to see how it works...</h4>

          <SampleCards>
            {artistData.map((artist) => (
              <SampleCard
                key={artist.img}
                onSelect={onSampleSelect}
                artist={artist}
              />
            ))}
          </SampleCards>
        </ExamplesContent>
      </ExamplesOuter>
      <RivotBar />
    </Container>
  );
};

export default GameMaker;

const ExamplesOuter = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  margin: 0 10px;
  padding: 15px;
  text-align: center;
  border-left: 2px solid black;
  border-right: 2px solid black;
`;

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
  margin: 0;
  padding: 0;
`;

const ExamplesContent = styled.div`
  //background: url("./img/bg/redox_01-min.png");
  background: #ffedb9b0;
  box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.4);
  border-radius: 31px;
  padding: 0 0 40px 0;
  border: 2px solid black;

  h4 {
    padding: 30px 10px 20px 10px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.7);
    margin: 0;
  }
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
