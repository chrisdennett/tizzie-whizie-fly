import React, { useState } from "react";
// import { useInterval } from "../hooks/useInternval";
import styled from "styled-components";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import GameControlsRight from "../gameControls/GameControlsRight";
// import CollectionCard from "../collectionCards/CollectionCards";
// import useSound from "use-sound";
import GameControlsLeft from "../gameControls/GameControlsLeft";
import GameScreen from "./GameScreen";
import ScoreBoard from "../scoreboard/ScoreBoard";

const IN_INVINCIBLE_MODE = true;

export const Game = ({ spriteData, onEndGame }) => {
  console.log("GAME");
  // const [playLoseSound] = useSound("/sounds/zapsplat_impact.mp3", {
  //   volume: 1,
  // });

  const [flyUp, setFlyUp] = useState(false);
  const [diveDown, setDiveDown] = useState(false);
  const [, setShowCollectionCards] = useState(false);
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

  const onShowCardsCollected = () => setShowCollectionCards((prev) => !prev);

  return (
    <div>
      {spriteData && (
        <FullScreen handle={fullScreenHandle}>
          <ConsoleContainer>
            <GameConsole>
              {/* <GameTopBar>
                <ScoreBoard />
              </GameTopBar> */}
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
              <GameBottomBar>
                <ScoreBoard />
              </GameBottomBar>
            </GameConsole>
          </ConsoleContainer>
        </FullScreen>
      )}

      <button onClick={onShowCardsCollected}>Show Cards Collected</button>

      {/* {showCollectionCards && (
        <CollectionCard
          gameItems={gameState.obstacles}
          maxIndexCollected={gameState.maxObstacleIndexCollected}
        />
      )} */}
    </div>
  );
};

const ConsoleContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  max-width: 900px;
  max-height: 550px;
`;

const GameConsole = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;

const GameBottomBar = styled.div`
  flex: 1;
`;

const MainGamePanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  background-image: url("/img/bg/linedpaper.png");
`;
