import React, { useState } from "react";
import styled from "styled-components";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import GameControlsRight from "./gameControls/GameControlsRight";
// import CollectionCard from "../collectionCards/CollectionCards";
// import useSound from "use-sound";

import GameControlsLeft from "./gameControls/GameControlsLeft";
import GameScreen from "./GameScreen";
import ScoreBoard from "./scoreboard/ScoreBoard";
import GameInstructions from "./GameInstructions";

export const Game = ({
  spriteData,
  onEndGame,
  windowSize,
  IN_INVINCIBLE_MODE,
}) => {
  // const [playLoseSound] = useSound("/sounds/zapsplat_impact.mp3", {
  //   volume: 1,
  // });

  const showPortraitMode =
    windowSize.width < windowSize.height && windowSize.width < 600;

  const [flyUp, setFlyUp] = useState(false);
  const [diveDown, setDiveDown] = useState(false);
  // const [, setShowCollectionCards] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  // TODO - if go away from game and back this resets - move to App maybe

  const fullScreenHandle = useFullScreenHandle();

  const goUp = () => setFlyUp(true);
  const goDown = () => setDiveDown(true);
  const onPlayPauseToggle = () => setIsPaused((prev) => !prev);
  const replay = () => {
    // setGameState(defaultGameState);
  };

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

  // const onShowCardsCollected = () => setShowCollectionCards((prev) => !prev);

  const onHelp = () => {
    setIsPaused(true);
    setShowInstructions(true);
  };
  const onPlay = () => {
    setIsPaused(false);
    setShowInstructions(false);
  };

  const leftControlsProps = {
    goUp,
    goDown
  };

  const rightControlsProps = {
    onEndGame: onCloseGame,
    replay,
    onPlayPauseToggle,
    isPaused,
    onHelp: onHelp
  };

  return (
    <GameScreenOuter
      id="GameScreenOuter"
      style={{ maxWidth: windowSize.width, maxHeight: windowSize.height - 10 }}
    >
      {spriteData && (
        <FullScreen handle={fullScreenHandle}>
          {showInstructions && (
            <GameInstructions
              onPlay={onPlay}
              onHelp={onHelp}
              onCloseGame={onCloseGame}
              onFullScreen={fullScreenHandle.enter}
              fullScreenActive={fullScreenHandle.active}
              onExitFullScreen={fullScreenHandle.exit}
            />
          )}

          {showPortraitMode && (
            <GameControlsRight
              {...rightControlsProps}
              onFullScreen={fullScreenHandle.enter}
              fullScreenActive={fullScreenHandle.active}
              onExitFullScreen={fullScreenHandle.exit}
              showAsRow={true}
            />
          )}

          <GameTopBar>
            <ScoreBoard hideIcons={windowSize.width < 400} />
          </GameTopBar>
          <MainGamePanel showPortraitMode={showPortraitMode}>
            <GameControlsLeft
              {...leftControlsProps}
              showAsRow={showPortraitMode}
            />

            <GameScreen
              spriteData={spriteData}
              isPaused={isPaused}
              setFlyUp={setFlyUp}
              setDiveDown={setDiveDown}
              flyUp={flyUp}
              diveDown={diveDown}
              onCollision={onCollision}
            />

            {!showPortraitMode && (
              <GameControlsRight
                {...rightControlsProps}
                onFullScreen={fullScreenHandle.enter}
                fullScreenActive={fullScreenHandle.active}
                onExitFullScreen={fullScreenHandle.exit}
                showAsRow={false}
              />
            )}
          </MainGamePanel>
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

const GameScreenOuter = styled.div`
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
`;

const GameTopBar = styled.div`
  margin-bottom: -15px;

  @media (max-width: 700px) {
    margin-bottom: -5px;
  }
`;

const MainGamePanel = styled.div`
  /* position: relative; */
  display: flex;
  max-width: 100%;
  flex-direction: ${(props) =>
    props.showPortraitMode ? "column-reverse" : "row"};
`;
