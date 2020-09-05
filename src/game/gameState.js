const water = 400;

export const spriteData = {
  cloud: {
    x: 0,
    y: 0,
    w: 130,
    h: 45,
  },
  boatMask: {
    x: 378.43,
    y: 12,
    w: 483.992,
    h: 164.186,
  },
  boat: {
    x: 499.542 - 16,
    y: 355.688 - 18,
    w: 483.996,
    h: 164.181,
  },
  shoreMask: {
    x: 36.201,
    y: 320.096,
    w: 1029.128,
    h: 121.686,
  },
  shore: {
    x: 41.354 - 16,
    y: 130.692 - 18,
    w: 1029.128,
    h: 121.686,
  },
  playerSrc: {
    x: 198.985 - 16,
    y: 346.823 - 18,
    w: 293.146,
    h: 165.963,
  },
  playerMask: { x: 27.53, y: 21.5, w: 293.147, h: 165.955 },
};

const msPerFrame = 1;
const totalDurationSeconds = 10;
const msPerSecond = 1000;
const frequencyOfObstaclesMs = 3000;
const durationMs = totalDurationSeconds * (msPerSecond / msPerFrame);

export const defaultGameState = {
  gameTick: 0,
  msPerFrame,
  duration: durationMs,
  gameOver: false,
  frequencyOfObstaclesMs,
  progress: 0,

  gameW: 1089,
  gameH: 760,

  gravity: 0.01,
  surface: water,

  cloudsMaxY: water - 250,
  cloudsTotal: 5,

  shorelineX: 0,
  shorelineY: water - 120,
  shorelineW: spriteData.shore.w,
  shorelineH: spriteData.shore.h,
  shorelineSpeed: 0.3,

  boatX: 800,
  boatY: water + 10,
  boatH: 70,
  boatSpeed: 2,
  boatLength: 80,

  playerY: water,
  playerH: 0,
  playerW: 100,
  playerVelocityY: -2,
  isJumping: false,
  isDiving: false,
};

export const getNextGameState = (prevGameState, goUp, goDown) => {
  return {
    ...prevGameState,
    ...getPlayerState(prevGameState, goUp, goDown),
    ...getObstacleState(prevGameState),
    ...getBackgroundState(prevGameState),
    ...getGameProgress(prevGameState),
  };
};

function getGameProgress(prevGameState) {
  const newGameTick = prevGameState.gameTick + 1;
  const newGameOver = newGameTick >= prevGameState.duration;
  const newProgress = newGameTick / prevGameState.duration;

  return {
    gameTick: newGameTick,
    gameOver: newGameOver,
    progress: newProgress,
  };
}

function getBackgroundState(prevGameState) {
  let newVal = prevGameState.shorelineX - prevGameState.shorelineSpeed;
  if (newVal < 0 - prevGameState.shorelineW) {
    newVal = prevGameState.shorelineW;
  }

  return { shorelineX: newVal };
}

function getObstacleState(prevGameState) {
  let newVal = prevGameState.boatX - prevGameState.boatSpeed;

  const currBoat = spriteData.boat;

  if (newVal < 0 - currBoat.w) {
    const setOffNewObstacle =
      prevGameState.gameTick % prevGameState.frequencyOfObstaclesMs === 0;

    if (setOffNewObstacle) {
      newVal = 800;
    } else {
      return { boatX: prevGameState.boatX };
    }
  }

  return { boatX: newVal };
}

function getPlayerState(prevGameState, goUp, goDown) {
  if (goUp && !prevGameState.isJumping) {
    return {
      isJumping: true,
      playerVelocityY: defaultGameState.playerVelocityY,
    };
  }
  if (goDown && !prevGameState.isJumping) {
    return {
      isJumping: true,
      isDiving: true,
      playerVelocityY: defaultGameState.playerVelocityY * -1,
    };
  }
  if (!prevGameState.isJumping) return {};

  // is jumping/diving
  let newPlayerY = prevGameState.playerY;
  let newIsJumping = prevGameState.isJumping;
  let newIsDiving = prevGameState.isDiving;
  let newPlayerVelocityY = prevGameState.playerVelocityY;

  newPlayerY += prevGameState.playerVelocityY;

  // if diving
  if (prevGameState.isDiving) {
    if (newPlayerY <= prevGameState.surface) {
      newPlayerY = prevGameState.surface;
      newIsJumping = false;
      newIsDiving = false;
      newPlayerVelocityY = defaultGameState.playerVelocityY;
    }

    newPlayerVelocityY -= prevGameState.gravity;
  }
  // if jumping
  else {
    if (newPlayerY >= prevGameState.surface) {
      newPlayerY = prevGameState.surface;
      newIsJumping = false;
      newIsDiving = false;
      newPlayerVelocityY = defaultGameState.playerVelocityY;
    }

    newPlayerVelocityY += prevGameState.gravity;
  }

  return {
    isJumping: newIsJumping,
    isDiving: newIsDiving,
    playerY: newPlayerY,
    playerVelocityY: newPlayerVelocityY,
  };
}
