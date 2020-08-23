import React, { useState, useEffect } from "react";
import { useInterval } from "../hooks/useInternval";
import { drawGame } from "./drawGame";
import { defaultGameState, getNextGameState, spriteData } from "./gameState";

export const Game = ({ spriteCanvas }) => {
  const [gameState, setGameState] = useState(defaultGameState);
  const [preCanvas, setPreCanvas] = useState(null);
  const [spritesheetMask, setSpritesheetMask] = useState(null);
  const [maskedSpritesheet, setMaskedSpritesheet] = useState(null);
  const [doJump, setDoJump] = useState(false);

  const gameCanvasRef = React.useRef(null);
  const canvasStyle = { border: "red 1px solid" };

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      console.log("image: ", image);
      setSpritesheetMask(image);
    };

    image.src = "./spritesheet-mask.png";
  }, []);

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
      if (spritesheetMask && !maskedSpritesheet) {
        // create masked spritesheet
        const alphaCanvas = drawAlphaCanvas(gameState.gameW, gameState.gameH);
        const alphaCtx = alphaCanvas.getContext("2d");
        alphaCtx.drawImage(spritesheetMask, 0, 0);
        alphaCtx.globalCompositeOperation = "source-in";
        alphaCtx.drawImage(preCanvas, 0, 0);
        setMaskedSpritesheet(alphaCanvas);
      } else if (maskedSpritesheet) {
        const nextGameState = getNextGameState(gameState, doJump);
        setGameState(nextGameState);
        drawGame(gameCanvas, gameState, maskedSpritesheet, spriteData);
        setDoJump(false);
      }
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

function drawAlphaCanvas(w, h) {
  const outCanvas = document.createElement("canvas");
  outCanvas.width = w;
  outCanvas.height = h;
  const ctx = outCanvas.getContext("2d");

  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, w, h);

  return outCanvas;
}
