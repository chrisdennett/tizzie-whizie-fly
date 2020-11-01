import React from "react";
import styled from "styled-components";
import { CallToActionButton } from "../../components/CallToActionButton";
import CollectionCards from "../../collectionCards/CollectionCards";

export const GameEndScreen = ({ onReplay, endState }) => {
  return (
    <Container>
      <Content>
        <Header>
          <h2>Game Over</h2>
          <CallToActionButton onClick={onReplay}>REPLAY</CallToActionButton>
        </Header>
        <p>
          <b>SCORE:</b> 0 out of 10001
        </p>
        <h3>
          CARDS: <span>0 out of 4</span>
        </h3>
        <CollectionCards
          gameItems={endState.obstacles}
          maxIndexCollected={endState.maxObstacleIndexCollected}
        />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  /* background-color: rgba(255, 255, 255, 0.4); */
  /* position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0; */
  /* display: flex; */
  /* z-index: 100; */
  /* padding: 2%; */
`;

const Content = styled.div`
  padding: 4% 3% 4% 6%;
  /* max-width: 450px; */
  /* background-color: whitesmoke; */
  /* margin: auto;
  text-align: center;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); */

  h2 {
    margin: 0;
  }

  h3 {
    text-align: center;

    span {
      font-weight: normal;
    }
  }

  p {
    text-align: left;
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
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
