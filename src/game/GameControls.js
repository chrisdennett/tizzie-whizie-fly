import React from "react";
import {
  FaPause,
  FaPlay,
  FaArrowDown,
  FaArrowUp,
  FaWindowClose,
} from "react-icons/fa";
import styled from "styled-components";

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
          <Button onClick={onPlay} onTouchStart={onPlay}>
            <FaPlay />
          </Button>
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
            <Button onClick={goUp} onTouchStart={goUp}>
              <FaArrowUp />
            </Button>
          </ButtonHolder>
          <ButtonHolder>
            <Button onClick={goDown} onTouchStart={goDown}>
              <FaArrowDown />
            </Button>
          </ButtonHolder>
          <ButtonHolder>
            <Button onClick={onPlayPauseToggle}>
              {isPaused ? <FaPlay /> : <FaPause />}
            </Button>
          </ButtonHolder>
        </>
      )}

      <ButtonHolder>
        <Button onClick={onEndGame} style={{ fontSize: 34, padding: 15 }}>
          <FaWindowClose />
        </Button>
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
