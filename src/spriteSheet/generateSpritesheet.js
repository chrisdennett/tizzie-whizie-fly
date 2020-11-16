import AR from "../libs/aruco";
import fx from "glfx";
import { spriteData, maskData } from "../pages/game/gameLogic/gameItems";
import { createCanvasFromSrc } from "./helper";

const gameW = 1089;
const gameH = 760;

// FIND CORNERS - using AR aruco markers
export const findSheetCorners = (sourceImg) => {
  if (!sourceImg) return;

  const webGlCanvas = fx.canvas();

  var texture = webGlCanvas.texture(sourceImg);
  webGlCanvas.draw(texture).unsharpMask(20, 0.47).update();

  const sourceCanvas = createCanvasFromSrc(webGlCanvas);
  const ctx = sourceCanvas.getContext("2d");
  const imageData = ctx.getImageData(
    0,
    0,
    sourceCanvas.width,
    sourceCanvas.height
  );

  let detector = new AR.Detector();
  var markers = detector.detect(imageData);
  let a, b, c, d;

  if (markers.length === 4) {
    const sortedMarkers = sortMarkers(markers);

    a = sortedMarkers[0].corners[0]; // top left
    b = sortedMarkers[1].corners[0]; // top right
    c = sortedMarkers[2].corners[0]; // bottom right
    d = sortedMarkers[3].corners[0]; // bottom left
  } else {
    a = { x: 0, y: 0 }; // top left
    b = { x: sourceCanvas.width, y: 0 }; // top right
    c = { x: sourceCanvas.width, y: sourceCanvas.height }; // bottom right
    d = { x: 0, y: sourceCanvas.height }; // bottom left
  }

  return { a, b, c, d };
};

export const sortMarkers = (markers) => {
  // find two on left
  // let topLeft, topRight, bottomRight, bottomLeft;
  markers.sort((a, b) => {
    return a.corners[0].x < b.corners[0].x ? -1 : 1;
  });

  const leftMarkers = [markers[0], markers[1]];
  const rightMarkers = [markers[2], markers[3]];

  leftMarkers.sort((a, b) => (a.corners[0].y < b.corners[0].y ? -1 : 1));
  rightMarkers.sort((a, b) => (a.corners[0].y < b.corners[0].y ? -1 : 1));

  return [leftMarkers[0], rightMarkers[0], rightMarkers[1], leftMarkers[1]];
};

export const generateSpritesheet = (unwarpedCanvas, maskImg) => {
  if (!unwarpedCanvas || !maskImg) return;

  const gameData = createGameData(
    spriteData,
    maskData,
    unwarpedCanvas,
    maskImg
  );

  return {
    data: gameData.gameSpriteSheet,
    canvas: gameData.outCanvas,
    // unwarpedCanvas,
    // sourceCanvas,
  };
};

export const generateSpritesheetFromScratch = (sourceImg, maskImg) => {
  if (!sourceImg || !maskImg) return;

  const corners = findSheetCorners(sourceImg);
  let unwarpedCanvas = getUnwarpedCanvas(sourceImg, corners, gameW, gameH);
  const gameData = createGameData(
    spriteData,
    maskData,
    unwarpedCanvas,
    maskImg
  );

  return {
    data: gameData.gameSpriteSheet,
    canvas: gameData.outCanvas,
    // unwarpedCanvas,
    // sourceCanvas,
  };
};

export const getUnwarpedCanvas = (sourceCanvas, corners) => {
  const { width: w, height: h } = sourceCanvas;

  try {
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
  } catch (e) {
    console.log("e: ", e);
    const fullCanvas = createCanvasFromSrc(sourceCanvas, gameW, gameH);
    return fullCanvas;
  }
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

export const createGameData = (
  spriteData,
  maskData,
  spriteCanvas,
  maskCanvas
) => {
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
  tempCanvas.height = maxSpriteWidth;
  const tempCtx = tempCanvas.getContext("2d", { alpha: false });

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
  gameSpriteSheet.boat = drawBoatWithSteam(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.boat,
    maskData.boat,
    spriteData.cloud,
    maskData.cloud,
    gameSpriteSheet.tail.y + gameSpriteSheet.tail.h + padding,
    0.8,
    tempCanvas,
    tempCtx
  );

  // Draw wreck
  gameSpriteSheet.wreck = drawMaskedSprite(
    ctx,
    spriteCanvas,
    maskCanvas,
    spriteData.wreck,
    maskData.wreck,
    gameSpriteSheet.boat.y + gameSpriteSheet.boat.h + padding,
    0.8,
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
    gameSpriteSheet.wreck.y + gameSpriteSheet.wreck.h + padding,
    1,
    tempCanvas,
    tempCtx
  );

  // draw shore
  gameSpriteSheet.shore = drawMaskedShore(
    ctx,
    spriteCanvas,
    maskCanvas,
    { ...spriteData.shore, w: 1024 },
    { ...maskData.shore, w: 1024 },
    maskData.ripples,
    gameSpriteSheet.pike.y + gameSpriteSheet.pike.h + padding,
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
    0.9,
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
    gameSpriteSheet.island.y + gameSpriteSheet.island.h + padding,
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

  //   const canvasToScreenScale = 0.5;
  //   const { scaledCanvas, scaledData } = scaleSpriteSheet(
  //     outCanvas,
  //     gameSpriteSheet,
  //     canvasToScreenScale
  //   );

  //   return { outCanvas: scaledCanvas, gameSpriteSheet: scaledData };
};

// DRAW BOAT WITH STEAM
function drawBoatWithSteam(
  ctx,
  spriteCanvas,
  maskCanvas,
  sprite,
  mask,
  cloudSprite,
  cloudMaskSprite,
  startY,
  scale = 1,
  tempCanvas,
  tempCtx
) {
  tempCtx.save();
  tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
  //draw the mask
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
  //draw the sprite
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
  tempCtx.restore();
  // draw temp canvas to main canvas
  ctx.drawImage(
    tempCanvas,
    0,
    0,
    sprite.w,
    sprite.h,
    0,
    startY + 160,
    Math.round(sprite.w * scale),
    Math.round(sprite.h * scale)
  );

  // now draw the steam
  tempCtx.save();
  tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
  tempCtx.drawImage(
    maskCanvas,
    cloudMaskSprite.x,
    cloudMaskSprite.y,
    cloudMaskSprite.w,
    cloudMaskSprite.h,
    0,
    0,
    cloudMaskSprite.w,
    cloudMaskSprite.h
  );
  tempCtx.globalCompositeOperation = "source-in";
  tempCtx.drawImage(
    spriteCanvas,
    cloudSprite.x,
    cloudSprite.y,
    cloudSprite.w,
    cloudSprite.h,
    0,
    0,
    cloudSprite.w,
    cloudSprite.h
  );
  tempCtx.restore();
  // draw temp canvas to main canvas
  ctx.save();
  ctx.translate(cloudSprite.w / 2, startY + cloudSprite.h / 2);
  ctx.rotate(degToRad(-45));
  ctx.drawImage(
    tempCanvas,
    0,
    0,
    cloudSprite.w,
    cloudSprite.h,
    -85,
    0,
    cloudSprite.w,
    cloudSprite.h
  );
  ctx.restore();

  return {
    x: 0,
    y: startY,
    w: sprite.w,
    h: sprite.h * 2.5,
  };
}

const degToRad = (deg) => (deg * Math.PI) / 180;

// DRAW MASKED SHORE AND RETURN DATA
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

  console.log("mask.w: ", mask.w);

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

  const reflectionHeight = sprite.h * 0.5;

  ctx.translate(0, startY + sprite.h + reflectionHeight);
  ctx.scale(1, -1);
  ctx.globalAlpha = 0.25;
  ctx.drawImage(
    tempCanvas,
    0,
    0,
    sprite.w,
    sprite.h,
    0,
    0,
    sprite.w,
    reflectionHeight
  );
  ctx.restore();
  // draw ripples over reflection
  // ctx.save();
  // ctx.globalAlpha = 0.9;
  ctx.drawImage(
    maskCanvas,
    ripples.x,
    ripples.y,
    ripples.w,
    ripples.h,
    0,
    startY + sprite.h,
    ripples.w,
    ripples.h * 0.5
  );
  // ctx.globalAlpha = 1;
  // ctx.restore();
  tempCtx.restore();

  return {
    x: 0,
    y: startY,
    w: sprite.w,
    h: ripples.h + sprite.h,
  };
}

// DRAW MASKED UNDERWATER AND RETURN DATA
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

// DRAW MASKED SPRITE AND RETURN DATA
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
    Math.round(sprite.w * scale),
    Math.round(sprite.h * scale)
  );
  tempCtx.restore();

  return {
    x: 0,
    y: startY,
    w: Math.round(sprite.w * scale),
    h: Math.round(sprite.h * scale),
  };
}
