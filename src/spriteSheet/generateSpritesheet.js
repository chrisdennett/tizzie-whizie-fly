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

function getTotalHeightsFromObj(data, padding) {
  const spriteKeys = Object.keys(data);
  let maxWidth = 0;
  let totalHeight = 0;

  for (let key of spriteKeys) {
    const s = data[key];

    if (key !== "player") {
      if (s.w > maxWidth) maxWidth = s.w;
      totalHeight += s.h + padding;
    } else {
      const [playerMaxW, playerTotalH] = getTotalHeightsFromObj(s, padding);
      if (playerMaxW > maxWidth) maxWidth = playerMaxW;
      totalHeight += playerTotalH + padding;
    }
  }

  return [maxWidth, totalHeight];
}

function createMaskedCanvas(spriteData, maskData, spriteCanvas, maskCanvas) {
  // calculate the width and height before creating a canvas
  // that puts all sprite in a single column.
  const padding = 10;
  const [maxSpriteWidth, combinedSpritesHeight] = getTotalHeightsFromObj(
    spriteData,
    padding
  );

  const outCanvas = document.createElement("canvas");
  outCanvas.width = maxSpriteWidth; // get widest sprite
  outCanvas.height = combinedSpritesHeight; // add all sprites heights

  const ctx = outCanvas.getContext("2d");

  let startY = 0;
  const gameSpriteSheet = {};

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
  gameSpriteSheet.leg = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.player.leg,
    maskData.player.leg,
    gameSpriteSheet.player.y + gameSpriteSheet.player.h + padding,
    0.5
  );
  gameSpriteSheet.wing = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.player.wing,
    maskData.player.wing,
    gameSpriteSheet.leg.y + gameSpriteSheet.leg.h + padding,
    0.5
  );
  gameSpriteSheet.tail = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.player.tail,
    maskData.player.tail,
    gameSpriteSheet.wing.y + gameSpriteSheet.wing.h + padding,
    0.5
  );

  // Draw boat
  gameSpriteSheet.boat = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.boat,
    maskData.boat,
    gameSpriteSheet.tail.y + gameSpriteSheet.tail.h + padding,
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
    gameSpriteSheet.shore.y + gameSpriteSheet.shore.h + padding
  );

  // Draw pike
  gameSpriteSheet.pike = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.pike,
    maskData.pike,
    gameSpriteSheet.island.y + gameSpriteSheet.island.h + padding
  );

  // Draw bownessie
  gameSpriteSheet.bownessie = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.bownessie,
    maskData.bownessie,
    gameSpriteSheet.pike.y + gameSpriteSheet.pike.h + padding
  );

  // Draw tizzie
  // gameSpriteSheet.tizzie = drawMaskedSprite(
  //   ctx,
  //   spriteCanvas,
  //   maskCanvas,
  //   spriteData.player.body,
  //   maskData.player.body,
  //   gameSpriteSheet.bownessie.y + gameSpriteSheet.bownessie.h + padding
  // );

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
