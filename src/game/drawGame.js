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
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowOffsetY = 10;
  ctx.shadowOffsetX = 10;
  ctx.shadowBlur = 5;
  drawSprite(
    ctx,
    spriteCanvas,
    spriteData.player,
    100,
    gameState.playerY - (gameState.playerH + 20)
  );
  ctx.restore();
};

function drawSprite(ctx, spriteCanvas, sprite, targX, targY) {
  const { x, y, h, w } = sprite;

  ctx.drawImage(spriteCanvas, x, y, w, h, targX, targY, w, h);
}
