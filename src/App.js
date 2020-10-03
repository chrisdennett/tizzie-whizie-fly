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

const IN_TEST_MODE = true;

function App() {
  const [showGame, setShowGame] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [spriteData, setSpriteData] = useState(null);
  const [gameState, setGameState] = useState(defaultGameState);

  // const windowSize = useWindowSize();

  const onEndGame = () => {
    setShowGame(false);
    setGameState(defaultGameState);
  };

  const gameCreated = spriteData && spriteData.canvas;
  const gameProps = {
    spriteData,
    gameState,
    setGameState,
    onEndGame,
  };

  return (
    <Container showGame={showGame}>
      <TopBar
        showGame={showGame}
        onInfoClick={() => setShowInfo(true)}
        showTitle={false}
        onHomeClick={onEndGame}
      />

      {showInfo && <About onClose={() => setShowInfo(false)} />}

      <Content>
        {(IN_TEST_MODE || showGame) && (
          <div>
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
              <GamePreviewHolder>
                <button onClick={() => setShowGame(true)}>
                  PLAY YOUR GAME
                </button>
              </GamePreviewHolder>
            )}

            {IN_TEST_MODE && gameCreated && (
              <div>
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

const GamePreviewHolder = styled.div`
  padding: 20px;
  background-image: url("/img/bg/cutting-mat-tile.png");
  border-radius: 10px;
  display: flex;
  border-bottom: 3px solid rgba(0, 0, 0, 0.5);
  border-right: 3px solid rgba(0, 0, 0, 0.5);
`;
const Container = styled.div`
  padding-top: 60px;
  min-height: 100vh;
  background-image: url("/img/bg/linedpaper.png");
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
