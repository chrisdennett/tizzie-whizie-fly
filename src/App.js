import React, { useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "./hooks/useWindowSize";
import { Game } from "./pages/game/Game";
import { Router } from "./pages/Router";
import { Border } from "./components/Border";
import { GameEndScreen } from "./pages/game/endScreen/GameEndScreen";
import { defaultGameState } from "./pages/game/gameLogic/gameState";

const IN_TEST_MODE = false;
const IN_INVINCIBLE_MODE = false;
const AUTO_PLAY_GAME = false;
const SHOW_END_SCREEN = false;

function App() {
  const [showGame, setShowGame] = useState(false);
  const [endState, setEndState] = useState(defaultGameState);
  const [spriteData, setSpriteData] = useState(null);
  const [showEndScreen, setShowEndScreen] = useState(SHOW_END_SCREEN);

  const windowSize = useWindowSize();

  const onShowEndScreen = () => {
    setShowEndScreen(true);
  };

  const onResetGame = () => {
    setEndState(defaultGameState);
  };

  const onCloseGame = () => {
    setShowEndScreen(false);
    setShowGame(false);
  };

  const onReplay = () => {
    setShowEndScreen(false);
  };

  const gameActive = showGame && !showEndScreen;
  const showRouter = !gameActive && !showEndScreen;

  return (
    <Container>
      <Border type={"top"} />

      {showEndScreen && (
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
            setEndState={setEndState}
            showEndScreen={onShowEndScreen}
            onResetGame={onResetGame}
            spriteData={spriteData}
            onCloseGame={onCloseGame}
            windowSize={windowSize}
            AUTO_PLAY_GAME={AUTO_PLAY_GAME}
            IN_INVINCIBLE_MODE={IN_INVINCIBLE_MODE}
          />
        </>
      )}

      {showRouter && !showEndScreen && (
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
