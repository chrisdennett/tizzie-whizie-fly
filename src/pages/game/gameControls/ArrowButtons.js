import React from "react";
import styled from "styled-components";

export const ArrowButton = ({ type, onClick, hideBorder }) => {
  return (
    <SVGButton
      viewBox={`0 0 15.87 30.91`}
      width={45}
      height="100%"
      onClick={onClick}
    >
      <g
        fill="gray"
        fillOpacity="0.1"
        stroke="#000"
        strokeDasharray="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeOpacity="0.3"
        strokeWidth="0.3"
        color="#000"
        overflow="visible"
        paintOrder="markers fill stroke"
      >
        {type === "up" && (
          <g id="upArrow">
            {!hideBorder && (
              <path d="M5.18.5C6.45.5 7.5.47 8.76.47l2.17-.33 1.81.24c.33 0 .65.22.95.32.3.1.51.1.77.3.51.42.83.74 1.02 1.35.1.31.2.9.2 1.25v4.6l-.09 4.92-.07 4.78.19 4.6.03 4.79c0 .35-.12.52-.21.83-.33 1-1.12 2.14-2 2.46-.3.1-.57 0-.9 0-1.26 0-2.58.2-3.84.2l-1.86-.2-1.82-.13-1.95.06c-.32 0-.7.08-1-.02-.3-.1-.42-.14-.67-.33A4.04 4.04 0 01.27 28.4c-.1-.31.02-.55.01-.9l-.13-4.85.02-4.72-.04-4.69.03-4.73.05-4.87c0-.34-.01-.84.08-1.16.22-.66.57-.88 1.06-1.26.25-.2.6-.63.9-.74 2.01 0 .43-.2 2.93.02z"></path>
            )}
            <path
              fill="#fff"
              fillOpacity="1"
              d="M7.8 9.3c-.03 0-.1.06-.12.08l-.6.52-.31.45s-.39.46-1 1.08c-.34.33-.78.63-1.16 1-.37.38-.8.76-1.12 1.09-.62.62-1.01 1.16-1.01 1.16-.09.1.15.5.54.9l.3.35c.38.4.9.7.98.61 0 0 .55-.7 1.13-1.27.57-.58 1.08-1.13 1.08-1.13s.08.87.08 1.9l-.02 1.63c0 .62.08 1.24.08 1.78 0 1.03-.07 1.9-.07 1.9 0 .13.35.26.9.26l.7-.13c.54 0 1.01-.12 1.01-.25 0 0-.02-.57-.02-1.6 0-.54.04-1.23.04-1.85 0-.62-.14-1.23-.14-1.77 0-1.03.04-1.84.04-1.84s.59.52 1.16 1.1c.58.58 1.13 1.3 1.13 1.3.08.08.54-.25.93-.63l.44-.33c.39-.38.72-.76.63-.85 0 0-.51-.62-1.13-1.24-.33-.33-.76-.62-1.13-1-.38-.37-.7-.81-1.03-1.14-.61-.62-1.19-1.09-1.19-1.09l-.32-.47-.5-.46c-.03-.03-.09 0-.16.03a1.5 1.5 0 00-.2-.05l-.01-.02"
            ></path>
          </g>
        )}

        {type === "down" && (
          <g id="downArrow">
            {!hideBorder && (
              <path d="M10.7 30.4c-1.27 0-2.32.05-3.58.05l-2.18.33-1.8-.24c-.33 0-.66-.22-.95-.32-.3-.1-.52-.1-.77-.3C.9 29.5.59 29.19.4 28.58c-.1-.32-.2-.9-.2-1.25v-4.6l.08-4.92.07-4.78-.18-4.6-.04-4.79c0-.35.12-.52.22-.83.32-1 1.11-2.14 2-2.46.3-.1.56 0 .89 0 1.26 0 2.58-.2 3.85-.2l1.86.2 1.81.13L12.71.4c.32-.01.71-.08 1 .02.3.1.42.13.67.33A4.04 4.04 0 0115.6 2.5c.1.31-.02.55-.01.9l.14 4.85-.02 4.72.03 4.69-.02 4.73-.05 4.86c0 .35 0 .85-.09 1.17-.21.66-.56.88-1.05 1.26-.25.2-.6.63-.9.73-2.02 0-.43.21-2.94 0z"></path>
            )}
            <path
              fill="#fff"
              fillOpacity="1"
              d="M8.07 21.61c.03 0 .11-.06.13-.08l.6-.52.3-.45s.4-.46 1.01-1.08c.33-.33.78-.63 1.15-1l1.13-1.09c.61-.62 1-1.16 1-1.16.1-.1-.14-.5-.53-.9l-.3-.35c-.39-.4-.9-.7-.99-.61 0 0-.54.7-1.12 1.27-.58.58-1.08 1.13-1.08 1.13s-.08-.87-.08-1.9l.01-1.64c0-.61-.08-1.23-.08-1.77 0-1.03.07-1.9.07-1.9 0-.13-.34-.26-.9-.26l-.69.12c-.55 0-1.01.13-1.01.26 0 0 .02.57.02 1.6 0 .54-.04 1.23-.04 1.85 0 .62.13 1.23.13 1.77 0 1.03-.04 1.84-.04 1.84s-.58-.53-1.16-1.1c-.57-.58-1.12-1.3-1.12-1.3-.09-.09-.54.24-.93.63l-.44.32c-.4.4-.72.77-.64.86 0 0 .52.62 1.13 1.24.33.33.76.61 1.14.99.37.37.7.82 1.02 1.15.62.62 1.2 1.09 1.2 1.09l.31.47.5.46c.03.03.1 0 .17-.04l.2.06v.02"
            ></path>
          </g>
        )}
      </g>
    </SVGButton>
  );
};

const SVGButton = styled.svg`
  cursor: pointer;
`;
