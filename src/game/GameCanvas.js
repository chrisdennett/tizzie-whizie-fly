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
    <CanvasHolder>
      <StyledCanvas
        ref={gameCanvasRef}
        width={gameState.gameW - 200}
        height={gameState.gameH - 300}
      />
    </CanvasHolder>
  );
};

const CanvasHolder = styled.div`
  background-image: url("/img/bg/handmadepaper.png");
  /* padding: 20px; */
  line-height: 0;
  margin: 10px;
  box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.7), 0 0 4px rgba(0, 0, 0, 0.1),
    0 5px 10px rgba(0, 0, 0, 0.1);
`;

const StyledCanvas = styled.canvas`
  /* border-radius: 10px; */
  /* box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); */
  /* background-color: rgba(255, 255, 255, 0.3); */
`;
