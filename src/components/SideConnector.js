import React from "react";

export const SideConnectorLeft = ({ isGreen = false, className }) => {
  const fillOne = isGreen ? "#008033" : "#a00";
  const fillTwo = isGreen ? "#71c837" : "red";

  return (
    <svg viewBox="0 0 14.33 17.28" height={65} className={className}>
      <g
        strokeDasharray="none"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeWidth="0.53"
        color="#000"
        paintOrder="markers fill stroke"
        transform="translate(-13.24 -7.12)"
      >
        <path
          fill="none"
          fillOpacity="0.99"
          stroke="#000"
          strokeLinecap="square"
          strokeOpacity="1"
          d="M15.98 19.33c-1.25-4.36 7.88-2.88 4.2-.8-2.93 1.67-3.91-6.1 1.02-6.15"
          overflow="visible"
          stopColor="#000"
        ></path>
        <rect
          width="2.64"
          height="3.96"
          x="14.47"
          y="19.24"
          fill={fillTwo}
          fillOpacity="0.99"
          stroke="#000"
          strokeLinecap="round"
          strokeOpacity="1"
          overflow="visible"
          rx="1.13"
          ry="1.2"
          stopColor="#000"
        ></rect>
        <path
          fill={fillOne}
          fillOpacity="1"
          stroke="#000"
          strokeLinecap="round"
          strokeOpacity="1"
          d="M14.54 20.99h2.57c.57 0 1.03.9 1.03 2v1.15h-4.63v-1.15c0-1.1.46-2 1.03-2z"
          overflow="visible"
          stopColor="#000"
        ></path>
        <path
          fill={fillOne}
          fillOpacity="0.99"
          stroke="#000"
          strokeLinecap="round"
          strokeOpacity="1"
          d="M25.9 7.96h.25v8.5h-.25a4.33 4.33 0 01-4.46-4.22v-.07c0-2.33 2-4.2 4.46-4.2z"
          overflow="visible"
          stopColor="#000"
        ></path>
        <rect
          width="1.24"
          height="9.75"
          x="26.07"
          y="7.38"
          fill={fillTwo}
          fillOpacity="1"
          stroke="#000"
          strokeLinecap="square"
          strokeOpacity="1"
          overflow="visible"
          rx="4.92"
          ry="0.76"
          stopColor="#000"
        ></rect>
        <path
          fill="#500"
          stroke="#fff"
          strokeLinecap="round"
          d="M24.92 9.1c-.91.23-1.7 1-2.07 1.7"
          overflow="visible"
          stopColor="#000"
        ></path>
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          d="M15.02 21.85c-.4.07-.64.46-.69 1"
          overflow="visible"
          stopColor="#000"
        ></path>
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          d="M22.4 11.47v0"
          overflow="visible"
          stopColor="#000"
        ></path>
      </g>
    </svg>
  );
};

export const SideConnectorRight = ({ isGreen = false, className }) => {
  const fillOne = isGreen ? "#008033" : "#a00";
  const fillTwo = isGreen ? "#71c837" : "red";
  return (
    <svg viewBox="0 0 14.33 17.28" height={65} className={className}>
      <g
        strokeDasharray="none"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeWidth="0.53"
        color="#000"
        paintOrder="markers fill stroke"
        transform="translate(-13.24 -7.12)"
      >
        <path
          fill="none"
          fillOpacity="0.99"
          stroke="#000"
          strokeLinecap="square"
          strokeOpacity="1"
          d="M24.84 19.33c1.25-4.36-7.88-2.88-4.2-.8 2.94 1.67 3.91-6.1-1.02-6.15"
          overflow="visible"
          stopColor="#000"
        ></path>
        <rect
          width="2.64"
          height="3.96"
          x="-26.35"
          y="19.24"
          fill={fillTwo}
          fillOpacity="0.99"
          stroke="#000"
          strokeLinecap="round"
          strokeOpacity="1"
          overflow="visible"
          rx="1.13"
          ry="1.2"
          stopColor="#000"
          transform="scale(-1 1)"
        ></rect>
        <path
          fill={fillOne}
          fillOpacity="1"
          stroke="#000"
          strokeLinecap="round"
          strokeOpacity="1"
          d="M26.28 20.99h-2.57c-.57 0-1.03.9-1.03 2v1.15h4.63v-1.15c0-1.1-.46-2-1.03-2z"
          overflow="visible"
          stopColor="#000"
        ></path>
        <path
          fill={fillOne}
          fillOpacity="0.99"
          stroke="#000"
          strokeLinecap="round"
          strokeOpacity="1"
          d="M14.92 7.96h-.25v8.5h.25a4.33 4.33 0 004.46-4.22v-.07c0-2.33-1.99-4.2-4.46-4.2z"
          overflow="visible"
          stopColor="#000"
        ></path>
        <rect
          width="1.24"
          height="9.75"
          x="-14.75"
          y="7.38"
          fill={fillTwo}
          fillOpacity="1"
          stroke="#000"
          strokeLinecap="square"
          strokeOpacity="1"
          overflow="visible"
          rx="4.92"
          ry="0.76"
          stopColor="#000"
          transform="scale(-1 1)"
        ></rect>
        <path
          fill="#500"
          stroke="#fff"
          strokeLinecap="round"
          d="M15.9 9.1c.91.23 1.7 1 2.07 1.7"
          overflow="visible"
          stopColor="#000"
        ></path>
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          d="M25.8 21.85c.4.07.64.46.69 1"
          overflow="visible"
          stopColor="#000"
        ></path>
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          d="M18.43 11.47v0"
          overflow="visible"
          stopColor="#000"
        ></path>
      </g>
    </svg>
  );
};
