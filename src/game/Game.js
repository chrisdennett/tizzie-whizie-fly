import React, { useState } from "react";
import { useInterval } from "../hooks/useInternval";
import { getNextGameState, spriteData } from "./gameState";
import { GameCanvas } from "./GameCanvas";

export const Game = ({ spriteCanvas, gameState, setGameState }) => {
  const [doJump, setDoJump] = useState(false);

  useInterval(() => {
    if (!spriteCanvas) return;

    if (gameState.isJumping) setDoJump(false);

    const nextGameState = getNextGameState(gameState, doJump);
    setGameState(nextGameState);
  }, 1);

  const jump = () => {
    setDoJump(true);
  };

  return (
    <div>
      <GameCanvas
        spriteCanvas={spriteCanvas}
        gameState={gameState}
        spriteData={spriteData}
      />
      <div>
        <button onClick={jump} style={{ cursor: "pointer", padding: 20 }}>
          Jump
        </button>
      </div>
    </div>
  );
};
