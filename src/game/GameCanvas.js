import React from "react";
import styled from "styled-components";
import { drawGame } from "../gameLogic/drawGame";
import { GameOutline } from "./GameOutline";

export const GameCanvas = ({
  spriteCanvas,
  gameState,
  spriteData,
  onCollision,
}) => {
  const gameCanvasRef = React.useRef(null);

  React.useEffect(() => {
    const gameCanvas = gameCanvasRef.current;
    if (!gameCanvas || !spriteCanvas) return null;
    drawGame(gameCanvas, gameState, spriteCanvas, spriteData, onCollision);

    // eslint-disable-next-line
  }, [spriteCanvas, gameState, spriteData]);

  return (
    <Container>
      <GameOutline />

      <StyledCanvas
        ref={gameCanvasRef}
        width={gameState.gameW - 270}
        height={gameState.gameH - 250}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const StyledCanvas = styled.canvas`
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  border-radius: 50px;
`;
