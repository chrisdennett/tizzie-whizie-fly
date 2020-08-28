import React, { useState } from "react";
import { useInterval } from "../hooks/useInternval";
import { getNextGameState, spriteData } from "./gameState";
import { GameCanvas } from "./GameCanvas";

export const Game = ({ spriteCanvas, gameState, setGameState }) => {
  const [flyUp, setFlyUp] = useState(false);
  const [diveDown, setDiveDown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useInterval(() => {
    if (!spriteCanvas || isPaused) return;

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

  return (
    <div>
      <GameCanvas
        spriteCanvas={spriteCanvas}
        gameState={gameState}
        spriteData={spriteData}
      />
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
    </div>
  );
};
