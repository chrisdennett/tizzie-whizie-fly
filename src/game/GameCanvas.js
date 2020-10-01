import React from "react";
import styled from "styled-components";
import { drawGame } from "./drawGame";

export const GameCanvas = ({
  spriteCanvas,
  gameState,
  spriteData,
  onCollision,
  IN_TEST_MODE,
}) => {
  const gameCanvasRef = React.useRef(null);

  React.useEffect(() => {
    const gameCanvas = gameCanvasRef.current;
    if (!gameCanvas || !spriteCanvas) return null;
    drawGame(
      gameCanvas,
      gameState,
      spriteCanvas,
      spriteData,
      onCollision,
      IN_TEST_MODE
    );

    // eslint-disable-next-line
  }, [spriteCanvas, gameState, spriteData]);

  return (
    <div>
      <StyledCanvas
        ref={gameCanvasRef}
        width={gameState.gameW - 200}
        height={gameState.gameH - 300}
      />
    </div>
  );
};

const StyledCanvas = styled.canvas`
  border-radius: 20px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
`;
