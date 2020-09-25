import React, { useState } from "react";
import styled from "styled-components";
import DrawGame from "./components/DrawGame";
import PlayGame from "./game/PlayGame";
import SpriteTester from "./game/SpriteTester";
import TopBar from "./components/TopBar";
import About from "./components/About";
import { defaultGameState } from "./game/gameState";
import { useWindowSize } from "./hooks/useWindowSize";
import { TizzieLogo } from "./components/TizzieLogo";

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [spriteData, setSpriteData] = useState(null);
  const [gameState, setGameState] = useState(defaultGameState);

  const windowSize = useWindowSize();

  const gameCreated = spriteData && spriteData.canvas;
  const gameProps = { spriteData, gameState, setGameState };

  const onEndGame = () => {
    setSpriteData(null);
    setGameState(defaultGameState);
  };

  return (
    <Container>
      <TopBar
        onInfoClick={() => setShowInfo(true)}
        showTitle={false}
        onHomeClick={onEndGame}
      />

      {showInfo && <About onClose={() => setShowInfo(false)} />}

      <Content>
        {!gameCreated && (
          <div>
            <header>
              <TizzieLogo height={80} />
              <h1>Fly Tizzie Fly</h1>
              <h2>Paint your own game</h2>
              <p>Add brief intro to the project here.</p>
            </header>

            <DrawGame setSpriteData={setSpriteData} windowSize={windowSize} />
            <SpriteTester spriteData={spriteData} />
          </div>
        )}
        {gameCreated && (
          <div>
            <button onClick={onEndGame}>End game</button>
            <PlayGame {...gameProps} />
          </div>
        )}
      </Content>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin-top: 60px;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;

  header {
    padding: 20px 10px;
    text-align: center;

    h1 {
      font-size: 64px;
      margin: 0;
      font-family: "Cabin Sketch", cursive;
      line-height: 100%;
    }

    h2 {
      margin: 10px 0 0 0;
    }

    p {
      margin: 5px 0;
    }
  }
`;
