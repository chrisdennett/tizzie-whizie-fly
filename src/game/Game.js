import React, { useState } from "react";
// import { useInterval } from "../hooks/useInternval";
import styled from "styled-components";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { getNextGameState, defaultGameState } from "./gameState";
import { GameCanvas } from "./GameCanvas";
import { Map } from "./Map";
import GameControls from "./GameControls";
import CollectionCard from "../collectionCards/CollectionCards";
import useSound from "use-sound";

const IN_INVINCIBLE_MODE = false;

export const Game = ({ spriteData, gameState, setGameState, onEndGame }) => {
  const [playLoseSound] = useSound("/sounds/zapsplat_impact.mp3", {
    volume: 1,
  });

  const [showCollectionCards, setShowCollectionCards] = useState(false);
  const [flyUp, setFlyUp] = useState(false);
  const [diveDown, setDiveDown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // TODO - if go away from game and back this resets - move to App maybe
  const [firstGameStarted, setFirstGameStarted] = useState(false);
  const [tickCount, setTickCount] = useState(0);

  useAnimationFrame(() => setTickCount((prev) => prev + 1));

  const updateGame = () => {
    if (!spriteData || isPaused || !firstGameStarted) return;

    if (gameState.gameOver) return;

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

  React.useEffect(updateGame, [tickCount]);

  const goUp = () => {
    setFlyUp(true);
  };

  const goDown = () => {
    setDiveDown(true);
  };

  const onPlayPauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  const replay = () => {
    setGameState(defaultGameState);
  };

  const onPlay = () => {
    setFirstGameStarted(true);
  };

  const showGameControls = firstGameStarted && !gameState.gameOver;
  const onCollision = () => {
    if (!IN_INVINCIBLE_MODE) {
      setIsPaused(true);
    }
    playLoseSound();
  };

  const controlsProps = {
    gameState,
    showGameControls,
    onEndGame,
    onPlay,
    replay,
    onPlayPauseToggle,
    goUp,
    goDown,
    isPaused,
    firstGameStarted,
  };

  const onShowCardsCollected = () => setShowCollectionCards((prev) => !prev);

  return (
    <div>
      {spriteData && (
        <GamePanel>
          <MapHolder>
            <Map progress={gameState.progress} />
          </MapHolder>

          <GameCanvas
            onCollision={onCollision}
            spriteCanvas={spriteData.canvas}
            gameState={gameState}
            spriteData={spriteData.data}
          />
        </GamePanel>
      )}
      <div>
        <GameControls {...controlsProps} />
      </div>

      <button onClick={onShowCardsCollected}>Show Cards Collected</button>

      {showCollectionCards && (
        <CollectionCard
          gameItems={gameState.obstacles}
          gameTime={gameState.gameTick}
        />
      )}
    </div>
  );
};

const GamePanel = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 5vh;
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
