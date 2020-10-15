import React from "react";
import styled from "styled-components";
import SketchyButton from "../components/sketchy/SketchyButton";
import { RoundButton } from "./RoundButtons";
// import SketchyCloseButton from "../components/sketchy/CloseButton";

const GameControlsRight = ({
  gameOver,
  isPaused,
  firstGameStarted,
  onEndGame,
  onPlay,
  replay,
  onPlayPauseToggle,
  onFullScreen,
  fullScreenActive,
  onExitFullScreen,
}) => {
  const onFullScreenClick = () => {
    if (fullScreenActive) {
      onExitFullScreen();
    } else {
      onFullScreen();
    }
  };

  return (
    <Outer>
      <TopSection>
        <ButtonHolder>
          <RoundButton onClick={onEndGame} type="close" />
        </ButtonHolder>
      </TopSection>

      <MainSection>
        <ButtonHolder>
          <RoundButton onClick={onFullScreenClick} type="fullscreen" />
        </ButtonHolder>

        {firstGameStarted ? (
          <ButtonHolder>
            <RoundButton
              onClick={onPlayPauseToggle}
              type={isPaused ? "play" : "pause"}
            />
          </ButtonHolder>
        ) : (
          <ButtonHolder>
            <RoundButton onClick={onPlay} type="play" />
          </ButtonHolder>
        )}

        <ButtonHolder>
          <RoundButton onClick={onFullScreenClick} type="help" />
        </ButtonHolder>

        {gameOver && (
          <ButtonHolder>
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
  flex-direction: column;
  padding: 0 15px;
`;

const ButtonHolder = styled.div``;

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
  flex-direction: column;
  justify-content: center;
`;
