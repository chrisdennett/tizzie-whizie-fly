import { obstacles, getFrameFromSeconds } from "./gameItems";

export const spriteData = {
  title: {
    x: 182.308,
    y: 26.051,
    w: 708.648,
    h: 73.837,
  },
  cloud: {
    x: 93.155,
    y: 256.168,
    w: 156.397,
    h: 93.779,
  },
  island: {
    x: 335.978,
    y: 281.417,
    w: 317.343,
    h: 125.439,
  },
  boat: {
    x: 151.561,
    y: 278.044,
    w: 455.533,
    h: 245.893,
  },
  shore: {
    x: 25.354,
    y: 120.692,
    w: 1029,
    h: 121.686,
  },
  pike: {
    x: 658.811,
    y: 254.488,
    w: 415.895,
    h: 229.685,
  },
  bownessie: {
    x: 17.053,
    y: 361.814,
    w: 596.906,
    h: 386.656,
  },
  player: {
    body: {
      x: 690.205,
      y: 512.43,
      w: 196.916,
      h: 99.488,
    },
    wing: {
      x: 783.3,
      y: 420.27,
      w: 37.259,
      h: 104.111,
    },
    tail: {
      x: 641.425,
      y: 415.255,
      w: 67.4,
      h: 147.935,
    },
    leg: {
      x: 786.943,
      y: 619.854,
      w: 24.976,
      h: 29.299,
    },
  },
  ripples: {
    x: 62.954,
    y: 1074.17,
    w: 1029,
    h: 199,
  },
  underwater: {
    x: 58,
    y: 1325,
    w: 1029,
    h: 199,
  },
};

export const maskData = {
  title: {
    x: 345.214,
    y: 477.056,
    w: 708.648,
    h: 73.837,
  },
  cloud: {
    x: 73.334,
    y: 473.518,
    w: 156.397,
    h: 93.779,
  },
  island: {
    x: 694.327,
    y: 606.233,
    w: 317.343,
    h: 125.439,
  },
  boat: {
    x: 587.15,
    y: 49.14,
    w: 455.533,
    h: 245.893,
  },
  shore: {
    x: 36.201,
    y: 320.096,
    w: 1029,
    h: 121.686,
  },
  pike: {
    x: 692.974,
    y: 815.217,
    w: 413.897,
    h: 227.677,
  },
  bownessie: {
    x: 62.536,
    y: 606.928,
    w: 596.905,
    h: 386.656,
  },
  player: {
    body: {
      x: 212.331,
      y: 55.516,
      w: 196.916,
      h: 99.488,
    },
    wing: {
      x: 141.332,
      y: 57.222,
      w: 37.259,
      h: 104.111,
    },
    tail: {
      x: 46.628,
      y: 41.889,
      w: 67.4,
      h: 147.935,
    },
    leg: {
      x: 432.419,
      y: 104.977,
      w: 24.981,
      h: 29.304,
    },
  },
  ripples: {
    x: 63,
    y: 1074,
    w: 1029,
    h: 199,
  },
  underwater: {
    x: 58,
    y: 1325,
    w: 1029,
    h: 199,
  },
};

const water = 230;
const totalDurationSeconds = 100;
const durationMs = getFrameFromSeconds(totalDurationSeconds);

export const defaultGameState = {
  gameTick: 0,
  duration: durationMs,
  gameOver: false,
  progress: 0,
  nextObstacleIndex: 0,
  obstacleInPlay: false,
  maxObstacleIndexCollected: -1,
  soundOn: false,

  obstacles: obstacles(),

  gameW: 1089,
  gameH: 760,

  gravity: 0.1,
  surface: water,

  cloudsMaxY: water - 250,
  cloudsTotal: 5,

  shorelineX: 0,
  shorelineY: water,
  shorelineW: spriteData.shore.w,
  shorelineH: spriteData.shore.h,
  shorelineSpeed: 0.3,

  underwaterX: 0,
  underwaterY: water,
  underwaterW: spriteData.underwater.w,
  underwaterSpeed: 7,

  obstacleX: 900,
  obstacleY: water + 10,
  obstacleSpeed: 7,

  playerY: water,
  playerX: 80,
  playerH: 0,
  playerW: 100,
  playerVelocityY: -5.7,

  isMoving: false,
  isJumping: false,
  isDiving: false,
};

export const getNextGameState = (prevGameState, goUp, goDown, tickCount) => {
  return {
    frame: tickCount,
    ...prevGameState,
    ...getPlayerState(prevGameState, goUp, goDown),
    ...getObstacleState(prevGameState),
    ...getBackgroundState(prevGameState),
    ...getUnderwaterState(prevGameState),
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

function getUnderwaterState(prevGameState) {
  let newVal = prevGameState.underwaterX - prevGameState.underwaterSpeed;
  if (newVal < 0 - prevGameState.underwaterW) {
    newVal = prevGameState.underwaterW;
  }

  return { underwaterX: newVal };
}

function getObstacleState(prevGameState) {
  let newObstacleInPlay = prevGameState.obstacleInPlay;
  let newNextObstacleIndex = prevGameState.nextObstacleIndex;
  let newMaxObstacleIndexCollected = prevGameState.maxObstacleIndexCollected;
  if (newNextObstacleIndex >= prevGameState.obstacles.length) return {};
  const currObstacle = prevGameState.obstacles[newNextObstacleIndex];
  const obstacleSprite = spriteData[currObstacle.type];

  // if animating obstacle
  if (newObstacleInPlay) {
    let newObstacleX = prevGameState.obstacleX - prevGameState.obstacleSpeed;

    // if obstacle has gone off the left side of the screen
    if (newObstacleX < 0 - obstacleSprite.w) {
      // add it to the collected items array
      newMaxObstacleIndexCollected = newNextObstacleIndex;

      // get a new obstacle ready.
      newObstacleX = 900;
      newObstacleInPlay = false;
      newNextObstacleIndex++;
    }

    return {
      obstacleX: newObstacleX,
      obstacleInPlay: newObstacleInPlay,
      nextObstacleIndex: newNextObstacleIndex,
      maxObstacleIndexCollected: newMaxObstacleIndexCollected,
    };
  }

  // check if it's time to set a new obstacle
  const setOffNewObstacle = prevGameState.gameTick >= currObstacle.triggerMs;

  if (setOffNewObstacle) {
    if (newNextObstacleIndex < prevGameState.obstacles.length) {
      return {
        obstacleInPlay: true,
      };
    } else {
      // no more obstacles
      return {};
    }
  } else {
    return {
      obstacleX: prevGameState.obstacleX,
    };
  }
}

function getPlayerState(prevGameState, goUp, goDown) {
  if (goUp && !prevGameState.isMoving) {
    return {
      isJumping: true,
      isMoving: true,
      playerVelocityY: defaultGameState.playerVelocityY,
    };
  }
  if (goDown && !prevGameState.isMoving) {
    return {
      isDiving: true,
      isMoving: true,
      playerVelocityY: defaultGameState.playerVelocityY * -1,
    };
  }
  if (!prevGameState.isMoving) return {};

  // is jumping/diving
  let newPlayerY = prevGameState.playerY;
  let newIsMoving = prevGameState.isMoving;
  let newIsJumping = prevGameState.isJumping;
  let newIsDiving = prevGameState.isDiving;
  let newPlayerVelocityY = prevGameState.playerVelocityY;

  newPlayerY += prevGameState.playerVelocityY;

  // if diving
  if (prevGameState.isDiving) {
    if (newPlayerY <= prevGameState.surface) {
      newPlayerY = prevGameState.surface;
      newIsMoving = false;
      newIsDiving = false;
      newPlayerVelocityY = defaultGameState.playerVelocityY;
    }

    newPlayerVelocityY -= prevGameState.gravity;
  }
  // if jumping
  else if (prevGameState.isJumping) {
    if (newPlayerY >= prevGameState.surface) {
      newPlayerY = prevGameState.surface;
      newIsJumping = false;
      newIsMoving = false;
      newPlayerVelocityY = defaultGameState.playerVelocityY;
    }

    newPlayerVelocityY += prevGameState.gravity;
  }

  return {
    isMoving: newIsMoving,
    isJumping: newIsJumping,
    isDiving: newIsDiving,
    playerY: newPlayerY,
    playerVelocityY: newPlayerVelocityY,
  };
}
