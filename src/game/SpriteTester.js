import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";
import { drawPlayer } from "../gameLogic/drawGame";

const SpriteTester = ({ spriteData }) => {
  const [count, setCount] = useState(0);
  const [isDiving, setIsDiving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  const maskedCanvasRef = useRef(null);
  const spriteCanvasRef = useRef(null);
  const unwarpedCanvasRef = useRef(null);
  const sourceCanvasRef = useRef(null);

  useInterval(() => setCount((prev) => prev + 1));

  useEffect(() => {
    if (
      unwarpedCanvasRef &&
      unwarpedCanvasRef.current &&
      spriteData &&
      spriteData.unwarpedCanvas
    ) {
      // SOURCE
      const srcCanvas = sourceCanvasRef.current;
      const srcCtx = srcCanvas.getContext("2d");
      srcCanvas.width = spriteData.sourceCanvas.width;
      srcCanvas.height = spriteData.sourceCanvas.height;
      srcCtx.drawImage(spriteData.sourceCanvas, 0, 0);

      // UNWARPED CANVAS
      const artCanvas = unwarpedCanvasRef.current;
      artCanvas.width = spriteData.unwarpedCanvas.width;
      artCanvas.height = spriteData.unwarpedCanvas.height;
      const ctx = artCanvas.getContext("2d");
      ctx.drawImage(spriteData.unwarpedCanvas, 0, 0);

      // SPRITE CANVAS
      const spriteCanvas = spriteCanvasRef.current;
      spriteCanvas.width = spriteData.canvas.width;
      spriteCanvas.height = spriteData.canvas.height;
      const ctx3 = spriteCanvas.getContext("2d");
      ctx3.drawImage(spriteData.canvas, 0, 0);
    }
  }, [spriteData, isJumping, isDiving]);

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
      <canvas ref={maskedCanvasRef} />
      <canvas ref={spriteCanvasRef} />
      <canvas ref={unwarpedCanvasRef} />
      <canvas ref={sourceCanvasRef} />
    </div>
  );
};

export default SpriteTester;
