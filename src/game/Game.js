import React, { useState } from "react";
// import { useInterval } from "../hooks/useInternval";
import styled from "styled-components";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { getNextGameState, defaultGameState } from "./gameState";
import { GameCanvas } from "./GameCanvas";
import { Map } from "./Map";
import GameControls from "./GameControls";
import CollectionCard from "../collectionCards/CollectionCards";

export const Game = ({ spriteData, gameState, setGameState, IN_TEST_MODE }) => {
  const [flyUp, setFlyUp] = useState(false);
  const [diveDown, setDiveDown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // TODO - if go away from game and back this resets - move to App maybe
  const [firstGameStarted, setFirstGameStarted] = useState(false);
  const [tickCount, setTickCount] = useState(0);

  useAnimationFrame(() => setTickCount((prev) => prev + 1));

  const updateGame = () => {
    if (!spriteData || isPaused || !firstGameStarted) return;

    if (gameState.gameOver) return;

    if (gameState.isMoving) {
      setFlyUp(false);
      setDiveDown(false);
    }

    const nextGameState = getNextGameState(
      gameState,
      flyUp,
      diveDown,
      tickCount
    );
    setGameState(nextGameState);
  };

  React.useEffect(updateGame, [tickCount]);

  const goUp = () => {
    setFlyUp(true);
  };

  const goDown = () => {
    setDiveDown(true);
  };

  const onPlayPauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  const replay = () => {
    setGameState(defaultGameState);
  };

  const onPlay = () => {
    setFirstGameStarted(true);
  };

  const showGameControls = firstGameStarted && !gameState.gameOver;
  const onCollision = () => {
    setIsPaused(true);
  };

  const controlsProps = {
    gameState,
    showGameControls,
    onPlay,
    replay,
    onPlayPauseToggle,
    goUp,
    goDown,
    isPaused,
    firstGameStarted,
  };

  return (
    <div>
      {spriteData && (
        <GamePanel>
          <GameCanvas
            IN_TEST_MODE={IN_TEST_MODE}
            onCollision={onCollision}
            spriteCanvas={spriteData.canvas}
            gameState={gameState}
            spriteData={spriteData.data}
          />

          <div>
            <GameControls {...controlsProps} />
          </div>

          <Map progress={gameState.progress} />

          <CollectionCard />
        </GamePanel>
      )}
    </div>
  );
};

const GamePanel = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 800px;
  max-width: 100%;
`;
