import React from "react";
import { animated } from "react-spring";
import useBoop from "../hooks/useBoop";

export const Boop = ({ children }) => {
  const boopConfig = {
    rotation: 1,
  };

  const [style, trigger] = useBoop(boopConfig);

  return (
    <animated.div onMouseEnter={trigger} style={style}>
      {children}
    </animated.div>
  );
};
