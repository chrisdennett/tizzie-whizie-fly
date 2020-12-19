import React from "react";
import styled from "styled-components";
import { CallToActionButton } from "../../components/CallToActionButton";

export const EndGameModal = ({
  onReplay,
  onSeeScoreCard,
  onFinish,
  cardsWon,
}) => {
  const totalCards = cardsWon + 1;
  const cardsText = `${totalCards > 1 ? totalCards : ""} CARD${
    totalCards > 1 ? "S" : ""
  }`;

  return (
    <GameModalOuter>
      <GameModalContent>
        <CallToActionButton onClick={onSeeScoreCard}>
          See the <b style={{ margin: "0 5px" }}>{cardsText}</b> you collected
        </CallToActionButton>
        <LowerButtons>
          <CallToActionButton
            onClick={onReplay}
            style={{ background: "#63bbe4" }}
          >
            REPLAY
          </CallToActionButton>

          <CallToActionButton
            style={{ background: "#d86a6a" }}
            onClick={onFinish}
          >
            FINISH
          </CallToActionButton>
        </LowerButtons>
      </GameModalContent>
    </GameModalOuter>
  );
};

const LowerButtons = styled.div`
  display: flex;
`;

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
  background-color: rgba(255, 255, 255, 0.7);
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
