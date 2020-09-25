import React, { useState } from "react";
import SpriteTester from "./game/SpriteTester";
import DrawGame from "./components/DrawGame";
import PlayGame from "./game/PlayGame";

import { defaultGameState } from "./game/gameState";
import TopBar from "./components/TopBar";
import About from "./components/About";
import styled from "styled-components";

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [spriteData, setSpriteData] = useState(null);
  const [gameState, setGameState] = useState(defaultGameState);

  const gameCreated = spriteData && spriteData.canvas;
  const gameProps = { spriteData, gameState, setGameState };

  const onEndGame = () => {
    setSpriteData(null);
    setGameState(defaultGameState);
  };

  return (
    <Container>
      <TopBar onInfoClick={() => setShowInfo(true)} />

      {showInfo && <About onClose={() => setShowInfo(false)} />}

      <Content>
        {!gameCreated && (
          <div>
            <header>
              <h1>FLY TIZZIE FLY</h1>
              <h2>Paint your own game</h2>
              <p>Add brief intro to the project here.</p>
            </header>

            <DrawGame setSpriteData={setSpriteData} />
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
  max-width: 800px;
  margin: 0 auto;

  header {
    padding: 20px 10px;
    text-align: center;

    h1 {
      font-size: 64px;
    }
  }
`;
