import React from "react";
import styled from "styled-components";

export const LosingHeader = () => {
  return (
    <Container>
      <h1>GAME OVER</h1>
      <h3>Better luck next time!</h3>
    </Container>
  );
};

const Container = styled.div`
  h3 {
    font-weight: normal;
  }

  margin-bottom: 60px;
`;
