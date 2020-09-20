import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "../hooks/useInternval";
import { drawPlayer } from "../game/drawGame";

const SpriteTester = ({ spriteData }) => {
  const [count, setCount] = useState(0);
  const [isDiving, setIsDiving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

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
      previewCanvas.width = 200;
      previewCanvas.height = 150;
      const ctx = previewCanvas.getContext("2d");
      drawPlayer(
        ctx,
        spriteData.canvas,
        spriteData.data,
        50,
        80,
        count,
        isJumping,
        isDiving
      );
    }
  }, [count, spriteData, isJumping, isDiving]);

  const onDiveClick = () => {
    setIsDiving(true);
    setIsJumping(false);
  };

  const onNormClick = () => {
    setIsDiving(false);
    setIsJumping(false);
  };

  const onFlyClick = () => {
    setIsDiving(false);
    setIsJumping(true);
  };

  return (
    <div>
      <h1>
        <button onClick={onFlyClick}>JUMP</button>
        <button onClick={onNormClick}>NORMAL</button>
        <button onClick={onDiveClick}>DIVE</button>
      </h1>
      <canvas ref={maskedCanvasRef} style={{ border: "red 1px solid" }} />
    </div>
  );
};

export default SpriteTester;
