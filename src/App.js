import React, { useState } from "react";
import { Game } from "./game/Game";
import SpriteSheetMaker from "./spriteSheet/SpriteSheetMaker";
import { defaultGameState } from "./game/gameState";
import { Map } from "./components/photoSelector/Map";
import styled from "styled-components";

function App() {
  const [spriteData, setSpriteData] = useState(null);
  const [gameState, setGameState] = useState(defaultGameState);

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

      {/* {!spriteData && ( */}
      <SpriteSheetMaker
        setSpriteData={setSpriteData}
        w={defaultGameState.gameW}
        h={defaultGameState.gameH}
      />
      {/* )} */}
    </div>
  );
}

export default App;

const GamePanel = styled.div`
  display: flex;
`;
