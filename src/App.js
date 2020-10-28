import React, { useState } from "react";
import styled from "styled-components";
import { useWindowSize } from "./hooks/useWindowSize";
import { Game } from "./pages/game/Game";
import { HomePage } from "./pages/homePage/HomePage";
import { Border } from "./components/Border";

const IN_TEST_MODE = false;
const IN_INVINCIBLE_MODE = false;

function App() {
  const [showGame, setShowGame] = useState(false);
  const [spriteData, setSpriteData] = useState(null);
  const windowSize = useWindowSize();

  const onEndGame = () => {
    setShowGame(false);
  };

  return (
    <Container>
      <Border type={"top"} />
      {(IN_TEST_MODE || showGame) && (
        <>
          <Game
            spriteData={spriteData}
            onEndGame={onEndGame}
            windowSize={windowSize}
            IN_INVINCIBLE_MODE={IN_INVINCIBLE_MODE}
          />
        </>
      )}

      {!showGame && (
        <HomePage
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
