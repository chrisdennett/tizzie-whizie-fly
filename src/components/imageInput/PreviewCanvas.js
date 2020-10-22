import React from "react";
import styled from "styled-components";

const PreviewCanvas = ({ source, corners }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c) return null;

    if (source) {
      drawSourceToCanvas(source, c, corners);
    } else {
      const ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
    }
  }, [source, canvasRef, corners]);

  return <StyledCanvas ref={canvasRef} />;
};

export default PreviewCanvas;

const drawSourceToCanvas = (source, canvas, corners) => {
  const { width: sWidth, height: sHeight } = source;

  //   const wToHRatio = 1; //sHeight / sWidth;
  canvas.width = sWidth;
  canvas.height = sHeight;

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

  if (corners) {
    console.log("corners: ", corners);
    const { a, b, c, d } = corners;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(d.x, d.y);
    ctx.closePath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 10;
    ctx.stroke();
  }
};

const StyledCanvas = styled.canvas`
  max-width: 100%;
`;
