import React from "react";
import styled from "styled-components";
import SketchyButton from "../components/sketchy/SketchyButton";
// import useSound from "use-sound";
import { useKeyboardBindings } from "../hooks/useKeyboardBindings";

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
      <ButtonHolder onClick={onGoUp}>
        <SketchyButton icon="up" />
      </ButtonHolder>
      <ButtonHolder onClick={onGoDown}>
        <SketchyButton icon="down" />
      </ButtonHolder>
    </Outer>
  );
};

export default GameControlsLeft;

const ButtonHolder = styled.div`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid;
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
`;
