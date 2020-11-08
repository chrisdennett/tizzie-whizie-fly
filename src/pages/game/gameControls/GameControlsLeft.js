import React from "react";
import styled from "styled-components";
// import useSound from "use-sound";
import { ArrowButton } from "./ArrowButtons";

const GameControlsLeft = ({ goUp, goDown, showAsRow }) => {
  // const [playPlip] = useSound("/sounds/plip.wav", { volume: 1 });
  // const [playWhoosh] = useSound(
  //   "/sounds/zapsplat_cartoon_swipe_fast_swish_001_49164.mp3",
  //   {
  //     volume: 1,
  //   }
  // );

  const onGoDown = () => {
    goDown();
    // if (gameState.soundOn) setTimeout(() => playPlip(), 100);
  };

  const onGoUp = () => {
    goUp();
    // if (gameState.soundOn) playWhoosh();
  };

  return (
    <Outer showAsRow={showAsRow}>
      <ButtonHolder showAsRow={showAsRow} onClick={onGoUp}>
        <ArrowButton type="up" hideBorder={showAsRow} />
      </ButtonHolder>
      <ButtonHolder showAsRow={showAsRow} onClick={onGoDown}>
        <ArrowButton type="down" hideBorder={showAsRow} />
      </ButtonHolder>
    </Outer>
  );
};

export default GameControlsLeft;

const ButtonHolder = styled.div`
  text-align: center;
  flex: ${(props) => (props.showAsRow ? 1 : 0)};
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-width: ${(props) => (props.showAsRow ? 1 : 0)}px;
  background: ${(props) => (props.showAsRow ? "rgba(0,0,0,0.1)" : "none")};
  :first-child {
    margin-bottom: ${(props) => (props.showAsRow ? 0 : 5)}px;
    margin-left: ${(props) => (props.showAsRow ? 5 : 0)}px;
  }
`;

const Outer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.showAsRow ? "row-reverse" : "column")};
  padding: 0 7px;
  justify-content: ${(props) => (props.showAsRow ? "stretch" : "center")};
`;
