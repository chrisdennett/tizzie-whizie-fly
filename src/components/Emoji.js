import React from "react";

export const Emoji = ({ symbol, name }) => (
  <span role="img" aria-label={name}>
    {symbol}
  </span>
);
