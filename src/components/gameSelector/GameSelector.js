import React from "react";
import { Link } from "@reach/router";

const GameSelector = ({ gameCreated }) => {
  return (
    <div>
      {gameCreated && (
        <div>
          <h2>Use your own artwork</h2>
          <Link to="/playgame">Play your game</Link>
        </div>
      )}

      <h2>Draw {gameCreated ? "New" : "Your Own"} Game Art</h2>
      <Link to="/drawgame">HERE</Link>

      <h3>Or use one we made earlier</h3>
      <ul>
        <li>Collage</li>
        <li>Pablo Picasso</li>
        <li>Piet Mondrian</li>
        <li>Charcoal</li>
      </ul>
    </div>
  );
};

export default GameSelector;
