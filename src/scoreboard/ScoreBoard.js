import React from "react";
import styled from "styled-components";
import { ScoreBoardIcon } from "./ScoreBoardIcons";

function ScoreBoard() {
  return (
    <Container>
      <ScoreElement type="boat" label="Boats" score={0} max={19} />
      <ScoreElement type="island" label="Islands" score={5} max={21} />
      <ScoreElement type="story" label="Stories" score={1} max={17} />
    </Container>
  );
}

export default ScoreBoard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const ScoreElement = ({ type, label, score, max }) => (
  <ScoreElementContainer>
    <ScoreBoardIcon type={type} />
    <ScoreElementTextHolder>
      <h3>{label}</h3>
      <p>
        {score} : {max}
      </p>
    </ScoreElementTextHolder>
  </ScoreElementContainer>
);

const ScoreElementContainer = styled.div`
  display: flex;
  margin: 0 10px;
`;

const ScoreElementTextHolder = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 10px;

  h3 {
    margin: 0;
  }

  p {
    margin: 0;
    text-align: center;
  }
`;
