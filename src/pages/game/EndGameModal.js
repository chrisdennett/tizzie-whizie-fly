import React from "react";
import styled from "styled-components";
import { CallToActionButton } from "../../components/CallToActionButton";

export const EndGameModal = ({ onReplay, onSeeScoreCard }) => {
  return (
    <GameModalOuter>
      <GameModalContent>
        <CallToActionButton onClick={onSeeScoreCard}>
          SEE SCORECARD
        </CallToActionButton>
        <CallToActionButton onClick={onReplay}>REPLAY</CallToActionButton>
      </GameModalContent>
    </GameModalOuter>
  );
};

const GameModalOuter = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

const GameModalContent = styled.div`
  /* background-color: rgba(255, 255, 255, 0.5); */
  border-radius: 8px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  button {
    margin: 6px;
  }
`;
