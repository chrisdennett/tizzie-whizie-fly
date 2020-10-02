import React from "react";

function SketchyGameBox() {
  const strokeColour = `rgba(5, 5, 5, 0.3)`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169 88">
      <path
        fill="none"
        stroke={strokeColour}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.2"
        d="M17 1c8-1 16 0 23 1h60M77 2c8 1 16 0 23-1h0c8-1 16 0 23 1h25a411 411 0 0013 2m-27-1l21-1 4 1c5 1 7 5 7 10v11h0l1 26v12m0-26l-1 25v15c1 3 0 5-2 7l-7 2-17 2h-13m25 0h-26l-23-1-26-1h0-12m23 0l-25 1-22-1c-6-1-16 1-25 2h0-3c-3 0-6-2-8-4m24 4l-16-1c-3 0-7-2-9-4l-3-8 1-14h0L0 36V23m3 27L1 23V13c1-5 5-8 10-9h4l18-1h12M14 4l25-2h48l12 1M76 3h47c8 1 17 0 26-2h8l5 1m-23 2a405 405 0 0022 1c2 2 3 5 4 9v14c0 8 1 15 3 23h0v13m-2-24l-1 24v11c1 4-1 8-4 10h-4l-22 2h-12m25-2l-24 1h0c-8 1-16 0-22-1-7-1-17 0-26 1h0l-13 1m24 1l-22-1h0l-26-1-22-1h0-2c-4 0-7-1-9-4m20 5H12c-3 0-7-1-9-4l-2-6V58h0V20m2 25V21l-1-7C3 8 8 3 14 4h1c8 1 15-1 22-2l12-1M18 2h48l24 2h13M78 1h24l26 1h22l5-1 6 3m-23-1l18-1 6 1c3 2 5 5 4 9l-1 15c0 9 1 16 3 23h0v13m0-24c0 8 0 16-2 24v12c0 4-2 8-5 10h-5l-18 1h-13m25 0c-9 0-16 0-24 2h0c-8 1-17-1-27-1H76h0-13m25 0c-9 1-17 0-27-1h0l-22 2c-6 1-16 0-25-1h0-1c-5 0-8-2-10-5m23 3H14c-4 0-8-2-10-6l-2-4-1-20c-1-8 0-16 1-23h0V19m2 25L1 20l-1-6C0 8 7 3 14 2h1l23-1h12M17 3c8 0 17 0 26-2h24l23 1h12M80 3l23-2h0c7-2 17 0 26 0l24 1h0l2 1c4 0 7 1 9 4m-26-5h17c3 0 5 1 8 3 2 2 3 5 3 8l1 17h0l1 24v12m0-25l-1 23v10a14 14 0 01-13 13h-32m26 0h-25 0c-8 1-16 0-23-1l-26-1-13 1m26 0c-7 0-16 0-26 2h0c-9 1-16-1-25-3h0c-8-1-15 1-22 2 0 0 0 0 0 0s0 0 0 0c-3 0-7-2-9-6m21 4H14c-5 0-10-2-12-6l-1-4c-1-7 1-13 1-19h0L1 32V20m0 25l2-26v-7C3 6 8 1 13 1h1c8-1 16 0 24 2h12"
        overflow="visible"
        paintOrder="markers fill stroke"
      ></path>
    </svg>
  );
}

export default SketchyGameBox;
