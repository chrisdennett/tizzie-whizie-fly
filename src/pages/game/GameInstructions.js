import React from "react";
import styled from "styled-components";
import { FaArrowUp, FaArrowDown, FaTrophy } from "react-icons/fa";
import { CallToActionButton } from "../../components/CallToActionButton";
import { RoundButton } from "./gameControls/RoundButtons";

const GameInstructions = ({
  onPlay,
  onHelp,
  onFullScreen,
  fullScreenActive,
  onExitFullScreen,
  onCloseGame
}) => {
  return (
    <InstructionsPanel>
      <Instructions>
        <h2>How to Play</h2>
        <p>
          Use <FaArrowUp /> and <FaArrowDown /> arrow buttons (or keys) to avoid
          the obstacles, score points and collect cards.
        </p>
        <p>
          Fly the full length of Windermere to WIN! <FaTrophy />
        </p>
        <ul>
          {!fullScreenActive && (
            <li>
              <RoundButton
                type="fullscreen"
                height={40}
                onClick={onFullScreen}
              />
              Use full screen. (Press it now!)
            </li>
          )}
          {fullScreenActive && (
            <li>
              <RoundButton
                type="closeFullscreen"
                height={40}
                onClick={onExitFullScreen}
              />
              Exit full screen mode.
            </li>
          )}
          <li>
            <RoundButton type="close" height={40} onClick={onCloseGame} />
            End the game
          </li>
          <li>
            <RoundButton type="play" height={40} onClick={onPlay} /> Play /
            Pause.
          </li>
          <li>
            <RoundButton type="help" height={40} onClick={onHelp} /> Show this
            screen again.
          </li>
        </ul>

        <CallToActionButton onClick={onPlay}>START GAME</CallToActionButton>
      </Instructions>
    </InstructionsPanel>
  );
};

export default GameInstructions;

const InstructionsPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  z-index: 100;
  padding: 2%;
`;

const Instructions = styled.div`
  padding: 4% 3% 4% 6%;
  max-width: 450px;
  background-color: whitesmoke;
  margin: auto;
  text-align: center;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

  h2 {
    margin-top: 0;
  }

  p {
    text-align: left;
  }

  ul {
    text-align: left;
    padding-left: 20px;
    list-style-type: none;

    li {
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      svg {
        margin-right: 10px;
      }
    }
  }
`;
