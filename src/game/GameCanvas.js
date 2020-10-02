import React from "react";
import styled from "styled-components";
import SketchyGameBox from "../components/sketchy/SketchyGameBox";
import { drawGame } from "./drawGame";

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
      <SketchyGameBox />
      <StyledCanvas
        ref={gameCanvasRef}
        width={gameState.gameW - 200}
        height={gameState.gameH - 305}
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
  border-radius: 42px;
  margin: 1%;
  width: 98%;
  /* box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); */
  /* background-color: rgba(255, 255, 255, 0.3); */
`;
