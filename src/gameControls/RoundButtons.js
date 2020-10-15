import React from "react";
import styled from "styled-components";

export const RoundButton = ({ onClick, type }) => {
  return (
    <SVGButton
      viewBox="0 0 16.07 15.9"
      width={50}
      height={50}
      onClick={onClick}
    >
      {type === "play" && (
        <g
          id="play"
          fillOpacity="1"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeWidth="0.26"
          color="#000"
          paintOrder="markers fill stroke"
        >
          <path
            fill="#ececec"
            stroke="#000"
            strokeDashoffset="0"
            strokeOpacity="0.32"
            d="M15.67 8c0 .52.05.93-.05 1.42-.1.5-.3 1.05-.5 1.52s-.38.89-.67 1.31c-.28.42-.57.84-.94 1.2s-.71.58-1.13.86c-.43.29-1.08.4-1.55.6-.47.2-.85.35-1.35.45-.5.1-1.1.4-1.62.4s-1.08-.16-1.58-.25c-.5-.1-.9-.4-1.37-.58-.48-.2-.96-.46-1.4-.74-.42-.28-.6-.58-.97-.94-.36-.36-.83-.69-1.11-1.1-.29-.43-.6-.8-.8-1.27-.2-.47-.19-1.02-.3-1.52-.09-.5-.2-1-.2-1.51S.3 7.03.4 6.53c.1-.5-.01-1.27.18-1.74.2-.47.46-.91.75-1.33.28-.42.68-.69 1.05-1.05A7.68 7.68 0 015.08.63C5.55.43 6.05.4 6.55.3S7.5.28 8.02.28c.51 0 1.11-.22 1.61-.12s.9.44 1.37.63c.47.2.92.47 1.35.76.42.28.69.4 1.05.76.37.36.83.79 1.11 1.2.29.43.42 1.02.62 1.5.2.46.43 1 .53 1.5.1.5.08.9.08 1.4"
          ></path>
          <path
            fill="#fff"
            stroke="#999"
            strokeOpacity="1"
            d="M5.82 11.7s-.24-.73-.24-1.84c0-.59.05-1.25.05-1.92 0-.67.14-1.46.14-2.05 0-1.11.12-1.7.12-1.7s.2.26 1 .81c.43.3.98.59 1.47.93.48.33 1.2.9 1.63 1.2.8.55 1.2.6 1.2.6s-.4.77-1.21 1.32c-.43.3-1.12.44-1.6.78-.5.33-1.05.75-1.48 1.04-.8.56-1.08.83-1.08.83"
          ></path>
        </g>
      )}

      {type === "close" && (
        <g
          id="close"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          color="#000"
          paintOrder="markers fill stroke"
        >
          <path
            id="path11110"
            fill="#000"
            fillOpacity="0.35"
            stroke="#000"
            strokeDashoffset="0"
            strokeOpacity="0.32"
            strokeWidth="0.26"
            d="M15.67 8c0 .52.05.93-.05 1.42-.1.5-.3 1.05-.5 1.52s-.38.89-.67 1.31c-.28.42-.57.84-.94 1.2s-.71.58-1.13.86c-.43.29-1.08.4-1.55.6-.47.2-.85.35-1.35.45-.5.1-1.1.4-1.62.4s-1.08-.16-1.58-.25c-.5-.1-.9-.4-1.37-.58-.48-.2-.96-.46-1.4-.74-.42-.28-.6-.58-.97-.94-.36-.36-.83-.69-1.11-1.1-.29-.43-.6-.8-.8-1.27-.2-.47-.19-1.02-.3-1.52-.09-.5-.2-1-.2-1.51S.3 7.03.4 6.53c.1-.5-.01-1.27.18-1.74.2-.47.46-.91.75-1.33.28-.42.68-.69 1.05-1.05A7.68 7.68 0 015.08.63C5.55.43 6.05.4 6.55.3S7.5.28 8.02.28c.51 0 1.11-.22 1.61-.12s.9.44 1.37.63c.47.2.92.47 1.35.76.42.28.69.4 1.05.76.37.36.83.79 1.11 1.2.29.43.42 1.02.62 1.5.2.46.43 1 .53 1.5.1.5.08.9.08 1.4"
            opacity="1"
            overflow="visible"
          ></path>
          <path
            id="path1452"
            fill="#eaeaea"
            fillOpacity="1"
            stroke="#fff"
            strokeOpacity="1"
            strokeWidth="0.53"
            d="M4.76 4.77l6.36 6.36"
            opacity="1"
            overflow="visible"
          ></path>
          <path
            id="path1456"
            fill="#eaeaea"
            fillOpacity="1"
            stroke="#fff"
            strokeOpacity="1"
            strokeWidth="0.53"
            d="M11.12 4.77l-6.36 6.36"
            opacity="1"
            overflow="visible"
          ></path>
        </g>
      )}

      {type === "help" && (
        <g
          id="help"
          stroke="#000"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeOpacity="0.32"
          strokeWidth="0.26"
          color="#000"
          fontSize="13.45"
          fontStretch="normal"
          fontStyle="normal"
          fontVariant="normal"
          fontWeight="400"
          paintOrder="markers fill stroke"
          writingMode="lr-tb"
        >
          <path
            id="path8640"
            fill="#ececec"
            fillOpacity="1"
            strokeDashoffset="0"
            d="M15.67 7.9c0-.52.05-.93-.05-1.42-.1-.5-.3-1.05-.5-1.52a7.73 7.73 0 00-1.62-2.5c-.36-.37-.7-.6-1.12-.87-.43-.28-1.08-.4-1.55-.6-.47-.2-.85-.35-1.35-.45-.5-.1-1.1-.4-1.62-.4S6.78.3 6.28.38c-.5.1-.9.4-1.37.59-.48.19-.96.45-1.4.73-.42.28-.6.58-.97.94-.36.37-.83.69-1.11 1.1-.29.43-.6.8-.8 1.27-.2.47-.19 1.02-.3 1.52-.09.5-.2 1-.2 1.51s.16.82.26 1.32c.1.5-.01 1.27.18 1.74.2.47.46.91.75 1.33.28.42.68.69 1.05 1.05a7.68 7.68 0 002.71 1.78c.47.2.97.22 1.47.32s.95.03 1.47.03c.51 0 1.11.22 1.61.12s.9-.44 1.37-.63c.47-.2.92-.47 1.35-.76.42-.28.69-.4 1.05-.76.37-.36.83-.79 1.11-1.2.29-.43.42-1.02.62-1.5.2-.46.43-1 .53-1.5.1-.5.08-.9.08-1.4"
            fontFamily="Arial"
            opacity="0.99"
            overflow="visible"
            style={{
              lineHeight: "125%",
              InkscapeFontSpecification: "'Arial, Normal'",
              fontVariantLigatures: "normal",
              fontVariantCaps: "normal",
              fontVariantNumeric: "normal",
              fontVariantEastAsian: "normal",
            }}
          ></path>
          <path
            id="path11139"
            fill="#fff"
            d="M4.44 6.07c0-.4.2-.74.47-1.15.28-.4.72-.8 1.26-1.08a4.26 4.26 0 013.62-.1c.51.22.83.58 1.1.96.28.39.43.9.43 1.35 0 .36-.04.6-.2.87-.15.27-.26.42-.48.62-.22.19-.6.64-1.16 1.1-.16.13-.34.27-.43.37-.1.1-.23.14-.28.23-.04.08.03.15 0 .24l-.1.37c-.08.44-.52.78-.98.78-.24 0-.42-.25-.59-.39-.16-.14-.13-.29-.13-.57 0-.35-.01-.67.1-.93.13-.26.25-.42.45-.61.2-.2.55-.49.89-.75.3-.24.38-.43.51-.55.13-.12.35-.28.43-.43.1-.14.21-.2.21-.37 0-.34-.3-.57-.57-.8-.27-.23-.63-.5-1.06-.5-.5 0-.76.25-1 .48-.24.23-.45.53-.62.99-.15.47-.48.76-.92.76-.25 0-.5-.23-.68-.4-.17-.17-.3-.33-.3-.53zm3.47 6.87c-.27 0-.51-.08-.72-.25-.21-.17-.43-.28-.43-.58 0-.26.24-.53.44-.71.2-.18.32-.38.61-.38s.52.26.72.44c.2.18.26.23.26.5 0 .28-.08.65-.29.82-.2.16-.4.26-.67.26z"
            fontFamily="Arial Rounded MT Bold"
            opacity="1"
            style={{
              lineHeight: "125%",
              InkscapeFontSpecification: "'Arial Rounded MT Bold, Normal'",
              fontVariantLigatures: "normal",
              fontVariantCaps: "normal",
              fontVariantNumeric: "normal",
              fontVariantEastAsian: "normal",
            }}
          ></path>
        </g>
      )}

      {type === "fullscreen" && (
        <g
          id="fullscreen"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          color="#000"
          paintOrder="markers fill stroke"
        >
          <path
            id="path8678"
            fill="#ececec"
            fillOpacity="1"
            stroke="#000"
            strokeDashoffset="0"
            strokeOpacity="0.32"
            strokeWidth="0.26"
            d="M14.87 4.09c.25.44.5.78.65 1.26.17.48.27 1.05.34 1.55a7.73 7.73 0 01-.14 2.98c-.14.5-.33.87-.56 1.32-.23.46-.72.89-1.04 1.3-.31.4-.56.72-.94 1.05-.39.34-.76.91-1.2 1.17-.45.26-1.02.4-1.5.56-.48.17-.97.12-1.48.19-.5.06-1.06.08-1.57.05-.5-.03-.82-.2-1.32-.33-.5-.13-1.06-.17-1.51-.4-.46-.22-.93-.38-1.33-.69-.4-.3-.67-.79-1-1.17-.34-.38-.69-.76-.94-1.2-.26-.45-.28-.8-.44-1.27-.16-.49-.65-1.1-.7-1.6a7.76 7.76 0 01-.03-1.53c.04-.5.25-.94.39-1.43A7.68 7.68 0 012 3c.31-.4.73-.67 1.12-1.01.38-.34.8-.5 1.25-.76.45-.26.86-.75 1.34-.92.49-.16.99-.06 1.5-.13C7.7.11 8.24.13 8.76.16c.5.03.79 0 1.29.13s1.1.27 1.56.5c.46.21.88.66 1.28.97.4.3.88.66 1.22 1.05.33.37.5.72.76 1.17"
            opacity="1"
            overflow="visible"
          ></path>
          <g
            id="g6936"
            stroke="#a6a6a6"
            strokeOpacity="1"
            strokeWidth="0.28"
            transform="matrix(-.95727 0 0 .9608 239.16 -41.16)"
          >
            <path
              id="rect1219"
              fill="#fff"
              d="M238.59 48.66s.34.04 1.02.04c.35 0 .81-.18 1.23-.18h1.39c.42 0 .62.15.96.15.69 0 1.24-.1 1.24-.1s.18.7.18 1.27c0 .3-.08.38-.08.73 0 .32-.1.57-.1.9 0 .34-.14.66-.14.95 0 .57.1 1.3.1 1.3s-.57-.25-1.26-.25c-.34 0-.56.15-.97.15-.39 0-.91.05-1.3.05-.41 0-.52-.14-.87-.14l-1.47-.02s.15-.21.15-.78v-.94c0-.32-.1-1.03-.1-1.35 0-.34.03-.6.03-.9l-.01-.88"
              opacity="1"
              overflow="visible"
            ></path>
            <g id="g11090" transform="translate(-.02 -.05)">
              <path
                id="path6903"
                fill="#fff"
                d="M246.15 46.96l-.34.01c-.1 0-.19-.04-.3-.03-.18 0-.35.05-.35.05"
                opacity="1"
                overflow="visible"
              ></path>
              <path
                id="path11086"
                fill="none"
                d="M244.5 48.66s.17-.3.47-.6c.18-.19.46-.34.64-.52l.55-.55-.02.41.03.36v.31"
                opacity="1"
                overflow="visible"
              ></path>
            </g>
            <g id="g11096" transform="matrix(1 0 0 -1 -.06 102.43)">
              <path
                id="path11092"
                fill="#fff"
                d="M246.15 46.96l-.34.01c-.1 0-.19-.04-.3-.03-.18 0-.35.05-.35.05"
                opacity="1"
                overflow="visible"
              ></path>
              <path
                id="path11094"
                fill="none"
                d="M244.5 48.66s.17-.3.47-.6c.18-.19.46-.34.64-.52l.55-.55-.02.41.03.36v.31"
                opacity="1"
                overflow="visible"
              ></path>
            </g>
            <g id="g11102" transform="matrix(-1 0 0 1 483.12 -.02)">
              <path
                id="path11098"
                fill="#fff"
                d="M246.15 46.96l-.34.01c-.1 0-.19-.04-.3-.03-.18 0-.35.05-.35.05"
                opacity="1"
                overflow="visible"
              ></path>
              <path
                id="path11100"
                fill="none"
                d="M244.5 48.66s.17-.3.47-.6c.18-.19.46-.34.64-.52l.55-.55-.02.41.03.36v.31"
                opacity="1"
                overflow="visible"
              ></path>
            </g>
            <g id="g11108" transform="rotate(180 241.5 51.12)">
              <path
                id="path11104"
                fill="#fff"
                d="M246.15 46.96l-.34.01c-.1 0-.19-.04-.3-.03-.18 0-.35.05-.35.05"
                opacity="1"
                overflow="visible"
              ></path>
              <path
                id="path11106"
                fill="none"
                d="M244.5 48.66s.17-.3.47-.6c.18-.19.46-.34.64-.52l.55-.55-.02.41.03.36v.31"
                opacity="1"
                overflow="visible"
              ></path>
            </g>
          </g>
        </g>
      )}

      {type === "pause" && (
        <g
          id="pause"
          fillOpacity="1"
          strokeDasharray="none"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeWidth="0.26"
          color="#000"
          paintOrder="markers fill stroke"
        >
          <path
            id="path12630"
            fill="#ececec"
            stroke="#000"
            strokeOpacity="0.32"
            d="M15.67 8c0 .52.05.93-.05 1.42-.1.5-.3 1.05-.5 1.52s-.38.89-.67 1.31c-.28.42-.57.84-.94 1.2s-.71.58-1.13.86c-.43.29-1.08.4-1.55.6-.47.2-.85.35-1.35.45-.5.1-1.1.4-1.62.4s-1.08-.16-1.58-.25c-.5-.1-.9-.4-1.37-.58-.48-.2-.96-.46-1.4-.74-.42-.28-.6-.58-.97-.94-.36-.36-.83-.69-1.11-1.1-.29-.43-.6-.8-.8-1.27-.2-.47-.19-1.02-.3-1.52-.09-.5-.2-1-.2-1.51S.3 7.03.4 6.53c.1-.5-.01-1.27.18-1.74.2-.47.46-.91.75-1.33.28-.42.68-.69 1.05-1.05A7.68 7.68 0 015.08.63C5.55.43 6.05.4 6.55.3S7.5.28 8.02.28c.51 0 1.11-.22 1.61-.12s.9.44 1.37.63c.47.2.92.47 1.35.76.42.28.69.4 1.05.76.37.36.83.79 1.11 1.2.29.43.42 1.02.62 1.5.2.46.43 1 .53 1.5.1.5.08.9.08 1.4"
            opacity="1"
            overflow="visible"
          ></path>
          <g
            id="g12656"
            fill="#fff"
            stroke="#999"
            strokeOpacity="1"
            transform="translate(-233.62 -135.84)"
          >
            <path
              id="path12626"
              d="M239.9 139.86c.52 0 .96.05.96.1s-.14.62-.15.99c-.01.36.1.8.1 1.19.02.39-.03.67-.03 1.14 0 .47.08 1.18.08 1.68s.07 1.03.07 1.46c0 .43-.08 1.06-.07 1.11 0 .06-.3.08-.54.1l-.88.1c-.24.02-.88-.14-.88-.2v-1.14c0-.41-.05-.73-.05-1.3 0-.57.02-1.54.05-2.12.04-.58.06-.7.06-1.21 0-.5-.29-1.67-.06-1.8.24-.13.83-.1 1.35-.1z"
              opacity="1"
              overflow="visible"
              stopColor="#000"
              stopOpacity="1"
              style={{ fontVariationSettings: "normal" }}
              vectorEffect="none"
            ></path>
            <path
              id="path12652"
              d="M243.2 147.72c-.51 0-.95-.04-.95-.1 0-.05.14-.62.15-.98.01-.37-.1-.8-.1-1.2-.02-.38.03-.66.03-1.14 0-.47-.08-1.18-.08-1.68.01-.5-.07-1.03-.07-1.46 0-.43.08-1.06.07-1.11 0-.05.3-.08.54-.1l.88-.1c.24-.02.88.15.88.2v1.14c0 .41.05.74.05 1.3 0 .58-.02 1.54-.05 2.12-.04.58-.05.71-.06 1.21 0 .5.29 1.67.06 1.8-.23.14-.83.1-1.35.1z"
              opacity="1"
              overflow="visible"
              stopColor="#000"
              stopOpacity="1"
              style={{ fontVariationSettings: "normal" }}
              vectorEffect="none"
            ></path>
          </g>
        </g>
      )}

      {type === "closeFullscreen" && (
        <g
          id="layer9"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          color="#000"
          paintOrder="markers fill stroke"
        >
          <path
            id="path8678-9"
            fill="#ececec"
            fillOpacity="1"
            stroke="#000"
            strokeDashoffset="0"
            strokeOpacity="0.32"
            strokeWidth="0.26"
            d="M14.87 4.09c.25.44.5.78.65 1.26.17.48.27 1.05.34 1.55a7.73 7.73 0 01-.14 2.98c-.14.5-.33.87-.56 1.32-.23.46-.72.89-1.04 1.3-.31.4-.56.72-.94 1.05-.39.34-.76.91-1.2 1.17-.45.26-1.02.4-1.5.56-.48.17-.97.12-1.48.19-.5.06-1.06.08-1.57.05-.5-.03-.82-.2-1.32-.33-.5-.13-1.06-.17-1.51-.4-.46-.22-.93-.38-1.33-.69-.4-.3-.67-.79-1-1.17-.34-.38-.69-.76-.94-1.2-.26-.45-.28-.8-.44-1.27-.16-.49-.65-1.1-.7-1.6a7.76 7.76 0 01-.03-1.53c.04-.5.25-.94.39-1.43A7.68 7.68 0 012 3c.31-.4.73-.67 1.12-1.01.38-.34.8-.5 1.25-.76.45-.26.86-.75 1.34-.92.49-.16.99-.06 1.5-.13C7.7.11 8.24.13 8.76.16c.5.03.79 0 1.29.13s1.1.27 1.56.5c.46.21.88.66 1.28.97.4.3.88.66 1.22 1.05.33.37.5.72.76 1.17"
            opacity="1"
            overflow="visible"
          ></path>
          <path
            id="rect1219-4"
            fill="#fff"
            stroke="#a6a6a6"
            strokeOpacity="1"
            strokeWidth="0.26"
            d="M10.45 5.86s-.3.04-.87.04c-.3 0-.69-.16-1.04-.16H7.36c-.36 0-.53.13-.82.13-.58 0-1.05-.09-1.05-.09s-.15.6-.15 1.1c0 .24.06.31.06.6 0 .28.1.5.1.77 0 .3.1.57.1.81 0 .49-.08 1.11-.08 1.11s.49-.21 1.07-.21c.3 0 .48.13.83.13.33 0 .77.04 1.1.04.35 0 .44-.12.73-.12l1.25-.02s-.12-.18-.12-.66v-.8c0-.27.08-.88.08-1.15 0-.3-.03-.52-.03-.76 0-.48.02-.76.02-.76"
            opacity="1"
            overflow="visible"
          ></path>
          <g
            id="g11090-2"
            stroke="#a6a6a6"
            strokeOpacity="1"
            strokeWidth="0.28"
            transform="matrix(-.95727 0 0 -.9608 246.6 50.64)"
          >
            <path
              id="path6903-8"
              fill="#fff"
              d="M246.15 46.96l-.34.01c-.1 0-.19-.04-.3-.03-.18 0-.35.05-.35.05"
              opacity="1"
              overflow="visible"
            ></path>
            <path
              id="path11086-2"
              fill="none"
              d="M244.5 48.66s.17-.3.47-.6c.18-.19.46-.34.64-.52l.55-.55-.02.41.03.36v.31"
              opacity="1"
              overflow="visible"
            ></path>
          </g>
          <g
            id="g11096-7"
            stroke="#a6a6a6"
            strokeOpacity="1"
            strokeWidth="0.28"
            transform="matrix(-.95727 0 0 .9608 246.63 -34.6)"
          >
            <path
              id="path11092-7"
              fill="#fff"
              d="M246.15 46.96l-.34.01c-.1 0-.19-.04-.3-.03-.18 0-.35.05-.35.05"
              opacity="1"
              overflow="visible"
            ></path>
            <path
              id="path11094-9"
              fill="none"
              d="M244.5 48.66s.17-.3.47-.6c.18-.19.46-.34.64-.52l.55-.55-.02.41.03.36v.31"
              opacity="1"
              overflow="visible"
            ></path>
          </g>
          <g
            id="g11102-0"
            stroke="#a6a6a6"
            strokeOpacity="1"
            strokeWidth="0.28"
            transform="matrix(.95727 0 0 -.9608 -230.72 50.66)"
          >
            <path
              id="path11098-6"
              fill="#fff"
              d="M246.15 46.96l-.34.01c-.1 0-.19-.04-.3-.03-.18 0-.35.05-.35.05"
              opacity="1"
              overflow="visible"
            ></path>
            <path
              id="path11100-2"
              fill="none"
              d="M244.5 48.66s.17-.3.47-.6c.18-.19.46-.34.64-.52l.55-.55-.02.41.03.36v.31"
              opacity="1"
              overflow="visible"
            ></path>
          </g>
          <g
            id="g11108-4"
            stroke="#a6a6a6"
            strokeOpacity="1"
            strokeWidth="0.28"
            transform="matrix(.95727 0 0 .9608 -230.6 -34.53)"
          >
            <path
              id="path11104-7"
              fill="#fff"
              d="M246.15 46.96l-.34.01c-.1 0-.19-.04-.3-.03-.18 0-.35.05-.35.05"
              opacity="1"
              overflow="visible"
            ></path>
            <path
              id="path11106-8"
              fill="none"
              d="M244.5 48.66s.17-.3.47-.6c.18-.19.46-.34.64-.52l.55-.55-.02.41.03.36v.31"
              opacity="1"
              overflow="visible"
            ></path>
          </g>
        </g>
      )}
    </SVGButton>
  );
};

const SVGButton = styled.svg`
  cursor: pointer;
`;
