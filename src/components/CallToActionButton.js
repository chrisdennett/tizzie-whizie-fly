import React from "react";
import styled from "styled-components";

export const CallToActionButton = ({ children, onClick, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: 10px 15px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  background-color: ${(props) => (props.disabled ? "#ccc" : "#78b92cb0")};
  border: 1px solid black;
  border-radius: 3px;
  font-size: 1.1em;
  cursor: pointer;
`;
