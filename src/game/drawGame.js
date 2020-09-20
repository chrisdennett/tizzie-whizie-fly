export const drawGame = (gameCanvas, gameState, spriteCanvas, spriteData) => {
  const ctx = gameCanvas.getContext("2d");
  // clear scene
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // ctx.drawImage(spriteCanvas, 0, 0);

  // for (let c = 0; c < gameState.cloudsTotal; c++) {
  //   ctx.fillStyle = "orange";
  //   ctx.fillRect(0, 0, 90, 50);
  // }

  // shoreline
  if (spriteData.shore) {
    ctx.save();
    ctx.scale(-1, 1);
    drawSprite(
      ctx,
      spriteCanvas,
      spriteData.shore,
      0 - spriteData.shore.w - gameState.shorelineX,
      gameState.shorelineY - gameState.shorelineH
    );
    ctx.restore();
    if (gameState.shorelineX < 0) {
      drawSprite(
        ctx,
        spriteCanvas,
        spriteData.shore,
        gameState.shorelineX + gameState.shorelineW,
        gameState.shorelineY - gameState.shorelineH
      );
    } else {
      drawSprite(
        ctx,
        spriteCanvas,
        spriteData.shore,
        gameState.shorelineX - gameState.shorelineW,
        gameState.shorelineY - gameState.shorelineH
      );
    }
  }

  // current obstacle
  if (gameState.nextObstacleIndex < gameState.obstacles.length) {
    const currObstacle = gameState.obstacles[gameState.nextObstacleIndex];
    const currObstacleSprite = spriteData[currObstacle.type];

    drawSprite(
      ctx,
      spriteCanvas,
      currObstacleSprite,
      gameState.obstacleX,
      gameState.obstacleY - gameState.boatH
    );
  }

  // player
  drawPlayer(
    ctx,
    spriteCanvas,
    spriteData,
    gameState.playerY,
    80,
    gameState.gameTick,
    gameState.isJumping,
    gameState.isDiving
  );
};

function drawSprite(ctx, spriteCanvas, sprite, targX, targY) {
  const { x, y, h, w } = sprite;

  ctx.drawImage(spriteCanvas, x, y, w, h, targX, targY, w, h);
}

export const drawPlayer = (
  ctx,
  spriteCanvas,
  spriteData,
  playerY = 0,
  playerX = 100,
  frameNum,
  isJumping,
  isDiving
) => {
  const { player, wing, leg, tail } = spriteData;

  const wingFrameRate = 5;
  const wingFlap = frameNum % wingFrameRate === 0;

  const halfBodyW = player.w / 2;
  const halfBodyH = player.h / 2;

  const body = { x: -halfBodyW, y: -halfBodyH };
  const bodyCenter = { x: playerX + halfBodyW, y: playerY + halfBodyH };

  const wingFly = {
    x: 0 - wing.w / 2,
    y: 0 - wing.h,
    r1: degToRad(wingFlap ? 60 : 80),
    r2: degToRad(wingFlap ? 20 : 5),
  };
  const wingDive = {
    x: 0 - wing.w / 2,
    y: 0 - wing.h,
    r1: degToRad(-60),
    r2: degToRad(-70),
  };

  const frontLegFly = { x: -1, y: 16, r: degToRad(40) };
  const backLegFly = { x: -40, y: 18, r: degToRad(60) };

  const frontLegDive = { x: -1, y: 16, r: degToRad(60) };
  const backLegDive = { x: -40, y: 18, r: degToRad(60) };

  const tailFly = { x: -60, y: -60, r: degToRad(0) };
  const tailDive = { x: -60, y: -60, r: degToRad(wingFlap ? -100 : -80) };

  const playerFly = { x: bodyCenter.x, y: bodyCenter.y, r: degToRad(-55) };
  const playerNorm = { x: bodyCenter.x, y: bodyCenter.y, r: degToRad(-15) };
  const playerDive = { x: bodyCenter.x, y: bodyCenter.y, r: degToRad(0) };

  const wingPos = isDiving ? wingDive : wingFly;
  const playerPos = isDiving ? playerDive : isJumping ? playerFly : playerNorm;
  const tailPos = isDiving ? tailDive : tailFly;
  const frontLegPos = isDiving ? frontLegDive : frontLegFly;
  const backLegPos = isDiving ? backLegDive : backLegFly;

  ctx.save();
  // ctx.shadowColor = "rgba(0,0,0,0.3)";
  // ctx.shadowOffsetY = 10;
  // ctx.shadowOffsetX = 10;
  // ctx.shadowBlur = 5;

  ctx.translate(playerPos.x, playerPos.y);
  ctx.rotate(playerPos.r);

  // wing behind
  ctx.save();
  ctx.translate(wingPos.x + wing.w / 2, wingPos.y + wing.h);
  ctx.rotate(wingPos.r1);
  drawSprite(ctx, spriteCanvas, wing, -wing.w / 2, -wing.h);
  ctx.restore();

  // tail
  ctx.save();
  ctx.translate(tailPos.x + tail.w / 2, tailPos.y + tail.h);
  ctx.rotate(tailPos.r);
  drawSprite(ctx, spriteCanvas, tail, -tail.w / 2, -tail.h);
  ctx.restore();

  // body
  drawSprite(ctx, spriteCanvas, player, body.x, body.y);

  // wing in front
  ctx.save();
  ctx.translate(wingPos.x + wing.w / 2, wingPos.y + wing.h);
  ctx.rotate(wingPos.r2);
  drawSprite(ctx, spriteCanvas, wing, -wing.w / 2, -wing.h);
  ctx.restore();

  // front leg
  ctx.save();
  ctx.translate(frontLegPos.x + leg.w / 2, frontLegPos.y + leg.h / 2);
  ctx.rotate(frontLegPos.r);
  drawSprite(ctx, spriteCanvas, leg, -leg.w / 2, -leg.h / 2);
  ctx.restore();

  // back leg
  ctx.save();
  ctx.translate(backLegPos.x + leg.w / 2, backLegPos.y + leg.h / 2);
  ctx.rotate(backLegPos.r);
  drawSprite(ctx, spriteCanvas, leg, -leg.w / 2, -leg.h / 2);
  ctx.restore();

  // undo rotation and translation for whole player.
  ctx.restore();
};

const degToRad = (deg) => (deg * Math.PI) / 180;
