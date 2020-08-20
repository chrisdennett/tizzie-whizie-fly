export const drawGame = (gameCanvas, gameState, spriteSheet, spriteData) => {
  const ctx = gameCanvas.getContext("2d");
  // clear scene
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  for (let c = 0; c < gameState.cloudsTotal; c++) {
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 0, 90, 50);
  }

  // shoreline
  ctx.save();
  ctx.scale(-1, 1);
  drawSprite(
    ctx,
    spriteSheet,
    spriteData.shore,
    0 - spriteData.shore.w - gameState.shorelineX,
    gameState.shorelineY - gameState.shorelineH
  );
  ctx.restore();
  if (gameState.shorelineX < 0) {
    drawSprite(
      ctx,
      spriteSheet,
      spriteData.shore,
      gameState.shorelineX + gameState.shorelineW,
      gameState.shorelineY - gameState.shorelineH
    );
  } else {
    drawSprite(
      ctx,
      spriteSheet,
      spriteData.shore,
      gameState.shorelineX - gameState.shorelineW,
      gameState.shorelineY - gameState.shorelineH
    );
  }

  // surface water
  ctx.fillStyle = "blue";
  ctx.fillRect(
    0,
    gameState.shorelineY,
    gameState.gameW,
    gameState.surface - gameState.shorelineY
  );

  //under water
  ctx.fillStyle = "cyan";
  ctx.fillRect(
    0,
    gameState.surface,
    gameState.gameW,
    gameState.gameH - gameState.shorelineY
  );

  // boat
  drawSprite(
    ctx,
    spriteSheet,
    spriteData.boats[0],
    gameState.boatX,
    gameState.boatY - gameState.boatH
  );

  // player
  drawSprite(
    ctx,
    spriteSheet,
    spriteData.player,
    100,
    gameState.playerY - (gameState.playerH + 20)
  );
};

function drawSprite(ctx, spriteSheet, sprite, targX, targY) {
  const { x, y, h, w } = sprite;

  ctx.drawImage(spriteSheet, x, y, w, h, targX, targY, w, h);
}
