import React from "react";
import styled from "styled-components";
import SketchyButton from "../components/sketchy/SketchyButton";
import SketchyCloseButton from "../components/sketchy/CloseButton";

const GameControls = ({
  gameState,
  isPaused,
  firstGameStarted,
  showGameControls,
  onEndGame,
  onPlay,
  replay,
  onPlayPauseToggle,
  goUp,
  goDown,
}) => {
  return (
    <Outer>
      {!firstGameStarted && (
        <ButtonHolder>
          <SketchyButton onClick={onPlay} icon="play" />
        </ButtonHolder>
      )}

      {gameState.gameOver && (
        <ButtonHolder>
          <Button onClick={replay} onTouchStart={replay}>
            REPLAY
          </Button>
        </ButtonHolder>
      )}

      {showGameControls && (
        <>
          <ButtonHolder>
            <SketchyButton onClick={goUp} icon="up" />
          </ButtonHolder>
          <ButtonHolder>
            <SketchyButton onClick={goDown} icon="down" />
          </ButtonHolder>
          <ButtonHolder>
            <SketchyButton
              onClick={onPlayPauseToggle}
              icon={isPaused ? "play" : "pause"}
            />
          </ButtonHolder>
        </>
      )}

      <ButtonHolder>
        <SketchyCloseButton onClick={onEndGame} />
      </ButtonHolder>
    </Outer>
  );
};

export default GameControls;

const ButtonHolder = styled.div``;

const Outer = styled.div`
  display: flex;
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
