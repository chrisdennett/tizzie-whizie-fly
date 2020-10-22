import React from "react";

export const CreateGameStep = ({ spriteData, onCreateGame, setShowGame }) => {
  return (
    <div>
      {!spriteData && <button onClick={onCreateGame}>CREATE GAME</button>}

      {spriteData && (
        <button onClick={() => setShowGame(true)}>PLAY YOUR GAME</button>
      )}
    </div>
  );
};
