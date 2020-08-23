import React, { useState } from "react";
import { useInterval } from "../hooks/useInternval";
import { drawGame } from "./drawGame";
import { getNextGameState, spriteData } from "./gameState";

export const Game = ({ spriteCanvas, gameState, setGameState }) => {
  const [doJump, setDoJump] = useState(false);

  const gameCanvasRef = React.useRef(null);
  const canvasStyle = { border: "red 1px solid" };

  useInterval(() => {
    const gameCanvas = gameCanvasRef.current;
    if (!gameCanvas || !spriteCanvas) return;

    const nextGameState = getNextGameState(gameState, doJump);
    setGameState(nextGameState);
    drawGame(gameCanvas, gameState, spriteCanvas, spriteData);
    setDoJump(false);
  }, 1);

  const jump = () => {
    setDoJump(true);
  };

  return (
    <div>
      <canvas
        ref={gameCanvasRef}
        style={canvasStyle}
        width={gameState.gameW}
        height={gameState.gameH}
      />
      <div>
        <button onClick={jump} style={{ cursor: "pointer" }}>
          Jump
        </button>
      </div>
    </div>
  );
};
