import React, { useState } from "react";
import { useInterval } from "../hooks/useInternval";
import { getNextGameState, defaultGameState } from "./gameState";
import { GameCanvas } from "./GameCanvas";

export const Game = ({ spriteData, gameState, setGameState }) => {
  const [flyUp, setFlyUp] = useState(false);
  const [diveDown, setDiveDown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useInterval(() => {
    if (!spriteData || isPaused) return;

    if (gameState.gameOver) return;

    if (gameState.isJumping) {
      setFlyUp(false);
      setDiveDown(false);
    }

    const nextGameState = getNextGameState(gameState, flyUp, diveDown);
    setGameState(nextGameState);
  }, 1);

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

  return (
    <div>
      <h1>
        {gameState.gameTick} of {gameState.duration}, progress:{" "}
        {gameState.progress}
      </h1>
      <GameCanvas
        spriteCanvas={spriteData.canvas}
        gameState={gameState}
        spriteData={spriteData.data}
      />

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

      {!gameState.gameOver && (
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
