import React, { useState, useRef, useEffect } from "react";
import AR from "../libs/aruco";

const SpriteSheetMaker = ({ sourceImg }) => {
  const [detector, setDetector] = useState(null);
  const [count, setCount] = useState(0);
  const canvasRef = useRef(null);

  const updateCount = () => setCount((prev) => prev + 1);

  useEffect(() => {
    if (canvasRef && sourceImg) {
      const screenCanvas = canvasRef.current;

      if (!detector && AR) {
        const d = new AR.Detector();
        setDetector(d);
      } else {
        drawToCanvas(
          sourceImg,
          screenCanvas,
          sourceImg.width / 4,
          sourceImg.height / 4
        );
        const ctx = screenCanvas.getContext("2d");
        const imageData = ctx.getImageData(
          0,
          0,
          screenCanvas.width,
          screenCanvas.height
        );

        var markers = detector.detect(imageData);

        console.log("markers: ", markers);

        if (markers.length > 0) {
          const screenCtx = screenCanvas.getContext("2d");

          for (let m = 0; m < markers.length; m++) {
            for (let c = 0; c < markers[m].corners.length; c++) {
              screenCtx.fillStyle = "#00FF00";
              screenCtx.fillRect(
                markers[m].corners[c].x,
                markers[m].corners[c].y,
                10,
                10
              );
            }
          }
        }
      }
    }
  }, [sourceImg, canvasRef, detector, count]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={updateCount}>TICK</button>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
};

export default SpriteSheetMaker;

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
