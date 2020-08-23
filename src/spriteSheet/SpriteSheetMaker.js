import React, { useState, useRef, useEffect } from "react";
import AR from "../libs/aruco";
import { mapPolygonToCanvas } from "../webGLStuff/webglThings";

const SpriteSheetMaker = ({ sourceImg, setSpriteCanvas, w, h }) => {
  const [detector, setDetector] = useState(null);
  const [markerCorners, setMarkerCorners] = useState(null);
  const [spritesheetMask, setSpritesheetMask] = useState(null);
  const [preCanvas] = useState(null);

  const sourceCanvasRef = useRef(null);
  const canvasRef = useRef(null);

  const onDone = () => {
    const alphaCanvas = drawAlphaCanvas(w, h);
    const alphaCtx = alphaCanvas.getContext("2d");
    alphaCtx.drawImage(spritesheetMask, 0, 0);
    alphaCtx.globalCompositeOperation = "source-in";
    alphaCtx.drawImage(preCanvas, 0, 0);

    setSpriteCanvas(alphaCanvas);
  };

  useEffect(() => {
    if (!spritesheetMask) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSpritesheetMask(image);
      };

      image.src = "./spritesheet-mask.png";
    }
  }, [spritesheetMask]);

  // use webGl to get rectangular image from marker corners
  // useEffect(() => {
  //   if (markerCorners && sourceCanvasRef && sourceCanvasRef.current) {
  //     const sourceCanvas = sourceCanvasRef.current;
  //     const { width: srcW, height: srcH } = sourceCanvas;
  //     const [a, b, c, d] = markerCorners;

  //     const webGlCanvas = canvasRef.current;
  //     const gl = webGlCanvas.getContext("webgl");

  //     webGlCanvas.width = w;
  //     webGlCanvas.height = h;

  //     mapPolygonToCanvas({
  //       gl,
  //       image: sourceImg,
  //       topLeft: [a.x / srcW, a.y / srcH],
  //       topRight: [b.x / srcW, b.y / srcH],
  //       bottomRight: [c.x / srcW, c.y / srcH],
  //       bottomLeft: [d.x / srcW, d.y / srcH],
  //     });

  //     const screenCtx = sourceCanvas.getContext("2d");
  //     screenCtx.strokeStyle = "#00FF00";
  //     screenCtx.beginPath();
  //     screenCtx.moveTo(a.x, a.y);
  //     screenCtx.lineTo(b.x, b.y);
  //     screenCtx.lineTo(c.x, c.y);
  //     screenCtx.lineTo(d.x, d.y);
  //     screenCtx.closePath();
  //     screenCtx.stroke();

  //     const pCanvas = drawPreGameCanvas(webGlCanvas, w, h);
  //     setPreCanvas(pCanvas);
  //   }
  // }, [markerCorners, sourceCanvasRef, sourceImg, w, h]);

  // use CV with AR detector to find corners
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
  }, [sourceImg, sourceCanvasRef, detector]);

  const nextStep = () => {
    const sourceCanvas = sourceCanvasRef.current;
    const { width: srcW, height: srcH } = sourceCanvas;
    const [a, b, c, d] = markerCorners;

    const webGlCanvas = canvasRef.current;
    const gl = webGlCanvas.getContext("webgl");

    webGlCanvas.width = w;
    webGlCanvas.height = h;

    mapPolygonToCanvas({
      gl,
      image: sourceImg,
      topLeft: [a.x / srcW, a.y / srcH],
      topRight: [b.x / srcW, b.y / srcH],
      bottomRight: [c.x / srcW, c.y / srcH],
      bottomLeft: [d.x / srcW, d.y / srcH],
    });

    // const screenCtx = sourceCanvas.getContext("2d");
    // screenCtx.strokeStyle = "#00FF00";
    // screenCtx.beginPath();
    // screenCtx.moveTo(a.x, a.y);
    // screenCtx.lineTo(b.x, b.y);
    // screenCtx.lineTo(c.x, c.y);
    // screenCtx.lineTo(d.x, d.y);
    // screenCtx.closePath();
    // screenCtx.stroke();

    // const pCanvas = drawPreGameCanvas(webGlCanvas, w, h);
    // setPreCanvas(pCanvas);
  };

  return (
    <div style={{ background: "red" }}>
      <button onClick={nextStep}>NEXT STEP</button>
      <button onClick={onDone}>DONE</button>
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

// function drawPreGameCanvas(sourceCanvas, w, h) {
//   const outCanvas = document.createElement("canvas");
//   outCanvas.width = w;
//   outCanvas.height = h;
//   const ctx = outCanvas.getContext("2d");

//   ctx.drawImage(sourceCanvas, 0, 0);

//   return outCanvas;
// }

function drawAlphaCanvas(w, h) {
  const outCanvas = document.createElement("canvas");
  outCanvas.width = w;
  outCanvas.height = h;
  const ctx = outCanvas.getContext("2d");

  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, w, h);

  return outCanvas;
}
