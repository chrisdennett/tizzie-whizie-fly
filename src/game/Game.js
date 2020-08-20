import React, { useState } from "react";
import { useInterval } from "../hooks/useInternval";
import { drawGame } from "./drawGame";
import { defaultGameState, getNextGameState, spriteData } from "./gameState";

export const Game = ({ spriteSheet }) => {
  const [gameState, setGameState] = useState(defaultGameState);
  const [doJump, setDoJump] = useState(false);

  const gameCanvasRef = React.useRef(null);
  const canvasStyle = { border: "red 1px solid" };

  useInterval(() => {
    const gameCanvas = gameCanvasRef.current;
    if (!gameCanvas) return;

    const nextGameState = getNextGameState(gameState, doJump);
    setGameState(nextGameState);
    drawGame(gameCanvas, gameState, spriteSheet, spriteData);
    setDoJump(false);
  }, 1);

  const jump = () => {
    setDoJump(true);
  };

  return (
    <div onClick={jump} style={{cursor:"pointer"}}>
    <div>do a jump: {doJump}</div>
      <canvas
        ref={gameCanvasRef}
        style={canvasStyle}
        width={gameState.gameW}
        height={gameState.gameH}
      />
    </div>
  );
};
