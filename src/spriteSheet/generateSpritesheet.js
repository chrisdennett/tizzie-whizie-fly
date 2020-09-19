import AR from "../libs/aruco";
import { spriteData, maskData } from "../game/gameState";
import { mapPolygonToCanvas } from "../webGLStuff/webglThings";
import { createCanvasFromSrc } from "./helper";

let detector = new AR.Detector();

export const generateSpritesheet = (sourceImg, maskImg, w, h) => {
  if (!sourceImg || !maskImg) return;

  const sourceCanvas = createCanvasFromSrc(sourceImg);

  const ctx = sourceCanvas.getContext("2d");
  const imageData = ctx.getImageData(
    0,
    0,
    sourceCanvas.width,
    sourceCanvas.height
  );

  var markers = detector.detect(imageData);

  if (markers.length === 4) {
    const webGlCanvas = document.createElement("canvas");
    const gl = webGlCanvas.getContext("webgl");
    webGlCanvas.width = w;
    webGlCanvas.height = h;

    const markerCorners = getCornerPositions(markers);
    const [a, b, c, d] = markerCorners;

    mapPolygonToCanvas({
      gl,
      image: sourceImg,
      topLeft: [a.x / sourceCanvas.width, a.y / sourceCanvas.height],
      topRight: [b.x / sourceCanvas.width, b.y / sourceCanvas.height],
      bottomRight: [c.x / sourceCanvas.width, c.y / sourceCanvas.height],
      bottomLeft: [d.x / sourceCanvas.width, d.y / sourceCanvas.height],
    });

    const userArtCanvas = createCanvasFromSrc(webGlCanvas, w, h);
    const { outCanvas, gameSpriteSheet: gameData } = createMaskedCanvas(
      spriteData,
      maskData,
      userArtCanvas,
      maskImg
    );

    return { data: gameData, canvas: outCanvas };
  } else {
    const { outCanvas, gameSpriteSheet: gameData } = createMaskedCanvas(
      spriteData,
      maskData,
      sourceCanvas,
      maskImg
    );

    return { data: gameData, canvas: outCanvas };
  }
};

//
// HELPER FUNCTIONS
//
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

function createMaskedCanvas(spriteData, maskData, spriteCanvas, maskCanvas) {
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
    spriteData.player.body,
    maskData.player.body,
    startY,
    0.5
  );

  // Draw boat
  gameSpriteSheet.boat = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.boat,
    maskData.boat,
    gameSpriteSheet.player.y + gameSpriteSheet.player.h + padding,
    0.9
  );

  // draw shore
  gameSpriteSheet.shore = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.shore,
    maskData.shore,
    gameSpriteSheet.boat.y + gameSpriteSheet.boat.h + padding
  );

  // Draw island
  gameSpriteSheet.island = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.island,
    maskData.island,
    gameSpriteSheet.shore.y + gameSpriteSheet.shore.h + padding,
    0.9
  );

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
