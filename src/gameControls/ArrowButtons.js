import React from "react";
import styled from "styled-components";

export const ArrowButton = ({ type, onClick }) => {
  return (
    <SVGButton viewBox="0 0 16.99 57.37" width={50} onClick={onClick}>
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
            <path d="M5.54.5C6.9.5 8.02.47 9.38.47L11.7.13l1.94.24c.34 0 .7.22 1 .32.33.1.56.1.83.3.56.42.9.74 1.1 1.35.1.31.2.9.2 1.25l.01 9.89-.09 10.21-.08 10.07.2 9.9.04 10.08c0 .34-.13.52-.23.83-.35 1-1.2 2.14-2.15 2.46-.31.1-.6 0-.95 0-1.35 0-2.77.2-4.12.2l-2-.2-1.94-.13-2.09.06c-.34 0-.76.08-1.07-.02-.33-.1-.45-.14-.72-.33a4.05 4.05 0 01-1.3-1.74c-.11-.32 0-.55 0-.9L.16 43.82l.02-10-.04-9.98.03-10.03.05-10.16c0-.34 0-.84.1-1.16.22-.66.6-.88 1.12-1.26.27-.2.65-.63.97-.74 2.16 0 .46-.2 3.14.02z" />
            <path
              fill="#fff"
              fillOpacity="1"
              d="M8.36 22.53c-.03 0-.1.06-.12.08l-.6.52-.31.45s-.4.46-1 1.08c-.34.33-.79.63-1.16 1-.37.38-.8.76-1.12 1.09-.62.62-1.01 1.16-1.01 1.16-.09.09.15.5.54.9l.3.35c.38.39.9.7.98.61 0 0 .55-.7 1.13-1.27.57-.58 1.08-1.14 1.08-1.14s.08.88.08 1.9l-.02 1.64c0 .62.08 1.24.08 1.78 0 1.03-.07 1.9-.07 1.9 0 .13.35.26.9.26l.7-.13c.54 0 1-.12 1-.25l-.01-1.6c0-.54.04-1.23.04-1.85 0-.62-.14-1.23-.14-1.78 0-1.02.04-1.83.04-1.83s.59.52 1.16 1.1c.58.58 1.13 1.3 1.13 1.3.08.08.54-.25.93-.64l.44-.32c.39-.39.72-.76.63-.85 0 0-.51-.62-1.13-1.24-.33-.33-.76-.62-1.13-1-.38-.37-.7-.81-1.03-1.14-.62-.62-1.2-1.09-1.2-1.09l-.3-.47-.51-.47c-.03-.02-.09.01-.16.04a1.5 1.5 0 00-.2-.05l-.01-.02"
            />
          </g>
        )}

        {type === "down" && (
          <g id="downArrow">
            <path d="M5.54 56.86c1.36 0 2.48.05 3.84.05l2.33.32 1.94-.23c.34 0 .7-.22 1-.32.33-.1.56-.1.83-.3.56-.42.9-.74 1.1-1.36.1-.3.2-.9.2-1.24l.01-9.89-.09-10.22-.08-10.06.2-9.9.04-10.08c0-.35-.13-.52-.23-.83-.35-1-1.2-2.14-2.15-2.46-.31-.1-.6 0-.95 0-1.35 0-2.77-.2-4.12-.2l-2 .2-1.94.13L3.38.4c-.34 0-.76-.08-1.07.02-.33.1-.45.13-.72.33A4.05 4.05 0 00.29 2.5c-.11.31 0 .55 0 .9L.16 13.54l.02 10.02-.04 9.97.03 10.03.05 10.15c0 .35 0 .85.1 1.16.22.66.6.89 1.12 1.27.27.2.65.63.97.73 2.16 0 .46.21 3.14-.01z" />
            <path
              fill="#fff"
              fillOpacity="1"
              d="M8.36 34.84c-.03 0-.1-.07-.12-.08l-.6-.52-.31-.45s-.4-.47-1-1.08c-.34-.33-.79-.63-1.16-1-.37-.38-.8-.76-1.12-1.09-.62-.62-1.01-1.16-1.01-1.16-.09-.1.15-.5.54-.9l.3-.35c.38-.4.9-.7.98-.61 0 0 .55.69 1.13 1.27.57.58 1.08 1.13 1.08 1.13s.08-.87.08-1.9l-.02-1.64c0-.62.08-1.23.08-1.77 0-1.03-.07-1.9-.07-1.9 0-.13.35-.26.9-.26l.7.12c.54 0 1 .13 1 .26l-.01 1.6c0 .54.04 1.23.04 1.85 0 .62-.14 1.23-.14 1.77 0 1.03.04 1.84.04 1.84s.59-.53 1.16-1.1c.58-.58 1.13-1.3 1.13-1.3.08-.09.54.24.93.63l.44.32c.39.4.72.77.63.86 0 0-.51.62-1.13 1.24-.33.32-.76.61-1.13.99-.38.37-.7.82-1.03 1.15-.62.62-1.2 1.09-1.2 1.09l-.3.47-.51.46c-.03.03-.09 0-.16-.04a1.5 1.5 0 01-.2.06l-.01.02"
            />
          </g>
        )}
      </g>
    </SVGButton>
  );
};

const SVGButton = styled.svg`
  cursor: pointer;
`;
