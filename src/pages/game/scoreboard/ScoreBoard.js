import React from "react";
import styled from "styled-components";
// import { ScoreBoardIcon } from "./ScoreBoardIcons";

function ScoreBoard({ pointsWon = 0, cardsWon = 0 }) {
  return (
    <Container>
      <Cards>CARDS: {cardsWon}</Cards>
      <Points>POINTS: {pointsWon}</Points>

      {/* <ScoreElement
        hideIcons={hideIcons}
        type="boat"
        label="Boats"
        score={0}
        max={19}
      />
      <ScoreElement
        hideIcons={hideIcons}
        type="island"
        label="Islands"
        score={5}
        max={21}
      />
      <ScoreElement
        hideIcons={hideIcons}
        type="story"
        label="Stories"
        score={1}
        max={17}
      /> */}
    </Container>
  );
}

export default ScoreBoard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.3em;

  @media (max-width: 600px) {
    font-size: 1em;
  }
`;

const Cards = styled.p`
  margin: 0 10px 0 0;
  width: 130px;

  @media (max-width: 600px) {
    width: 100px;
  }
`;

const Points = styled.p`
  margin: 0;
  width: 195px;

  @media (max-width: 600px) {
    width: 140px;
  }
`;

// const ScoreElement = ({ type, label, score, max, hideIcons }) => (
//   <ScoreElementContainer>
//     {!hideIcons && <ScoreBoardIcon type={type} />}
//     <ScoreElementTextHolder>
//       <h3>{label}</h3>
//       <p>
//         {score} : {max}
//       </p>
//     </ScoreElementTextHolder>
//   </ScoreElementContainer>
// );

// const ScoreElementContainer = styled.div`
//   display: flex;
//   margin: 0 5px;
// `;

// const ScoreElementTextHolder = styled.div`
//   display: flex;
//   flex-direction: column;
//   color: rgba(0, 0, 0, 0.6);
//   margin-left: 10px;

//   h3 {
//     margin: 0;
//     font-size: 1em;
//   }

//   p {
//     margin: 0;
//     text-align: center;
//   }
// `;
