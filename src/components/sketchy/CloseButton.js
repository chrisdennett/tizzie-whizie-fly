import React from "react";
import styled from "styled-components";
import { Close } from "./icons";

function SketchyCloseButton({ onClick }) {
  return (
    <Button onClick={onClick} onTouchStart={onClick}>
      <svg viewBox="0 0 64.8 30.5">
        <Close />
      </svg>
    </Button>
  );
}

export default SketchyCloseButton;

const Button = styled.button`
  border: none;
  outline: none;
  background: none;
  width: 140px;
  height: 70px;
`;
