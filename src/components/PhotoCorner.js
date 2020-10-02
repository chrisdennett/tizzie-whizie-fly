import React from "react";

function PhotoCorner({ flipH, flipV }) {
  const svgSize = 13.2;
  let transform = "";

  if (flipH && flipV)
    transform = `scale(-1, -1) translate(-${svgSize}, -${svgSize})`;
  else if (flipH) transform = `scale(-1, 1) translate(-${svgSize}, 0)`;
  else if (flipV) transform = `scale(1, -1) translate(0, -${svgSize})`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13.2 13.2"
      width="40"
      height="40"
    >
      <g transform={transform}>
        <path
          fill="#decd87"
          fillOpacity="0.5"
          d="M0 0h13.2A42.2 42.2 0 000 13.2z"
          color="#000"
          overflow="visible"
          paintOrder="markers fill stroke"
        ></path>
      </g>
    </svg>
  );
}

export default PhotoCorner;
