export const drawGame = (gameCanvas, gameState, spriteCanvas, spriteData) => {
  const ctx = gameCanvas.getContext("2d");
  // clear scene
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // ctx.drawImage(spriteCanvas, 0, 0);

  for (let c = 0; c < gameState.cloudsTotal; c++) {
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 0, 90, 50);
  }

  // shoreline
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
    spriteCanvas,
    spriteData.boats[0],
    gameState.boatX,
    gameState.boatY - gameState.boatH
  );

  // player
  drawSprite(
    ctx,
    spriteCanvas,
    spriteData.player,
    100,
    gameState.playerY - (gameState.playerH + 20)
  );
};

function drawSprite(ctx, spriteCanvas, sprite, targX, targY) {
  const { x, y, h, w } = sprite;

  ctx.drawImage(spriteCanvas, x, y, w, h, targX, targY, w, h);
}
