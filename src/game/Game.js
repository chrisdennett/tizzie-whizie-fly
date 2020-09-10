import React, { useState } from "react";
// import { useInterval } from "../hooks/useInternval";
import { getNextGameState, defaultGameState } from "./gameState";
import { GameCanvas } from "./GameCanvas";
import { useAnimationFrame } from "../hooks/useAnimationFrame";

export const Game = ({ spriteData, gameState, setGameState }) => {
  const [flyUp, setFlyUp] = useState(false);
  const [diveDown, setDiveDown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // TODO - if go away from game and back this resets - move to App maybe
  const [firstGameStarted, setFirstGameStarted] = useState(false);
  const [tickCount, setTickCount] = useState(0);

  useAnimationFrame((time) => setTickCount((prev) => prev + 1));

  const updateGame = () => {
    if (!spriteData || isPaused || !firstGameStarted) return;

    if (gameState.gameOver) return;

    if (gameState.isJumping) {
      setFlyUp(false);
      setDiveDown(false);
    }

    const nextGameState = getNextGameState(gameState, flyUp, diveDown);
    setGameState(nextGameState);
  };

  React.useEffect(updateGame, [tickCount]); // Make sure the effect runs only once

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

  return (
    <div>
      <GameCanvas
        spriteCanvas={spriteData.canvas}
        gameState={gameState}
        spriteData={spriteData.data}
      />

      {!firstGameStarted && (
        <div>
          <button
            onClick={onPlay}
            onTouchStart={onPlay}
            style={{ cursor: "pointer", padding: 20 }}
          >
            PLAY
          </button>
        </div>
      )}

      {gameState.gameOver && (
        <div>
          <button
            onClick={replay}
            onTouchStart={replay}
            style={{ cursor: "pointer", padding: 20 }}
          >
            REPLAY
          </button>
        </div>
      )}

      {showGameControls && (
        <div>
          <button
            onClick={goUp}
            onTouchStart={goUp}
            style={{ cursor: "pointer", padding: 20 }}
          >
            UP
          </button>
          <button
            onClick={onPlayPauseToggle}
            style={{ cursor: "pointer", padding: 20 }}
          >
            {isPaused ? "PLAY" : "PAUSE"}
          </button>
          <button
            onClick={goDown}
            onTouchStart={goDown}
            style={{ cursor: "pointer", padding: 20 }}
          >
            DIVE
          </button>
        </div>
      )}
    </div>
  );
};
