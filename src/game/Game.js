import React, { useState } from "react";
import { useInterval } from "../hooks/useInternval";
import { drawGame } from "./drawGame";
import { defaultGameState, getNextGameState, spriteData } from "./gameState";

export const Game = ({ spriteCanvas }) => {
  const [gameState, setGameState] = useState(defaultGameState);
  const [preCanvas, setPreCanvas] = useState(null);
  const [doJump, setDoJump] = useState(false);

  const gameCanvasRef = React.useRef(null);
  const canvasStyle = { border: "red 1px solid" };

  useInterval(() => {
    const gameCanvas = gameCanvasRef.current;
    if (!gameCanvas || !spriteCanvas) return;

    if (!preCanvas) {
      const pc = drawPreGameCanvas(
        spriteCanvas,
        gameState.gameW,
        gameState.gameH
      );
      setPreCanvas(pc);
    } else {
      const nextGameState = getNextGameState(gameState, doJump);
      setGameState(nextGameState);
      drawGame(gameCanvas, gameState, preCanvas, spriteData);
      setDoJump(false);
    }
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

function drawPreGameCanvas(sourceCanvas, w, h) {
  const outCanvas = document.createElement("canvas");
  outCanvas.width = w;
  outCanvas.height = h;
  const ctx = outCanvas.getContext("2d");

  ctx.drawImage(sourceCanvas, 0, 0);

  return outCanvas;
}
