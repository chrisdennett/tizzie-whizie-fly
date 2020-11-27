import React, { useEffect, useRef } from "react";
import Confetti from "react-confetti";
// import ConfettiCanvas from "react-confetti-canvas";
import styled from "styled-components";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { drawPlayer } from "../gameLogic/drawGame";

export const WinningHeader = ({ spriteData }) => {
  const { width, height } = useWindowSize();
  const canvasRef = useRef(null);

  useEffect(() => {
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
    <Container>
      <ConfettiHolder>
        {/* <ConfettiCanvas /> */}
        <Confetti width={width} height={height} />
      </ConfettiHolder>
      <h1>YOU WIN!</h1>
      <h3>
        Congratulations - you flew up the entire lake and collected every single
        card. BOOM!
      </h3>
      <canvas ref={canvasRef} />
    </Container>
  );
};

const Container = styled.div`
  h3 {
    font-weight: normal;
  }
`;

const ConfettiHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
