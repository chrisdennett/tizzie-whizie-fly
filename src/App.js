import React, { useState } from "react";
import styled from "styled-components";
// import { useWindowSize } from "./hooks/useWindowSize";
import { Game } from "./game/Game";
import { HomePage } from "./homePage/HomePage";

const IN_TEST_MODE = false;

function App() {
  console.log("APP");
  const [showGame, setShowGame] = useState(false);
  const [spriteData, setSpriteData] = useState(null);
  // const windowSize = useWindowSize();

  const onEndGame = () => {
    setShowGame(false);
  };

  return (
    <Container showGame={showGame}>
      <Content>
        {(IN_TEST_MODE || showGame) && (
          <div>
            <Game spriteData={spriteData} onEndGame={onEndGame} />
          </div>
        )}

        {!showGame && (
          <HomePage
            spriteData={spriteData}
            setSpriteData={setSpriteData}
            setShowGame={setShowGame}
            IN_TEST_MODE={IN_TEST_MODE}
          />
        )}
      </Content>
    </Container>
  );
}

export default App;

const Container = styled.div`
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
