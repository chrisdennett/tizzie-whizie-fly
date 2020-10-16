import React, { useState } from "react";
import styled from "styled-components";
import GameMaker from "../components/GameMaker";
import { TizzieLogo } from "../components/TizzieLogo";
import { InfoButton } from "../components/InfoButton";
import About from "../components/About";
import SpriteTester from "../game/SpriteTester";

export const HomePage = ({
  spriteData,
  setSpriteData,
  setShowGame,
  IN_TEST_MODE,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const gameCreated = spriteData && spriteData.canvas;

  return (
    <HomePageContainer>
      {showInfo && <About onClose={() => setShowInfo(false)} />}
      <InfoButton onClick={() => setShowInfo(true)} />
      <header>
        <TizzieLogo height={80} />
        <h1>Fly Tizzie Fly</h1>
        <h2>Paint your own game</h2>
        <p>Add brief intro to the project here.</p>
      </header>

      {gameCreated && (
        <GamePreviewHolder>
          <button onClick={() => setShowGame(true)}>PLAY YOUR GAME</button>
        </GamePreviewHolder>
      )}

      {IN_TEST_MODE && gameCreated && (
        <div>
          <SpriteTester spriteData={spriteData} />
        </div>
      )}

      <GameMaker setSpriteData={setSpriteData} IN_TEST_MODE={IN_TEST_MODE} />
    </HomePageContainer>
  );
};

const HomePageContainer = styled.div``;

const GamePreviewHolder = styled.div`
  padding: 20px;
  background-image: url("/img/bg/cutting-mat-tile.png");
  border-radius: 10px;
  display: flex;
  border-bottom: 3px solid rgba(0, 0, 0, 0.5);
  border-right: 3px solid rgba(0, 0, 0, 0.5);
`;
