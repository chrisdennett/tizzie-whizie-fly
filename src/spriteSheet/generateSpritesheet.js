import AR from "../libs/aruco";
import fx from "glfx";
import { spriteData, maskData } from "../game/gameState";
// import { mapPolygonToCanvas } from "../webGLStuff/webglThings";
import { createCanvasFromSrc } from "./helper";

let detector = new AR.Detector();

const gameW = 1089;
const gameH = 760;

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
    const a = markers[0].corners[0]; // top left
    const b = markers[1].corners[0]; // top right
    const d = markers[2].corners[0]; // bottom left
    const c = markers[3].corners[0]; // bottom right

    const unwarpedCanvas = getUnwarpedCanvas(
      sourceCanvas,
      { a, b, c, d },
      gameW,
      gameH
    );

    const { outCanvas, gameSpriteSheet: gameData } = createMaskedCanvas(
      spriteData,
      maskData,
      unwarpedCanvas,
      maskImg
    );

    return {
      data: gameData,
      canvas: outCanvas,
      unwarpedCanvas,
      sourceCanvas,
    };
  } else {
    const fullCanvas = createCanvasFromSrc(sourceCanvas, gameW, gameH);

    const { outCanvas, gameSpriteSheet: gameData } = createMaskedCanvas(
      spriteData,
      maskData,
      fullCanvas,
      maskImg
    );

    return { data: gameData, canvas: outCanvas };
  }
};

const getUnwarpedCanvas = (sourceCanvas, corners, gameW, gameH) => {
  const { width: w, height: h } = sourceCanvas;
  const webGlCanvas = fx.canvas();
  var texture = webGlCanvas.texture(sourceCanvas);

  const { a, b, c, d } = corners;

  webGlCanvas
    .draw(texture)
    .perspective(
      [a.x, a.y, b.x, b.y, d.x, d.y, c.x, c.y],
      [0, 0, w, 0, 0, h, w, h]
    )
    .update();

  const unwarpedCanvas = createCanvasFromSrc(webGlCanvas, gameW, gameH);

  return unwarpedCanvas;
};

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
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = maxSpriteWidth;
  tempCanvas.height = combinedSpritesHeight;
  const tempCtx = tempCanvas.getContext("2d");

  let startY = 0;
  const gameSpriteSheet = {};

  const { body, leg, wing, tail } = spriteData.player;

  const adjustedBodyProps = { x: body.x, y: body.y, w: body.w, h: body.h };
  const adjustedTailProps = { x: tail.x, y: tail.y, w: tail.w, h: tail.h };
  const adjustedWingProps = { x: wing.x, y: wing.y, w: wing.w, h: wing.h };
  const adjustedLegProps = { x: leg.x, y: leg.y, w: leg.w, h: leg.h };

  // Draw titles
  gameSpriteSheet.title = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.title,
    maskData.title,
    startY,
    1,
    tempCanvas,
    tempCtx
  );

  // Draw player
  gameSpriteSheet.player = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    adjustedBodyProps,
    maskData.player.body,
    gameSpriteSheet.title.y + gameSpriteSheet.title.h + padding,
    0.5,
    tempCanvas,
    tempCtx
  );
  gameSpriteSheet.leg = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    adjustedLegProps,
    maskData.player.leg,
    gameSpriteSheet.player.y + gameSpriteSheet.player.h + padding,
    0.5,
    tempCanvas,
    tempCtx
  );
  gameSpriteSheet.wing = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    adjustedWingProps,
    maskData.player.wing,
    gameSpriteSheet.leg.y + gameSpriteSheet.leg.h + padding,
    0.5,
    tempCanvas,
    tempCtx
  );
  gameSpriteSheet.tail = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    adjustedTailProps,
    maskData.player.tail,
    gameSpriteSheet.wing.y + gameSpriteSheet.wing.h + padding,
    0.5,
    tempCanvas,
    tempCtx
  );

  // Draw boat
  gameSpriteSheet.boat = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.boat,
    maskData.boat,
    gameSpriteSheet.tail.y + gameSpriteSheet.tail.h + padding,
    0.9,
    tempCanvas,
    tempCtx
  );

  // draw shore
  gameSpriteSheet.shore = drawMaskedShore(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.shore,
    maskData.shore,
    maskData.ripples,
    gameSpriteSheet.boat.y + gameSpriteSheet.boat.h + padding,
    1,
    tempCanvas,
    tempCtx
  );

  // draw underwater
  gameSpriteSheet.underwater = drawUnderwater(
    ctx,
    maskCanvas,
    maskData.underwater,
    gameSpriteSheet.shore.y + gameSpriteSheet.shore.h + padding
  );

  // Draw island
  gameSpriteSheet.island = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.island,
    maskData.island,
    gameSpriteSheet.underwater.y + gameSpriteSheet.underwater.h + padding,
    1,
    tempCanvas,
    tempCtx
  );

  // Draw pike
  gameSpriteSheet.pike = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.pike,
    maskData.pike,
    gameSpriteSheet.island.y + gameSpriteSheet.island.h + padding,
    1,
    tempCanvas,
    tempCtx
  );

  // Draw bownessie
  gameSpriteSheet.bownessie = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.bownessie,
    maskData.bownessie,
    gameSpriteSheet.pike.y + gameSpriteSheet.pike.h + padding,
    0.75,
    tempCanvas,
    tempCtx
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

function drawMaskedShore(
  ctx,
  spriteCanvas,
  maskCanvas,
  sprite,
  mask,
  ripples,
  startY,
  scale = 1,
  tempCanvas,
  tempCtx
) {
  ctx.save();
  tempCtx.save();
  tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

  // draw the mask to temp canvas
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

  // set to mask

  tempCtx.globalCompositeOperation = "source-in";
  // draw the sprite to temp canvas
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

  // draw the temp canvas to the output canvas
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
  // draw the reflection of the temp canvas to output canvas

  // const reflectionHeight = sprite.h * 0.5;

  // ctx.translate(0, startY + sprite.h + reflectionHeight);
  // ctx.scale(1, -1);
  // ctx.globalAlpha = 0.25;
  // ctx.drawImage(
  //   tempCanvas,
  //   0,
  //   0,
  //   sprite.w,
  //   sprite.h,
  //   0,
  //   0,
  //   sprite.w,
  //   reflectionHeight
  // );

  // draw ripples over reflection
  // ctx.globalAlpha = 0.1;
  // ctx.drawImage(
  //   maskCanvas,
  //   ripples.x,
  //   ripples.y,
  //   ripples.w,
  //   ripples.h,
  //   0,
  //   startY + sprite.h,
  //   ripples.w,
  //   ripples.h * 0.5
  // );
  // ctx.globalAlpha = 1;

  tempCtx.restore();
  ctx.restore();

  return {
    x: 0,
    y: startY,
    w: sprite.w,
    h: ripples.h + sprite.h,
  };
}

///
////
// ctx,
// maskCanvas,
// maskData.underwater,
// gameSpriteSheet.boat.y + gameSpriteSheet.boat.h + padding
///
///
function drawUnderwater(ctx, maskCanvas, underwater, startY) {
  // draw ripples over reflection
  ctx.drawImage(
    maskCanvas,
    underwater.x,
    underwater.y,
    underwater.w,
    underwater.h,
    0,
    startY,
    underwater.w,
    underwater.h
  );

  return {
    x: 0,
    y: startY,
    w: underwater.w,
    h: underwater.h,
  };
}
////
///
///
///

function drawMaskedSprite(
  ctx,
  spriteCanvas,
  maskCanvas,
  sprite,
  mask,
  startY,
  scale = 1,
  tempCanvas,
  tempCtx
) {
  tempCtx.save();

  tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

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
  tempCtx.restore();

  return { x: 0, y: startY, w: sprite.w * scale, h: sprite.h * scale };
}

// function getCornerPositions(markers) {
//   let allCorners = [];

//   for (let marker of markers) {
//     allCorners = allCorners.concat(marker.corners);
//   }

//   allCorners.sort((a, b) => (a.x > b.x ? 1 : -1));

//   const rightSideCorners = allCorners.slice(allCorners.length - 4);
//   const leftSideCorners = allCorners.slice(0, 4);

//   rightSideCorners.sort((a, b) => (a.y > b.y ? 1 : -1));
//   leftSideCorners.sort((a, b) => (a.y > b.y ? 1 : -1));

//   const topLeft = leftSideCorners[0];
//   const topRight = rightSideCorners[0];
//   const bottomRight = rightSideCorners[3];
//   const bottomLeft = leftSideCorners[3];

//   console.log("topLeft: ", topLeft);

//   const fourCorners = [topLeft, topRight, bottomRight, bottomLeft];

//   return fourCorners;
// }

// const getUnwarpedCanvasOld = (sourceCanvas, corners, gameW, gameH) => {
//   const webGlCanvas = document.createElement("canvas");
//   const gl = webGlCanvas.getContext("webgl");
//   webGlCanvas.width = gameW;
//   webGlCanvas.height = gameH;

//   const { a, b, c, d } = corners;

//   mapPolygonToCanvas({
//     gl,
//     image: sourceCanvas,
//     topLeft: [a.x / sourceCanvas.width, a.y / sourceCanvas.height],
//     topRight: [b.x / sourceCanvas.width, b.y / sourceCanvas.height],
//     bottomRight: [c.x / sourceCanvas.width, c.y / sourceCanvas.height],
//     bottomLeft: [d.x / sourceCanvas.width, d.y / sourceCanvas.height],
//   });

//   const unwarpedCanvas = createCanvasFromSrc(webGlCanvas, gameW, gameH);

//   return unwarpedCanvas;
// };

//
// HELPER FUNCTIONS
//

// function createLineUnwarpedCanvas(srcCanvas, widthChange) {
//   const outCanvas = document.createElement("canvas");

//   const { width: w, height: h } = srcCanvas;
//   outCanvas.width = w;
//   outCanvas.height = h;

//   // use amount of horizontal warp to unsquish
//   const { topWidth, bottomWidth } = widthChange;
//   const squishFraction = (bottomWidth - topWidth) / bottomWidth;

//   const fracAtTop = 1 + squishFraction;
//   const fracAtBottom = 1 - squishFraction;

//   const ctx = outCanvas.getContext("2d");
//   const sliceH = 100;
//   const totalSlices = h / sliceH;
//   const squishFractionInc = squishFraction / totalSlices;

//   for (let y = 0; y < h; y += sliceH) {
//     const currSquishFrac = squishFraction - y * squishFractionInc;
//     const currSliceH = sliceH + y * squishFractionInc;
//     ctx.drawImage(srcCanvas, 0, y, w, sliceH, 0, y, w, currSliceH);
//   }

//   return outCanvas;
// }
