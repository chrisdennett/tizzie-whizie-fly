import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const StartGameModal = ({ onStart }) => {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      onStart();
    }
    // eslint-disable-next-line
  }, [counter]);

  return (
    <GameModalOuter>
      <GameModalContent>
        <h1>Game starts in: {counter}</h1>
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameModalContent = styled.div`
  /* background-color: rgba(255, 255, 255, 0.6); ; */
`;
