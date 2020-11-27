import React, { useState } from "react";
import styled from "styled-components";
import GameControlsRight from "./gameControls/GameControlsRight";
import { useKeyboardBindings } from "../../hooks/useKeyboardBindings";
import GameControlsLeft from "./gameControls/GameControlsLeft";
import GameScreen from "./GameScreen";
import GameInstructions from "./GameInstructions";
import { StartGameModal } from "./StartGameModal";
import { EndGameModal } from "./EndGameModal";

export const Game = ({
  spriteData,
  onCloseGame,
  setEndState,
  windowSize,
  showEndScreen,
  onResetGame,
  AUTO_PLAY_GAME,
  IN_INVINCIBLE_MODE,
}) => {
  const [flyUp, setFlyUp] = useState(false);
  const [diveDown, setDiveDown] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showGameModal, setShowGameModal] = useState("start");
  const [isPaused, setIsPaused] = useState(!AUTO_PLAY_GAME);

  useKeyboardBindings({
    ArrowUp: () => goUp(),
    ArrowDown: () => goDown(),
    Enter: () => {
      if (showInstructions) {
        onPlay();
      }
    },
  });

  const showPortraitMode =
    windowSize.width < windowSize.height && windowSize.width < 600;

  const goUp = () => setFlyUp(true);
  const goDown = () => setDiveDown(true);
  const onPlayPauseToggle = () => setIsPaused((prev) => !prev);

  const onCollision = (gameState) => {
    if (!IN_INVINCIBLE_MODE) {
      setEndState(gameState);
      setIsPaused(true);
      setShowGameModal("replay");
    }
  };

  const onPauseAndCloseGame = () => {
    setIsPaused(true);
    onCloseGame();
  };

  const onHelp = () => {
    setIsPaused(true);
    setShowInstructions(true);
  };
  const onPlay = () => {
    setIsPaused(false);
    setShowGameModal("false");
    setShowInstructions(false);
  };

  const leftControlsProps = {
    goUp,
    goDown,
  };

  const rightControlsProps = {
    onEndGame: onPauseAndCloseGame,
    onPlayPauseToggle,
    isPaused,
    onHelp: onHelp,
  };

  const outerStyle =
    windowSize.width > 0
      ? { maxWidth: windowSize.width, maxHeight: windowSize.height - 10 }
      : {};

  const onReplay = () => {
    onResetGame();
    setShowGameModal("start");
  };

  const onSeeScoreCard = () => {
    showEndScreen();
  };

  return (
    <GameScreenOuter id="GameScreenOuter" style={outerStyle}>
      {spriteData && (
        <>
          {showGameModal === "start" && isPaused && (
            <StartGameModal onStart={onPlay} />
          )}

          {showGameModal === "replay" && isPaused && (
            <EndGameModal onReplay={onReplay} onSeeScoreCard={onSeeScoreCard} />
          )}

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

          {showGameModal !== "start" && (
            <MainGamePanel showPortraitMode={showPortraitMode}>
              <GameControlsLeft
                {...leftControlsProps}
                showAsRow={showPortraitMode}
              />

              <GameScreen
                spriteData={spriteData}
                isPaused={isPaused}
                showEndScreen={showEndScreen}
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
          )}
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
