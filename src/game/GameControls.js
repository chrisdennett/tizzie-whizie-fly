import React from "react";

const GameControls = ({
  gameState,
  isPaused,
  firstGameStarted,
  showGameControls,
  onPlay,
  replay,
  onPlayPauseToggle,
  goUp,
  goDown,
}) => {
  return (
    <div>
      {!firstGameStarted && (
        <div>
          <button
            onClick={onPlay}
            onTouchStart={onPlay}
            style={{ cursor: "pointer", padding: 20 }}
          >
            PLAY
          </button>
        </div>
      )}

      {gameState.gameOver && (
        <div>
          <button
            onClick={replay}
            onTouchStart={replay}
            style={{ cursor: "pointer", padding: 20 }}
          >
            REPLAY
          </button>
        </div>
      )}

      {showGameControls && (
        <div>
          <button
            onClick={goUp}
            onTouchStart={goUp}
            style={{ cursor: "pointer", padding: 20 }}
          >
            UP
          </button>
          <button
            onClick={onPlayPauseToggle}
            style={{ cursor: "pointer", padding: 20 }}
          >
            {isPaused ? "PLAY" : "PAUSE"}
          </button>
          <button
            onClick={goDown}
            onTouchStart={goDown}
            style={{ cursor: "pointer", padding: 20 }}
          >
            DIVE
          </button>
        </div>
      )}
    </div>
  );
};

export default GameControls;
