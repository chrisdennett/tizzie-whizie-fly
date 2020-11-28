import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
// import useSound from "use-sound";
// import plip from "../../sounds/plip.wav";

export const BubbleButton = ({ children, onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  // const [play] = useSound(plip);

  useEffect(() => {
    if (!isAnimating) return;
    let t = setTimeout(() => setIsAnimating(false), 700);

    return () => {
      clearTimeout(t);
    };
  }, [isAnimating]);

  const onMouseOver = () => {
    setIsAnimating(true);
    // play();
  };

  const onButtClick = () => {
    onClick();
  };

  return (
    <Butt
      className={isAnimating ? "animate" : ""}
      onClick={onButtClick}
      onMouseOver={onMouseOver}
    >
      {children}
    </Butt>
  );
};

const topBubbles = keyframes`
    0% { background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%; }
    50% { background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;}
    100% { background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%; background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%; }
`;

const bottomBubbles = keyframes`
    0%  {   background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;}
    50% {   background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;}
   100% {   background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;    background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;    }
`;

const Butt = styled.button`
  color: rgba(0, 0, 0, 0.85);
  background-color: #78b92cb0;
  font-weight: bold;
  display: inline-block;
  font-size: 1em;
  padding: 1em 2em;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  cursor: pointer;
  position: relative;
  transition: transform ease-in 0.5s, box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px #78b92c;

  &:focus {
    outline: 0;
  }

  &:before,
  &:after {
    position: absolute;
    content: "";
    display: block;
    width: 150%;
    height: 100%;
    left: -20%;
    z-index: -1000;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
  }

  &:before {
    display: none;
    top: -75%;
    background-image: radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, #78b92cb0 20%, transparent 30%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #78b92cb0 15%, transparent 20%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%,
      15% 15%, 10% 10%, 18% 18%;
    //background-position: 0% 80%, -5% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 85% 30%;
  }

  &:after {
    display: none;
    bottom: -75%;
    background-image: radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #78b92cb0 15%, transparent 20%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%),
      radial-gradient(circle, #78b92cb0 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%,
      20% 20%;
    //background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }

  /* background-color: darken(#78b92cb0, 5%); */
  /* box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2); */

  transform: scale(1);
  &.animate {
    transition: transform ease-in 0.1s;

    &:before {
      display: block;
      animation: ${topBubbles} ease-in-out 0.75s forwards;
    }
    &:after {
      display: block;
      animation: ${bottomBubbles} ease-in-out 0.75s forwards;
    }
  }
`;
