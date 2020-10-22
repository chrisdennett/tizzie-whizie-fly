import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";
import { drawPlayer, drawSprite } from "../gameLogic/drawGame";
import styled from "styled-components";

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
      previewCanvas.width = 500;
      previewCanvas.height = 170;
      const ctx = previewCanvas.getContext("2d");
      drawSprite(
        ctx,
        spriteData.canvas,
        spriteData.data.title,
        10,
        10,
        true,
        0.6
      );
      drawPlayer(ctx, spriteData.canvas, spriteData.data, 70, 180, count);
    }
  }, [count, spriteData]);

  return (
    <CanvasHolder>
      <canvas ref={maskedCanvasRef} />
    </CanvasHolder>
  );
};

export default GameStartCanvas;

const CanvasHolder = styled.div`
  text-align: center;
`;
