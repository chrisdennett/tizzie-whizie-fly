import React from "react";
import styled from "styled-components";
import { AwaitingInput } from "../../components/AwaitingInput";
import { RivotBar } from "../../components/RivotBar";
import {
  SideConnectorLeft,
  SideConnectorRight,
} from "../../components/SideConnector";
// import { Machine } from "../../components/Machine";

const PreviewCanvas = ({
  source,
  gameCanvas,
  corners,
  allMarkers,
  firstInput,
  secondInput,
  isLoading,
}) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c) return null;

    if (source) {
      drawSourceToCanvas(source, c, corners, allMarkers);
    } else {
      const ctx = c.getContext("2d");
      ctx.clearRect(0, 0, c.width, c.height);
    }
  }, [source, canvasRef, corners, allMarkers]);

  return (
    <Container>
      <InputRow>
        <InputContainer>
          <SideConnectorLeft />
          <InputContent>{firstInput}</InputContent>
          <SideConnectorRight />
        </InputContainer>

        <InputContainer>
          <SideConnectorLeft isGreen={true} />
          <InputContent>{secondInput}</InputContent>
          <SideConnectorRight isGreen={true} />
        </InputContainer>
      </InputRow>

      <RivotBar />
      <Holder>
        {!source && !gameCanvas && <AwaitingInput isLoading={isLoading} />}

        {source && <StyledCanvas ref={canvasRef} />}

        {gameCanvas && gameCanvas}
      </Holder>
      <RivotBar />
    </Container>
  );
};

export default PreviewCanvas;

const drawSourceToCanvas = (source, canvas, corners, allMarkers) => {
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

  drawAllMarkers(ctx, allMarkers);
};

const drawAllMarkers = (ctx, allMarkers) => {
  if (!allMarkers) return;

  for (let m of allMarkers) {
    ctx.beginPath();
    for (let i = 0; i < m.corners.length; i++) {
      const c = m.corners[i];

      if (i === 0) {
        ctx.moveTo(c.x, c.y);
      } else {
        ctx.lineTo(c.x, c.y);
      }
    }

    ctx.closePath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.stroke();
  }
};

const Container = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputContainer = styled.div`
  display: flex;
  height: 65px;
  align-items: flex-start;
  padding-left: 10px;
  padding-right: 10px;
`;

const InputContent = styled.div`
  background: white;
  border: 2px solid black;
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 5px;
  border-radius: 5px;
  margin-top: -10px;
  /* height: 42px; */

  button {
    white-space: nowrap;
  }
`;

const Holder = styled.div`
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  border-left: 2px solid black;
  border-right: 2px solid black;
  /* border: 3px solid rgba(0, 0, 0, 0.5); */
  padding: 16px;
  /* border-radius: 15px; */
  margin: 0 10px;
`;

const StyledCanvas = styled.canvas`
  /* width: 100%; */
  /* max-width: 450px; */
  /* background-color: rgba(255, 255, 255, 0.9); */
  border: 3px solid black;
  border-radius: 31px;
  margin: 0;
`;
