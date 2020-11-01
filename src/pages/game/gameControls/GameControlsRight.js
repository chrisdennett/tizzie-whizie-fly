import React from "react";
import styled from "styled-components";
import { RoundButton } from "./RoundButtons";

const GameControlsRight = ({
  gameOver,
  isPaused,
  onEndGame,
  replay,
  onPlayPauseToggle,
  showAsRow,
  onHelp,
}) => {
  // const onFullScreenClick = () => {
  //   if (fullScreenActive) {
  //     onExitFullScreen();
  //   } else {
  //     onFullScreen();
  //   }
  // };

  return (
    <Outer showAsRow={showAsRow}>
      <TopSection>
        <ButtonHolder>
          <RoundButton onClick={onEndGame} type="close" />
        </ButtonHolder>
      </TopSection>

      <MainSection showAsRow={showAsRow}>
        {/* <ButtonHolder showAsRow={showAsRow}>
          <RoundButton
            onClick={onFullScreenClick}
            type={fullScreenActive ? "closeFullscreen" : "fullscreen"}
          />
        </ButtonHolder> */}

        <ButtonHolder showAsRow={showAsRow}>
          <RoundButton
            onClick={onPlayPauseToggle}
            type={isPaused ? "play" : "pause"}
          />
        </ButtonHolder>

        <ButtonHolder showAsRow={showAsRow}>
          <RoundButton onClick={onHelp} type="help" />
        </ButtonHolder>

        {gameOver && (
          <ButtonHolder showAsRow={showAsRow}>
            <Button onClick={replay} onTouchStart={replay}>
              REPLAY
            </Button>
          </ButtonHolder>
        )}
      </MainSection>
    </Outer>
  );
};

export default GameControlsRight;

const Outer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.showAsRow ? "row-reverse" : "column")};
  padding: 0 15px 0 7px;
`;

const ButtonHolder = styled.div`
  margin-left: ${(props) => (props.showAsRow ? 10 : 0)}px;
`;

const Button = styled.button`
  font-size: 24px;
  color: rgba(0, 0, 0, 0.6);
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  padding: 20px;
`;

const TopSection = styled.div``;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: ${(props) => (props.showAsRow ? "row-reverse" : "column")};
  justify-content: center;
  justify-content: ${(props) => (props.showAsRow ? "flex-end" : "center")};
`;
