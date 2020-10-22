import React from "react";
import styled from "styled-components";

const PreviewCanvas = ({ source }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c) return null;

    if (source) {
      drawSourceToCanvas(source, c);
    } else {
      const ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
    }
  }, [source, canvasRef]);

  return <StyledCanvas ref={canvasRef} />;
};

export default PreviewCanvas;

const drawSourceToCanvas = (source, canvas) => {
  const { width: sWidth, height: sHeight } = source;

  const widthToHeightRatio = sHeight / sWidth;
  canvas.height = canvas.width * widthToHeightRatio;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    source,
    0,
    0,
    sWidth,
    sHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );
};

const StyledCanvas = styled.canvas`
  max-width: 100%;
`;
