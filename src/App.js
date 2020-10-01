import React, { useState } from "react";
import styled from "styled-components";
import GameMaker from "./components/GameMaker";
import SpriteTester from "./game/SpriteTester";
import TopBar from "./components/TopBar";
import About from "./components/About";
import { defaultGameState } from "./game/gameState";
// import { useWindowSize } from "./hooks/useWindowSize";
import { TizzieLogo } from "./components/TizzieLogo";
import { Game } from "./game/Game";

const IN_TEST_MODE = false;

function App() {
  const [showGame, setShowGame] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [spriteData, setSpriteData] = useState(null);
  const [gameState, setGameState] = useState(defaultGameState);

  // const windowSize = useWindowSize();

  const gameCreated = spriteData && spriteData.canvas;
  const gameProps = { spriteData, gameState, setGameState };

  const onEndGame = () => {
    setShowGame(false);
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
        {(IN_TEST_MODE || showGame) && (
          <div>
            <button onClick={onEndGame}>End game</button>
            <Game {...gameProps} />
          </div>
        )}

        {!showGame && (
          <div>
            <header>
              <TizzieLogo height={80} />
              <h1>Fly Tizzie Fly</h1>
              <h2>Paint your own game</h2>
              <p>Add brief intro to the project here.</p>
            </header>

            {gameCreated && (
              <div>
                <button onClick={() => setShowGame(true)}>
                  PLAY YOUR GAME
                </button>
              </div>
            )}

            {IN_TEST_MODE && gameCreated && (
              <div>
                <button onClick={() => setShowGame(true)}>
                  PLAY YOUR GAME
                </button>
                <SpriteTester spriteData={spriteData} />
              </div>
            )}

            <GameMaker
              setSpriteData={setSpriteData}
              IN_TEST_MODE={IN_TEST_MODE}
            />
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
