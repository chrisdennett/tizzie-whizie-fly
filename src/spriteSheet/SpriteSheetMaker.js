import React, { useState, useRef, useEffect } from "react";
import AR from "../libs/aruco";
import { mapPolygonToCanvas } from "../webGLStuff/webglThings";
import PhotoSelector from "../components/photoSelector/PhotoSelector";
import { spriteData } from "../game/gameState";

const SpriteSheetMaker = ({ setSpriteData, w, h }) => {
  const [sourceImg, setSourceImg] = useState(null);
  const [detector, setDetector] = useState(null);
  const [markerCorners, setMarkerCorners] = useState(null);
  const [spritesheetMask, setSpritesheetMask] = useState(null);
  const [preCanvas, setPreCanvas] = useState(null);

  const sourceCanvasRef = useRef(null);
  const maskedCanvasRef = useRef(null);

  const onDone = () => {
    // setSpriteCanvas(alphaCanvas);
  };

  useEffect(() => {
    if (
      !preCanvas ||
      !spritesheetMask ||
      !maskedCanvasRef ||
      !maskedCanvasRef.current ||
      !spriteData
    )
      return;

    const { outCanvas, gameSpriteSheet: gameData } = createMaskedCanvas(
      spriteData,
      preCanvas,
      spritesheetMask
    );

    setSpriteData({ data: gameData, canvas: outCanvas });

    const mCanvas = maskedCanvasRef.current;
    const ctx = mCanvas.getContext("2d");
    mCanvas.width = outCanvas.width;
    mCanvas.height = outCanvas.height;
    ctx.drawImage(outCanvas, 0, 0);
    // eslint-disable-next-line
  }, [spritesheetMask, preCanvas, maskedCanvasRef, w, h]);

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

  useEffect(() => {
    if (!sourceImg) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        setSourceImg(image);
      };

      image.src = "./spritesheet.png";
    }
  }, [sourceImg]);

  // use webGl to get rectangular image from marker corners
  useEffect(() => {
    if (markerCorners && sourceCanvasRef && sourceCanvasRef.current) {
      const sourceCanvas = sourceCanvasRef.current;
      const { width: srcW, height: srcH } = sourceCanvas;
      const [a, b, c, d] = markerCorners;

      const webGlCanvas = document.createElement("canvas");
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

      // show the corners on the source canvas
      const screenCtx = sourceCanvas.getContext("2d");
      screenCtx.strokeStyle = "#00FF00";
      screenCtx.beginPath();
      screenCtx.moveTo(a.x, a.y);
      screenCtx.lineTo(b.x, b.y);
      screenCtx.lineTo(c.x, c.y);
      screenCtx.lineTo(d.x, d.y);
      screenCtx.closePath();
      screenCtx.stroke();

      // set pre canvas
      const pCanvas = drawPreGameCanvas(webGlCanvas, w, h);
      setPreCanvas(pCanvas);
    }
  }, [markerCorners, sourceCanvasRef, sourceImg, w, h]);

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
          sourceImg.width,
          sourceImg.height
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

  const onPhotoSelected = (imgFile) => {
    createCanvasFromFile(imgFile, (img) => {
      setSourceImg(img);
    });
  };

  return (
    <div style={{ background: "gray" }}>
      <PhotoSelector onPhotoSelected={onPhotoSelected} />
      <button onClick={onDone}>DONE</button>
      <div>
        <canvas ref={maskedCanvasRef} style={{ border: "red 1px solid" }} />
        <canvas ref={sourceCanvasRef} style={{ display: "block" }} />
      </div>
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

function drawPreGameCanvas(sourceCanvas, w, h) {
  const outCanvas = document.createElement("canvas");
  outCanvas.width = w;
  outCanvas.height = h;
  const ctx = outCanvas.getContext("2d");

  ctx.drawImage(sourceCanvas, 0, 0);

  return outCanvas;
}

function createMaskedCanvas(spriteData, spriteCanvas, maskCanvas) {
  const outCanvas = document.createElement("canvas");
  outCanvas.width = 1200; // get widest sprite
  outCanvas.height = 1200; // add all sprites heights
  const ctx = outCanvas.getContext("2d");

  let startY = 0;
  const gameSpriteSheet = {};
  const padding = 10;

  // Draw player
  gameSpriteSheet.player = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.playerSrc,
    spriteData.playerMask,
    startY,
    0.5
  );

  // Draw boat
  gameSpriteSheet.boat = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.boat,
    spriteData.boatMask,
    gameSpriteSheet.player.y + gameSpriteSheet.player.h + padding,
    0.9
  );

  // draw shore
  gameSpriteSheet.shore = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.shore,
    spriteData.shoreMask,
    gameSpriteSheet.boat.y + gameSpriteSheet.boat.h + padding
  );
  // const { playerSrc: p, playerMask: m } = spriteData;
  // // draw the mask
  // ctx.drawImage(maskCanvas, m.x, m.y, m.w, m.h, 0, 0, p.w, p.h);
  // ctx.globalCompositeOperation = "source-in";
  // // draw the sprite
  // ctx.drawImage(spiteCanvas, p.x, p.y, p.w, p.h, 0, 0, p.w, p.h);

  return { outCanvas, gameSpriteSheet };
}

function drawMaskedSprite(
  ctx,
  spriteCanvas,
  maskCanvas,
  sprite,
  mask,
  startY,
  scale = 1
) {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = sprite.w;
  tempCanvas.height = sprite.h;
  const tempCtx = tempCanvas.getContext("2d");

  // draw the mask
  tempCtx.drawImage(
    maskCanvas,
    mask.x,
    mask.y,
    mask.w,
    mask.h,
    0,
    0,
    mask.w,
    mask.h
  );
  tempCtx.globalCompositeOperation = "source-in";
  // draw the sprite
  tempCtx.drawImage(
    spriteCanvas,
    sprite.x,
    sprite.y,
    sprite.w,
    sprite.h,
    0,
    0,
    sprite.w,
    sprite.h
  );

  ctx.drawImage(
    tempCanvas,
    0,
    0,
    sprite.w,
    sprite.h,
    0,
    startY,
    sprite.w * scale,
    sprite.h * scale
  );

  return { x: 0, y: startY, w: sprite.w * scale, h: sprite.h * scale };
}

///
///
export const createCanvasFromFile = (file, callback) => {
  const maxOutputCanvasSize = 1000;

  GetImage(file, (sourceImg, imgOrientation) => {
    const maxWidthCanvas = createMaxSizeCanvas(
      sourceImg,
      maxOutputCanvasSize,
      800
    );
    const canvas = createOrientatedCanvas(maxWidthCanvas, imgOrientation);

    callback(canvas);
  });
};

export function GetImage(imgFile, callback) {
  GetPhotoOrientation(imgFile, (orientation) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgSrc = e.target.result;
      // Create a new image element
      let img = new Image();
      img.setAttribute("crossOrigin", "anonymous"); //
      img.src = imgSrc;

      // wait for it to be loaded and then return
      img.onload = (e) => {
        const w = img.width;
        const h = img.height;

        const widthToHeightRatio = h / w;
        const heightToWidthRatio = w / h;

        callback(img, orientation, widthToHeightRatio, heightToWidthRatio);
      };
    };
    reader.readAsDataURL(imgFile);
  });
}

export const createOrientatedCanvas = (sourceCanvas, orientation) => {
  const outputCanvas = document.createElement("canvas");
  const isPortrait = orientation > 4 && orientation < 9;

  // switch height and width if it's portrait
  let canvasW = isPortrait ? sourceCanvas.height : sourceCanvas.width;
  let canvasH = isPortrait ? sourceCanvas.width : sourceCanvas.height;

  const ctx = outputCanvas.getContext("2d");

  outputCanvas.width = canvasW;
  outputCanvas.height = canvasH;

  // transform context before drawing image
  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, canvasW, 0);
      break;

    case 3:
      ctx.transform(-1, 0, 0, -1, canvasW, canvasH);
      break;

    case 4:
      ctx.transform(1, 0, 0, -1, 0, canvasH);
      break;

    case 5:
      ctx.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      ctx.transform(0, 1, -1, 0, canvasW, 0);
      break;
    case 7:
      ctx.transform(0, -1, -1, 0, canvasW, canvasH);
      break;
    case 8:
      ctx.transform(0, -1, 1, 0, 0, canvasH);
      break;
    default:
      break;
  }

  ctx.drawImage(sourceCanvas, 0, 0);

  return outputCanvas;
};

export function createMaxSizeCanvas(
  inputCanvas,
  _maxWidth = 1000,
  _maxHeight = 1000
) {
  const { width: inputWidth, height: inputHeight } = inputCanvas;
  const maxWidth = _maxWidth ? _maxWidth : inputWidth;
  const maxHeight = _maxHeight ? _maxHeight : inputHeight;

  // get width and height restricted to maximums
  const { width: outputWidth, height: outputHeight } = getDimensionsToFit(
    inputWidth,
    inputHeight,
    maxWidth,
    maxHeight
  );

  // set up the output canvas
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = outputWidth;
  outputCanvas.height = outputHeight;

  // draw input to output at the restricted size
  const ctx = outputCanvas.getContext("2d");
  ctx.drawImage(
    inputCanvas,
    0,
    0,
    inputWidth,
    inputHeight,
    0,
    0,
    outputWidth,
    outputHeight
  );

  return outputCanvas;
}

// Reads file as Array buffer to get camera orientation from exif data
function GetPhotoOrientation(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const view = new DataView(e.target.result);

    if (view.getUint16(0, false) !== 0xffd8) return callback(-2);
    const length = view.byteLength;
    let offset = 2;
    while (offset < length) {
      let marker = view.getUint16(offset, false);
      offset += 2;
      if (marker === 0xffe1) {
        offset += 2;
        if (view.getUint32(offset, false) !== 0x45786966) return callback(-1);

        const little = view.getUint16((offset += 6), false) === 0x4949;
        offset += view.getUint32(offset + 4, little);
        const tags = view.getUint16(offset, little);
        offset += 2;
        for (let i = 0; i < tags; i++)
          if (view.getUint16(offset + i * 12, little) === 0x0112)
            return callback(view.getUint16(offset + i * 12 + 8, little));
      } else if ((marker & 0xff00) !== 0xff00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(-1);
  };
  reader.readAsArrayBuffer(file);
}

export const getDimensionsToFit = (
  inputWidth,
  inputHeight,
  maxWidth,
  maxHeight
) => {
  let outputWidth, outputHeight;
  const { widthToHeightRatio, heightToWidthRatio } = getDimensionRatios(
    inputWidth,
    inputHeight
  );

  // if the width need reducing, set width to max and scale height accordingly
  if (inputWidth > maxWidth) {
    outputWidth = maxWidth;
    outputHeight = outputWidth * widthToHeightRatio;

    if (outputHeight > maxHeight) {
      outputHeight = maxHeight;
      outputWidth = outputHeight * heightToWidthRatio;
    }
  }
  // if the height need reducing, set height to max and scale width accordingly
  else if (inputHeight > maxHeight) {
    outputHeight = maxHeight;
    outputWidth = outputHeight * heightToWidthRatio;
  }
  // otherwise output can match input
  else {
    outputWidth = inputWidth;
    outputHeight = inputHeight;
  }

  return { width: outputWidth, height: outputHeight };
};

export function getDimensionRatios(w, h) {
  const widthToHeightRatio = Math.round(100 * (h / w)) / 100;
  const heightToWidthRatio = Math.round(100 * (w / h)) / 100;

  return { widthToHeightRatio, heightToWidthRatio };
}
