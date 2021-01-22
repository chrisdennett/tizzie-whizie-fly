import React from "react";
import styled from "styled-components";
import { CallToActionButton } from "../../../components/CallToActionButton";
import { CollectionCards } from "../../../components/collectionCards/CollectionCards";
import { WinningHeader } from "./WinningHeader";
import { LosingHeader } from "./LosingHeader";

export const GameEndScreen = ({ onReplay, endState, onFinish, spriteData }) => {
  const gameIsWon =
    endState.maxObstacleIndexCollected >= endState.obstacles.length - 1;

  const finalScore = gameIsWon ? endState.topScore : endState.pointsWon;

  return (
    <Container>
      <Content>
        <Header>
          <CallToActionButton
            style={{ background: "#d86a6a" }}
            onClick={onFinish}
          >
            CLOSE
          </CallToActionButton>
          <CallToActionButton onClick={onReplay}>REPLAY</CallToActionButton>
        </Header>

        {/* {!gameIsWon && <WinningHeader spriteData={spriteData} />} */}
        {gameIsWon && <WinningHeader spriteData={spriteData} />}

        {!gameIsWon && <LosingHeader />}

        <p>
          <b>SCORE:</b> {finalScore | 0} out of {endState.topScore}
        </p>
        <p>
          <b>CARDS:</b>{" "}
          <span>
            {endState.cardsWon | 0} out of {endState.obstacles.length}
          </span>
        </p>
        <CollectionCards
          maxIndexCollected={endState.maxObstacleIndexCollected}
        />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
`;

const Content = styled.div`
  padding: 60px 3% 4% 6%;
  text-align: center;

  h2 {
    margin: 0;
  }

  h3 {
    text-align: center;

    span {
      font-weight: normal;
    }
  }

  ul {
    text-align: left;
    padding-left: 20px;
    list-style-type: none;

    li {
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      svg {
        margin-right: 10px;
      }
    }
  }
`;

const Header = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px;
`;
