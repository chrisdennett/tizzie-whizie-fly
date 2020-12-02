import React, { useRef, useEffect } from "react";
import { drawPlayer } from "../game/gameLogic/drawGame";
import styled from "styled-components";
import { motion } from "framer-motion";

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
      previewCanvas.width = 700;
      previewCanvas.height = 300;
      const ctx = previewCanvas.getContext("2d");

      const { x, y, w, h } = spriteData.data.title;

      const titleY = 50;
      const titleScale = 0.75;

      // Draw title
      ctx.drawImage(
        spriteData.canvas,
        x,
        y,
        w,
        h,
        100,
        titleY,
        w * titleScale,
        h * titleScale
      );
      ctx.drawImage(
        spriteData.canvas,
        x,
        y,
        160,
        h,
        450,
        titleY,
        160 * titleScale,
        h * titleScale
      );

      // Draw Tizzy
      drawPlayer(ctx, spriteData.canvas, spriteData.data, 100, 180);
    }
  });

  return (
    <CanvasHolder
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StyledCanvas ref={maskedCanvasRef} />
    </CanvasHolder>
  );
};

export default GameStartCanvas;

const StyledCanvas = styled.canvas`
  /* width: 100%; */
  /* background-color: rgba(255, 255, 255, 0.9); */
  /* border: 1px solid black; */
  border-radius: 31px;
  background-image: url("/img/bg/linedpaper.png");
`;

const CanvasHolder = styled(motion.div)`
  text-align: center;
  /* background-color: rgba(255, 255, 255, 0.9); */
  /* border: 1px solid black;
  border-radius: 3px;
  padding: 20px; */
`;
