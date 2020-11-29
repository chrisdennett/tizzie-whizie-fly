import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import { GameCanvas } from "./GameCanvas";
import { getNextGameState, defaultGameState } from "./gameLogic/gameState";
import { Map } from "./Map/Map";
import ScoreBoard from "./scoreboard/ScoreBoard";

const GameScreen = ({
  spriteData,
  isPaused,
  flyUp,
  diveDown,
  setFlyUp,
  setDiveDown,
  onCollision,
  onGameWon,
}) => {
  const [gameState, setGameState] = useState(defaultGameState);
  const [tickCount, setTickCount] = useState(0);

  useAnimationFrame(() => {
    if (!isPaused || !gameState.gameOver) {
      setTickCount((prev) => prev + 1);
    }
  });

  const updateGame = () => {
    if (!spriteData || isPaused) return;

    if (gameState.gameWon) {
      onGameWon(gameState);
      return;
    }

    if (gameState.isMoving) {
      setFlyUp(false);
      setDiveDown(false);
    }

    const nextGameState = getNextGameState(
      gameState,
      flyUp,
      diveDown,
      tickCount
    );
    setGameState(nextGameState);
  };

  useEffect(updateGame, [tickCount]);

  const onCollisionTrigger = () => {
    onCollision(gameState);
  };

  return (
    <GameScreenOuter>
      <GameTopBar>
        <ScoreBoard
          pointsWon={gameState.pointsWon}
          cardsWon={gameState.cardsWon}
        />
      </GameTopBar>

      <MapHolder>
        <Map progress={gameState.progress} />
      </MapHolder>

      <GameCanvas
        onCollision={onCollisionTrigger}
        spriteCanvas={spriteData.canvas}
        gameState={gameState}
        spriteData={spriteData.data}
      />
    </GameScreenOuter>
  );
};

export default GameScreen;

const GameScreenOuter = styled.div`
  position: relative;
  max-width: 100%;
`;

const MapHolder = styled.div`
  position: absolute;
  bottom: 0;
  width: 70%;
  right: 30px;
  bottom: 15px;
  /* transform: rotate(270deg) translate(-165px, 595px) scale(1.3); */
`;

const GameTopBar = styled.div`
  margin-top: -10px;
  position: absolute;
  top: 0;
  right: 20px;
`;
