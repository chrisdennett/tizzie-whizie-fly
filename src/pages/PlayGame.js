import React from "react";
import styled from "styled-components";
import { Game } from "../game/Game";
import { Map } from "../components/Map";

const PlayGame = ({ spriteData, gameState, setGameState }) => {
  return (
    <div>
      {spriteData && (
        <GamePanel>
          <Game
            spriteData={spriteData}
            gameState={gameState}
            setGameState={setGameState}
          />
          <Map progress={gameState.progress} />
        </GamePanel>
      )}
    </div>
  );
};

export default PlayGame;

const GamePanel = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 800px;
  max-width: 100%;
`;
