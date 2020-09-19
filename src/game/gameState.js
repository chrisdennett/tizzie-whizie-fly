export const spriteData = {
  title: {
    x: 276.118,
    y: 21.882,
    w: 708.648,
    h: 73.837,
  },
  cloud: {
    x: 87.324,
    y: 48.124,
    w: 156.397,
    h: 93.779,
  },
  island: {
    x: 333.978,
    y: 269.417,
    w: 317.343,
    h: 125.439,
  },
  boat: {
    x: 149.561,
    y: 266.044,
    w: 455.533,
    h: 245.893,
  },
  shore: {
    x: 25.354,
    y: 110.692,
    w: 1029.124,
    h: 121.686,
  },
  pike: {
    x: 656.811,
    y: 242.488,
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
      x: 688.205,
      y: 500.43,
      w: 196.916,
      h: 99.488,
    },
    wing: {
      x: 781.3,
      y: 408.27,
      w: 37.259,
      h: 104.111,
    },
    tail: {
      x: 639.425,
      y: 403.255,
      w: 67.4,
      h: 147.935,
    },
    leg: {
      x: 784.943,
      y: 607.854,
      w: 24.976,
      h: 29.299,
    },
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
    w: 1029.124,
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
};

const water = 230;
const msPerFrame = 16.7; // this is what use animation frame gives us
const msPerSecond = 1000;
const totalDurationSeconds = 20;
const getFrameFromSeconds = (seconds) => (seconds * msPerSecond) / msPerFrame;
const durationMs = getFrameFromSeconds(totalDurationSeconds);

const obstacles = [
  {
    type: "boat",
    name: "Osprey",
    triggerMs: getFrameFromSeconds(2),
  },
  {
    type: "island",
    name: "Belle Isle",
    triggerMs: getFrameFromSeconds(4),
  },
  {
    type: "pike",
    name: "The Pike",
    triggerMs: getFrameFromSeconds(4),
  },
  {
    type: "bownessie",
    name: "Bownessie",
    triggerMs: getFrameFromSeconds(6),
  },
  // {
  //   type: "player.body",
  //   name: "Tizzie Whizie",
  //   triggerMs: getFrameFromSeconds(8),
  // },
];

export const defaultGameState = {
  gameTick: 0,
  msPerFrame,
  duration: durationMs,
  gameOver: false,
  progress: 0,
  nextObstacleIndex: 0,
  obstacleInPlay: false,

  obstacles,

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
  shorelineSpeed: 2,

  obstacleX: 900,
  obstacleY: water + 10,
  boatH: 70,
  boatSpeed: 7,
  boatLength: 80,

  playerY: water,
  playerH: 0,
  playerW: 100,
  playerVelocityY: -5,
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
  let newObstacleInPlay = prevGameState.obstacleInPlay;
  let newNextObstacleIndex = prevGameState.nextObstacleIndex;
  if (newNextObstacleIndex >= prevGameState.obstacles.length) return {};
  const currObstacle = prevGameState.obstacles[newNextObstacleIndex];
  const obstacleSprite = spriteData[currObstacle.type];

  // if animating obstacle
  if (newObstacleInPlay) {
    let newObstacleX = prevGameState.obstacleX - prevGameState.boatSpeed;

    if (newObstacleX < 0 - obstacleSprite.w) {
      newObstacleX = 900;
      newObstacleInPlay = false;
      newNextObstacleIndex++;
    }

    return {
      obstacleX: newObstacleX,
      obstacleInPlay: newObstacleInPlay,
      nextObstacleIndex: newNextObstacleIndex,
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
