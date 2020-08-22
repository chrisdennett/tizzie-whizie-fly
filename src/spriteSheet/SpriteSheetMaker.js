import React, { useState, useRef, useEffect } from "react";
import AR from "../libs/aruco";
import { mapPolygonToCanvas } from "../webGLStuff/webglThings";

const defaultCornerCoords = {
  topLeft: [0.0, 0.0],
  topRight: [1.0, 0.0],
  bottomLeft: [0.0, 1.0],
  bottomRight: [1.0, 1.0],
};

const SpriteSheetMaker = ({ sourceImg }) => {
  const [detector, setDetector] = useState(null);
  const [count, setCount] = useState(0);
  const [markerCorners, setMarkerCorners] = useState(null);
  const sourceCanvasRef = useRef(null);
  const canvasRef = useRef(null);

  const updateCount = () => setCount((prev) => prev + 1);

  useEffect(() => {
    if (markerCorners && sourceCanvasRef && sourceCanvasRef.current) {
      const sourceCanvas = sourceCanvasRef.current;
      const { width: srcW, height: srcH } = sourceCanvas;
      const [a, b, c, d] = markerCorners;

      const webGlCanvas = canvasRef.current;
      const gl = webGlCanvas.getContext("webgl");

      webGlCanvas.width = 1089;
      webGlCanvas.height = 760;

      mapPolygonToCanvas({
        gl,
        image: sourceImg,
        topLeft: [a.x / srcW, a.y / srcH],
        topRight: [b.x / srcW, b.y / srcH],
        bottomRight: [c.x / srcW, c.y / srcH],
        bottomLeft: [d.x / srcW, d.y / srcH],
      });

      const screenCtx = sourceCanvas.getContext("2d");
      screenCtx.strokeStyle = "#00FF00";
      screenCtx.beginPath();
      screenCtx.moveTo(a.x, a.y);
      screenCtx.lineTo(b.x, b.y);
      screenCtx.lineTo(c.x, c.y);
      screenCtx.lineTo(d.x, d.y);
      screenCtx.closePath();
      screenCtx.stroke();
    }
  }, [markerCorners, sourceCanvasRef]);

  useEffect(() => {
    if (sourceCanvasRef && sourceImg) {
      const sourceCanvas = sourceCanvasRef.current;

      if (!detector && AR) {
        const d = new AR.Detector();
        setDetector(d);
      } else {
        drawToCanvas(
          sourceImg,
          sourceCanvas,
          sourceImg.width / 4,
          sourceImg.height / 4
        );
        const ctx = sourceCanvas.getContext("2d");
        const imageData = ctx.getImageData(
          0,
          0,
          sourceCanvas.width,
          sourceCanvas.height
        );

        var markers = detector.detect(imageData);

        if (markers.length > 0) {
          setMarkerCorners(getCornerPositions(markers));
        }
      }
    }
  }, [sourceImg, sourceCanvasRef, detector, count]);

  return (
    <div style={{ background: "red" }}>
      <div>{count}</div>
      <button onClick={updateCount}>TICK</button>
      <canvas ref={sourceCanvasRef} style={{ display: "block" }} />
      <canvas ref={canvasRef} style={{ background: "white" }} />
    </div>
  );
};

export default SpriteSheetMaker;

function getCornerPositions(markers) {
  let allCorners = [];

  for (let marker of markers) {
    allCorners = allCorners.concat(marker.corners);
  }

  allCorners.sort((a, b) => (a.x > b.x ? 1 : -1));

  const rightSideCorners = allCorners.slice(allCorners.length - 4);
  const leftSideCorners = allCorners.slice(0, 4);

  rightSideCorners.sort((a, b) => (a.y > b.y ? 1 : -1));
  leftSideCorners.sort((a, b) => (a.y > b.y ? 1 : -1));

  const topLeft = leftSideCorners[0];
  const topRight = rightSideCorners[0];
  const bottomRight = rightSideCorners[3];
  const bottomLeft = leftSideCorners[3];

  const fourCorners = [topLeft, topRight, bottomRight, bottomLeft];

  return fourCorners;
}

function drawToCanvas(sourceCanvas, targCanvas, w, h) {
  const ctx = targCanvas.getContext("2d");
  ctx.clearRect(0, 0, targCanvas.width, targCanvas.height);

  targCanvas.width = w;
  targCanvas.height = h;

  ctx.drawImage(
    sourceCanvas,
    0,
    0,
    sourceCanvas.width,
    sourceCanvas.height,
    0,
    0,
    w,
    h
  );
}

// function drawSourceCanvas(sourceCanvas) {
//   const outCanvas = document.createElement("canvas");
//   outCanvas.width = sourceCanvas.width;
//   outCanvas.height = sourceCanvas.height;
//   const ctx = outCanvas.getContext("2d");

//   ctx.drawImage(sourceCanvas, 0, 0);

//   return outCanvas;
// }
