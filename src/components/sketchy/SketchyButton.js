import React from "react";
import styled from "styled-components";
import { Close, DownArrow, PauseIcon, PlayIcon, UpArrow } from "./icons";

// onTouchStart={onClick}

function SketchyButton({ onClick, icon }) {
  return (
    <Button onClick={onClick}>
      <svg viewBox="0 0 29.8 30">
        {icon === "play" && <PlayIcon />}

        {icon === "pause" && <PauseIcon />}

        {icon === "up" && <UpArrow />}

        {icon === "down" && <DownArrow />}

        {icon === "close" && <Close />}
      </svg>
    </Button>
  );
}

export default SketchyButton;

const Button = styled.button`
  border: none;
  outline: none;
  background: none;
  width: 70px;
  height: 70px;
`;
