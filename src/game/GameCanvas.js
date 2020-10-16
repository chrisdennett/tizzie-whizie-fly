import React from "react";
import styled from "styled-components";
import { drawGame } from "../gameLogic/drawGame";

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
    <StyledCanvas
      ref={gameCanvasRef}
      width={gameState.gameW - 270}
      height={gameState.gameH - 250}
    />
  );
};

const StyledCanvas = styled.canvas`
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 25px;
`;
