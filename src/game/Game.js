import React, { useState } from "react";
// import { useInterval } from "../hooks/useInternval";
import styled from "styled-components";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { CallToActionButton } from "../components/CallToActionButton";
import GameControlsRight from "../gameControls/GameControlsRight";
// import CollectionCard from "../collectionCards/CollectionCards";
// import useSound from "use-sound";
import GameControlsLeft from "../gameControls/GameControlsLeft";
import GameScreen from "./GameScreen";
import ScoreBoard from "../scoreboard/ScoreBoard";

const IN_INVINCIBLE_MODE = true;

export const Game = ({ spriteData, onEndGame, windowSize }) => {
  // const [playLoseSound] = useSound("/sounds/zapsplat_impact.mp3", {
  //   volume: 1,
  // });

  console.log("windowSize: ", windowSize);

  const [flyUp, setFlyUp] = useState(false);
  const [diveDown, setDiveDown] = useState(false);
  // const [, setShowCollectionCards] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // TODO - if go away from game and back this resets - move to App maybe
  const [firstGameStarted, setFirstGameStarted] = useState(false);

  const fullScreenHandle = useFullScreenHandle();

  const goUp = () => setFlyUp(true);
  const goDown = () => setDiveDown(true);
  const onPlayPauseToggle = () => setIsPaused((prev) => !prev);
  const replay = () => {
    // setGameState(defaultGameState);
  };
  const onPlay = () => setFirstGameStarted(true);

  // const showGameControls = firstGameStarted && !gameState.gameOver;
  const onCollision = () => {
    if (!IN_INVINCIBLE_MODE) {
      setIsPaused(true);
    }

    // if (gameState.soundOn) {
    //   playLoseSound();
    // }
  };

  const onCloseGame = () => {
    setIsPaused(true);
    // setGameState(defaultGameState);
    onEndGame();
  };

  const leftControlsProps = {
    goUp,
    goDown,
  };

  const rightControlsProps = {
    onEndGame: onCloseGame,
    onPlay,
    replay,
    onPlayPauseToggle,
    isPaused,
    firstGameStarted,
  };

  // const onShowCardsCollected = () => setShowCollectionCards((prev) => !prev);

  return (
    <GameScreenOuter id="GameScreenOuter">
      {spriteData && (
        <FullScreen handle={fullScreenHandle}>
          <ConsoleContainer>
            {!firstGameStarted && (
              <InstructionsPanel>
                <Instructions>
                  <h2>How to Play</h2>
                  <ul>
                    <li>
                      Use the up and down arrows buttons or keyboard arrow to
                      avoid the obstacles.
                    </li>
                    <li>Win points for every obstacle you pass.</li>
                    <li>Complete the full length of Windermere to WIN!</li>
                  </ul>
                  <CallToActionButton onClick={onPlay}>
                    START GAME
                  </CallToActionButton>
                </Instructions>
              </InstructionsPanel>
            )}

            <GameConsole>
              <GameTopBar>
                <ScoreBoard />
              </GameTopBar>
              <MainGamePanel>
                <GameControlsLeft {...leftControlsProps} />

                <GameScreen
                  spriteData={spriteData}
                  firstGameStarted={firstGameStarted}
                  isPaused={isPaused}
                  setFlyUp={setFlyUp}
                  setDiveDown={setDiveDown}
                  flyUp={flyUp}
                  diveDown={diveDown}
                  onCollision={onCollision}
                />

                <GameControlsRight
                  {...rightControlsProps}
                  onFullScreen={fullScreenHandle.enter}
                  fullScreenActive={fullScreenHandle.active}
                  onExitFullScreen={fullScreenHandle.exit}
                />
              </MainGamePanel>

              {/* <GameBottomBar>
                <ScoreBoard />
              </GameBottomBar> */}
            </GameConsole>
          </ConsoleContainer>
        </FullScreen>
      )}

      {/* <button onClick={onShowCardsCollected}>Show Cards Collected</button> */}

      {/* {showCollectionCards && (
        <CollectionCard
          gameItems={gameState.obstacles}
          maxIndexCollected={gameState.maxObstacleIndexCollected}
        />
      )} */}
    </GameScreenOuter>
  );
};

const InstructionsPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  z-index: 100;
  padding: 2%;
`;

const Instructions = styled.div`
  padding: 4% 2%;
  max-width: 600px;
  background-color: whitesmoke;
  margin: auto;
  text-align: center;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

  h2 {
    margin-top: 0;
  }

  ul {
    text-align: left;
    padding-left: 20px;

    li {
      padding-bottom: 10px;
    }
  }
`;

const GameScreenOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const ConsoleContainer = styled.div`
  position: relative;
  margin-top: 1vh;
  max-height: 98vh;
  max-width: 100vw;
  width: 900px;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameConsole = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;

const GameTopBar = styled.div`
  margin-bottom: -15px;

  @media (max-width: 700px) {
    margin-bottom: -5px;
  }
`;

const MainGamePanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  /* background-image: url("/img/bg/linedpaper.png"); */
`;
