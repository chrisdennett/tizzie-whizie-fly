import React, { useState } from "react";
import styled from "styled-components";
import GameControlsRight from "./gameControls/GameControlsRight";
// import CollectionCard from "../collectionCards/CollectionCards";
// import useSound from "use-sound";

import GameControlsLeft from "./gameControls/GameControlsLeft";
import GameScreen from "./GameScreen";
import GameInstructions from "./GameInstructions";
import { defaultGameState } from "./gameLogic/gameState";

export const Game = ({
  spriteData,
  onCloseGame,
  windowSize,
  onGameOver,
  AUTO_PLAY_GAME,
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

  // const [endState, setEndState] = useState(defaultGameState);
  const [showInstructions, setShowInstructions] = useState(!AUTO_PLAY_GAME);
  const [isPaused, setIsPaused] = useState(!AUTO_PLAY_GAME);
  // TODO - if go away from game and back this resets - move to App maybe

  const goUp = () => setFlyUp(true);
  const goDown = () => setDiveDown(true);
  const onPlayPauseToggle = () => setIsPaused((prev) => !prev);
  const replay = () => {
    // setGameState(defaultGameState);
  };

  const onCollision = (gameState) => {
    if (!IN_INVINCIBLE_MODE) {
      onGameOver(gameState);
      setIsPaused(true);
    }

    // if (gameState.soundOn) {
    //   playLoseSound();
    // }
  };

  const onPauseAndCloseGame = () => {
    setIsPaused(true);
    // setGameState(defaultGameState);
    onCloseGame();
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
    goDown,
  };

  const rightControlsProps = {
    onEndGame: onPauseAndCloseGame,
    replay,
    onPlayPauseToggle,
    isPaused,
    onHelp: onHelp,
  };

  const outerStyle =
    windowSize.width > 0
      ? { maxWidth: windowSize.width, maxHeight: windowSize.height - 10 }
      : {};

  const onReplay = () => {
    onGameOver(defaultGameState);
    setShowInstructions(true);
  };

  return (
    <GameScreenOuter id="GameScreenOuter" style={outerStyle}>
      {spriteData && (
        <>
          {showInstructions && (
            <GameInstructions
              onPlay={onPlay}
              onHelp={onHelp}
              onCloseGame={onCloseGame}
            />
          )}

          {showPortraitMode && (
            <GameControlsRight {...rightControlsProps} showAsRow={true} />
          )}

          <MainGamePanel showPortraitMode={showPortraitMode}>
            <GameControlsLeft
              {...leftControlsProps}
              showAsRow={showPortraitMode}
            />

            <GameScreen
              spriteData={spriteData}
              isPaused={isPaused}
              onGameOver={onGameOver}
              onReplay={onReplay}
              setFlyUp={setFlyUp}
              setDiveDown={setDiveDown}
              flyUp={flyUp}
              diveDown={diveDown}
              onCollision={onCollision}
            />

            {!showPortraitMode && (
              <GameControlsRight {...rightControlsProps} showAsRow={false} />
            )}
          </MainGamePanel>
        </>
      )}
    </GameScreenOuter>
  );
};

const GameScreenOuter = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
`;

const MainGamePanel = styled.div`
  /* position: relative; */
  display: flex;
  max-width: 100%;
  flex-direction: ${(props) =>
    props.showPortraitMode ? "column-reverse" : "row"};
`;
