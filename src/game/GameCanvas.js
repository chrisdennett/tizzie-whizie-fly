import React from "react";
import styled from "styled-components";
// import SketchyGameBox from "../components/sketchy/SketchyGameBox";
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
    <Container>
      {/* <SketchyGameBox /> */}
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
  }
`;

const StyledCanvas = styled.canvas`
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
