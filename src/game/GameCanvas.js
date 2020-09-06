import React from "react";
import { drawGame } from "./drawGame";

export const GameCanvas = ({ spriteCanvas, gameState, spriteData }) => {
  const gameCanvasRef = React.useRef(null);
  const canvasStyle = { border: "red 1px solid" };

  React.useEffect(() => {
    const gameCanvas = gameCanvasRef.current;
    if (!gameCanvas || !spriteCanvas) return null;
    drawGame(gameCanvas, gameState, spriteCanvas, spriteData);
  }, [spriteCanvas, gameState, spriteData]);

  return (
    <div>
      <canvas
        ref={gameCanvasRef}
        style={canvasStyle}
        width={gameState.gameW - 200}
        height={gameState.gameH - 300}
      />
    </div>
  );
};
