import React, { useRef, useEffect } from "react";
import { drawPlayer } from "../game/gameLogic/drawGame";
import styled from "styled-components";

const GameStartCanvas = ({ spriteData }) => {
  const maskedCanvasRef = useRef(null);

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

      const { x, y, w, h } = spriteData.data.title;

      // Draw title
      ctx.drawImage(spriteData.canvas, x, y, w, h, 10, 20, w * 0.65, h * 0.65);

      // Draw Tizzy
      drawPlayer(ctx, spriteData.canvas, spriteData.data, 100, 180);
    }
  });

  return (
    <CanvasHolder>
      <StyledCanvas ref={maskedCanvasRef} />
    </CanvasHolder>
  );
};

export default GameStartCanvas;

const StyledCanvas = styled.canvas`
  width: 100%;
  max-width: 450px;
  /* background-color: rgba(255, 255, 255, 0.9); */
  /* border: 1px solid black; */
  /* border-radius: 3px; */
`;

const CanvasHolder = styled.div`
  text-align: center;
  /* background-color: rgba(255, 255, 255, 0.9); */
  /* border: 1px solid black;
  border-radius: 3px;
  padding: 20px; */
`;
