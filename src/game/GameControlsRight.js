import React from "react";
import styled from "styled-components";
import SketchyButton from "../components/sketchy/SketchyButton";
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
      {firstGameStarted ? (
        <ButtonHolder>
          <SketchyButton
            onClick={onPlayPauseToggle}
            icon={isPaused ? "play" : "pause"}
          />
        </ButtonHolder>
      ) : (
        <ButtonHolder>
          <SketchyButton onClick={onPlay} icon="play" />
        </ButtonHolder>
      )}

      {gameOver && (
        <ButtonHolder>
          <Button onClick={replay} onTouchStart={replay}>
            REPLAY
          </Button>
        </ButtonHolder>
      )}

      <ButtonHolder>
        <SketchyButton onClick={onEndGame} icon={"close"} />
      </ButtonHolder>

      <ButtonHolder>
        <SketchyButton onClick={onFullScreenClick} icon={"close"} />
      </ButtonHolder>
    </Outer>
  );
};

export default GameControlsRight;

const ButtonHolder = styled.div`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid;
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 72px; */
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
