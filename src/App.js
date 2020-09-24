import React, { useState } from "react";
import { Router, Link } from "@reach/router";

import Home from "./pages/Home";
import PlayGame from "./pages/PlayGame";
import DrawGame from "./pages/DrawGame";
import About from "./pages/About";
import { defaultGameState } from "./game/gameState";

function App() {
  const [spriteData, setSpriteData] = useState(null);
  const [gameState, setGameState] = useState(defaultGameState);

  const gameProps = { spriteData, setSpriteData, gameState, setGameState };

  const homeProps = {
    spriteData,
    setSpriteData,
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="about">About</Link>
      </nav>

      <Router>
        <Home path="/" {...homeProps} />
        <About path="about" />
        <PlayGame path="playgame" {...gameProps} />
        <DrawGame path="drawgame" setSpriteData={setSpriteData} />
      </Router>
    </div>
  );
}

export default App;
