import React, { useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "./hooks/useWindowSize";
import { Game } from "./pages/game/Game";
import { Router } from "./pages/Router";
import { Border } from "./components/Border";
import { GameEndScreen } from "./pages/game/endScreen/GameEndScreen";
import { defaultGameState } from "./pages/game/gameLogic/gameState";

const IN_TEST_MODE = true;
const IN_INVINCIBLE_MODE = true;
const AUTO_PLAY_GAME = true;
const SHOW_END_SCREEN = false;

function App() {
  const [showGame, setShowGame] = useState(false);
  const [endState, setEndState] = useState(defaultGameState);
  const [spriteData, setSpriteData] = useState(null);
  const [gameOver, setGameOver] = useState(SHOW_END_SCREEN);

  const onGameOver = (endState) => {
    setEndState(endState);
    setGameOver(true);
  };

  const windowSize = useWindowSize();

  const onCloseGame = () => {
    setGameOver(false);
    setShowGame(false);
  };

  const onReplay = () => {
    setGameOver(false);
  };

  const gameActive = showGame && !gameOver;
  const showRouter = !gameActive && !gameOver;

  return (
    <Container>
      <Border type={"top"} />

      {gameOver && (
        <GameEndScreen
          spriteData={spriteData}
          onReplay={onReplay}
          endState={endState}
          onFinish={onCloseGame}
        />
      )}

      {gameActive && (
        <>
          <Game
            onGameOver={onGameOver}
            spriteData={spriteData}
            onCloseGame={onCloseGame}
            windowSize={windowSize}
            AUTO_PLAY_GAME={AUTO_PLAY_GAME}
            IN_INVINCIBLE_MODE={IN_INVINCIBLE_MODE}
          />
        </>
      )}

      {showRouter && !gameOver && (
        <Router
          spriteData={spriteData}
          setSpriteData={setSpriteData}
          setShowGame={setShowGame}
          IN_TEST_MODE={IN_TEST_MODE}
        />
      )}
      <Border />
    </Container>
  );
}

export default App;

const Container = styled.div`
  min-height: 100vh;
  background-image: url("/img/bg/linedpaper.png");
`;
