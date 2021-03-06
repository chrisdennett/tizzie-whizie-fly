export const drawGame = (
  gameCanvas,
  gameState,
  spriteCanvas,
  spriteData,
  onCollision
) => {
  const IN_DRAWING_TEST_MODE = false;

  const ctx = gameCanvas.getContext("2d", { alpha: false });
  // clear scene
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // for (let c = 0; c < gameState.cloudsTotal; c++) {
  //   ctx.fillStyle = "orange";
  //   ctx.fillRect(0, 0, 90, 50);
  // }

  // game title
  drawTitle(ctx, spriteCanvas, spriteData.title, 90, 45, true);

  // shoreline
  drawShoreline(ctx, spriteCanvas, spriteData, gameState);

  // player
  drawPlayer(
    ctx,
    spriteCanvas,
    spriteData,
    gameState.playerY,
    gameState.playerX,
    gameState.gameTick,
    gameState.isJumping,
    gameState.isDiving
  );

  // current obstacle
  // feels like much of this should be in gamestate function, not here
  if (gameState.nextObstacleIndex < gameState.obstacles.length) {
    const currObstacle = gameState.obstacles[gameState.nextObstacleIndex];
    const currObstacleSprite = spriteData[currObstacle.type];

    const obXpos =
      IN_DRAWING_TEST_MODE && gameState.nextObstacleIndex === 0
        ? gameState.obstacleX - (currObstacleSprite.w + 200)
        : gameState.obstacleX;

    let obstacleBoundsArr = [];
    let yPos = 0;
    if (currObstacle.type === "boat") {
      yPos = 65;
      obstacleBoundsArr = [
        {
          x: obXpos,
          y: yPos + 210,
          w: currObstacleSprite.w - 110,
          h: currObstacleSprite.h - 230,
        },
        {
          x: obXpos + 90,
          y: yPos + 60,
          w: currObstacleSprite.w - 400,
          h: currObstacleSprite.h - 80,
        },
        {
          x: obXpos + 130,
          y: yPos + 10,
          w: currObstacleSprite.w - 400,
          h: currObstacleSprite.h - 200,
        },
      ];
    }

    if (currObstacle.type === "island") {
      yPos = 170;
      obstacleBoundsArr = [
        {
          x: obXpos + 70,
          y: yPos + 20,
          w: 100,
          h: 240,
        },
        {
          x: obXpos + 50,
          y: yPos + 145,
          w: 190,
          h: 70,
        },
      ];
    }

    if (currObstacle.type === "wreck") {
      yPos = 190;
      obstacleBoundsArr = [
        {
          x: obXpos + 135,
          y: yPos,
          w: 20,
          h: 320,
        },
        {
          x: obXpos + 70,
          y: yPos + 52,
          w: 160,
          h: 15,
        },
        {
          x: obXpos + 120,
          y: yPos + 200,
          w: 20,
          h: 100,
        },
        {
          x: obXpos + 100,
          y: yPos + 250,
          w: 20,
          h: 20,
        },
      ];
    }

    if (currObstacle.type === "pike") {
      yPos = 200;
      obstacleBoundsArr = [
        {
          x: obXpos + 30,
          y: yPos + 20,
          w: 80,
          h: 90,
        },
        {
          x: obXpos + 110,
          y: yPos + 40,
          w: 80,
          h: 100,
        },
        {
          x: obXpos + 190,
          y: yPos + 90,
          w: 80,
          h: 80,
        },
        {
          x: obXpos + 270,
          y: yPos + 120,
          w: 60,
          h: 80,
        },
        {
          x: obXpos + 330,
          y: yPos + 160,
          w: 60,
          h: 60,
        },
      ];
    }

    if (currObstacle.type === "bownessie") {
      yPos = 195;

      obstacleBoundsArr = [
        {
          x: obXpos + 10,
          y: yPos,
          w: 30,
          h: 25,
        },
        {
          x: obXpos + 30,
          y: yPos + 40,
          w: 30,
          h: 80,
        },
        {
          x: obXpos + 70,
          y: yPos + 150,
          w: 80,
          h: 30,
        },
        {
          x: obXpos + 100,
          y: yPos + 180,
          w: 70,
          h: 60,
        },
      ];
    }

    drawSprite(ctx, spriteCanvas, currObstacleSprite, obXpos, yPos, true);

    // draw player bounds
    const { playerY, playerX } = gameState;
    const { player } = spriteData;
    const playerBounds = {
      x: playerX,
      y: playerY,
      w: player.w - 15,
      h: player.h,
    };
    // // draw obstacle bounds
    if (IN_DRAWING_TEST_MODE) {
      drawBoundsArr(ctx, obstacleBoundsArr);
      drawBounds(ctx, playerBounds);
    }

    const isCollision = detectCollision(playerBounds, obstacleBoundsArr);
    if (isCollision) {
      onCollision();
    }

    // const obstacleAchieved =
    //   gameState.obstacleX + currObstacleSprite.w < player.x;
    // if (obstacleAchieved) {
    //   console.log("obstacleAchieved: ", obstacleAchieved);
    // }
  }

  // underwater overlay
  drawUnderwater(ctx, spriteCanvas, spriteData, gameState);
};

function drawBoundsArr(ctx, boundsArr) {
  for (let bounds of boundsArr) {
    drawBounds(ctx, bounds);
  }
}

function detectCollision(bounds1, boundsArr) {
  let isCollision = false;

  for (let targBounds of boundsArr)
    if (
      bounds1.x < targBounds.x + targBounds.w &&
      bounds1.x + bounds1.w > targBounds.x &&
      bounds1.y < targBounds.y + targBounds.h &&
      bounds1.y + bounds1.h > targBounds.y
    ) {
      isCollision = true;
    }

  return isCollision;
}

function drawBounds(ctx, bounds) {
  const { x, y, w, h } = bounds;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.closePath();
  ctx.stroke();
}

export const drawSprite = (ctx, spriteCanvas, sprite, targX, targY) => {
  const { x, y, h, w } = sprite;
  ctx.drawImage(spriteCanvas, x, y, w, h, targX, targY, w, h);
};

export const drawTitle = (ctx, spriteCanvas, sprite, targX, targY) => {
  const { x, y, h, w } = sprite;
  ctx.drawImage(spriteCanvas, x, y, w, h, targX, targY, w, h);

  ctx.drawImage(spriteCanvas, x, y, 160, h, 560, targY, 160, h);
};

// SHORELINE
const drawShoreline = (ctx, spriteCanvas, spriteData, gameState) => {
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
};

// UNDERWATER
const drawUnderwater = (ctx, spriteCanvas, spriteData, gameState) => {
  const underwaterY = 320;
  // const xPos = Math.round(gameState.underwaterX

  ctx.save();
  // ctx.globalAlpha = 0.8;
  // ctx.globalCompositeOperation = "multiply";

  // draw flipped copy
  ctx.save();
  ctx.scale(-1, 1);
  drawSprite(
    ctx,
    spriteCanvas,
    spriteData.underwater,
    0 - spriteData.underwater.w - gameState.underwaterX,
    underwaterY,
    false
  );
  ctx.restore();

  if (gameState.underwaterX < 0) {
    drawSprite(
      ctx,
      spriteCanvas,
      spriteData.underwater,
      gameState.underwaterX + gameState.underwaterW,
      underwaterY
    );
  } else {
    drawSprite(
      ctx,
      spriteCanvas,
      spriteData.underwater,
      gameState.underwaterX - gameState.underwaterW,
      underwaterY
    );
  }
  // ctx.globalCompositeOperation = "source-in";
  // ctx.restore();
};

// PLAYER
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
    r1: degToRad(wingFlap ? 20 : 40),
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

  // body
  ctx.save();
  drawSprite(ctx, spriteCanvas, player, body.x, body.y);
  ctx.restore();

  // wing in front
  ctx.save();
  ctx.translate(wingPos.x + wing.w / 2, wingPos.y + wing.h);
  ctx.rotate(wingPos.r2);
  drawSprite(ctx, spriteCanvas, wing, -wing.w / 2, -wing.h);
  ctx.restore();

  // undo rotation and translation for whole player.
  ctx.restore();
};

const degToRad = (deg) => (deg * Math.PI) / 180;
