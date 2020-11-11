import React, { useEffect, useRef } from "react";
import ConfettiCanvas from "react-confetti-canvas";
import styled from "styled-components";
import { drawPlayer } from "../gameLogic/drawGame";

export const WinningHeader = ({ spriteData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("spriteData: ", spriteData);

    if (canvasRef && canvasRef.current && spriteData) {
      const c = canvasRef.current;
      const ctx = c.getContext("2d");
      c.width = 250;
      c.height = 150;
      drawPlayer(
        ctx,
        spriteData.canvas,
        spriteData.data,
        50,
        80,
        1,
        false,
        false
      );
    }
  });

  return (
    <div>
      <ConfettiHolder>
        <ConfettiCanvas />
      </ConfettiHolder>
      <h1>YOU WIN!</h1>
      <h3>
        Congratulations - you flew up the entire lake and collected every single
        card. BOOM!
      </h3>
      <canvas ref={canvasRef} />
    </div>
  );
};

const ConfettiHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
