import React from "react";
import styled from "styled-components";
import SketchyButton from "../components/sketchy/SketchyButton";
// import useSound from "use-sound";
import { useKeyboardBindings } from "../hooks/useKeyboardBindings";
import { ArrowButton } from "./ArrowButtons";

const GameControlsLeft = ({ gameState, goUp, goDown }) => {
  // const [playPlip] = useSound("/sounds/plip.wav", { volume: 1 });
  // const [playWhoosh] = useSound(
  //   "/sounds/zapsplat_cartoon_swipe_fast_swish_001_49164.mp3",
  //   {
  //     volume: 1,
  //   }
  // );
  useKeyboardBindings({
    ArrowUp: () => onGoUp(),
    ArrowDown: () => onGoDown(),
  });

  const onGoDown = () => {
    goDown();
    // if (gameState.soundOn) setTimeout(() => playPlip(), 100);
  };

  const onGoUp = () => {
    goUp();
    // if (gameState.soundOn) playWhoosh();
  };

  return (
    <Outer>
      <ButtonHolder>
        <ArrowButton type="up" onClick={onGoUp} />
      </ButtonHolder>
      <ButtonHolder>
        <ArrowButton type="down" onClick={onGoDown} />
      </ButtonHolder>
    </Outer>
  );
};

export default GameControlsLeft;

const ButtonHolder = styled.div`
  :first-child {
    margin-bottom: 5px;
  }
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  justify-content: center;
`;
