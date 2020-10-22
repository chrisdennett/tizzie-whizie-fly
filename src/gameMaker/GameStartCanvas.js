import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";
import { drawPlayer } from "../gameLogic/drawGame";

const GameStartCanvas = ({ spriteData }) => {
  const [count, setCount] = useState(0);

  const maskedCanvasRef = useRef(null);

  useInterval(() => setCount((prev) => prev + 1));

  useEffect(() => {
    if (
      maskedCanvasRef &&
      maskedCanvasRef.current &&
      spriteData &&
      spriteData.canvas
    ) {
      const previewCanvas = maskedCanvasRef.current;
      previewCanvas.width = 250;
      previewCanvas.height = 150;
      const ctx = previewCanvas.getContext("2d");
      drawPlayer(ctx, spriteData.canvas, spriteData.data, 50, 80, count);
    }
  }, [count, spriteData]);

  return (
    <div>
      <canvas ref={maskedCanvasRef} />
    </div>
  );
};

export default GameStartCanvas;
