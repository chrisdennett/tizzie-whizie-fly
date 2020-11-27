import React from "react";
import styled from "styled-components";
import { CallToActionButton } from "../../components/CallToActionButton";

export const EndGameModal = ({ onReplay, onSeeScoreCard }) => {
  return (
    <GameModalOuter>
      <GameModalContent>
        <CallToActionButton onClick={onReplay}>
          SEE SCORECARD
        </CallToActionButton>
        <CallToActionButton onClick={onReplay}>REPLAY</CallToActionButton>
      </GameModalContent>
    </GameModalOuter>
  );
};

const GameModalOuter = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const GameModalContent = styled.div`
  background-color: white;
`;
