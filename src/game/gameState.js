export const spriteData = {
  cloud: {
    x: 0,
    y: 0,
    w: 130,
    h: 45,
  },
  island: {
    x: 729.714,
    y: 261.485,
    w: 317.343,
    h: 125.057,
  },
  islandMask: {
    x: 723.809,
    y: 579.699,
    w: 317.35,
    h: 125.05,
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

const water = 230;
const msPerFrame = 1;
const totalDurationSeconds = 45;
const msPerSecond = 1000;
const durationMs = totalDurationSeconds * (msPerSecond / msPerFrame);

const obstacles = [
  {
    type: "boat",
    name: "Osprey",
    triggerMs: 50,
  },
  {
    type: "island",
    name: "Belle Isle",
    triggerMs: 100,
  },
  {
    type: "island",
    name: "Isle 2",
    triggerMs: 150,
  },
  {
    type: "boat",
    name: "Swallow II",
    triggerMs: 200,
  },
  {
    type: "island",
    name: "Isle 3",
    triggerMs: 250,
  },
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

  boatX: 900,
  boatY: water + 10,
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
    let newObstacleX = prevGameState.boatX - prevGameState.boatSpeed;

    if (newObstacleX < 0 - obstacleSprite.w) {
      newObstacleX = 900;
      newObstacleInPlay = false;
      newNextObstacleIndex++;
    }

    return {
      boatX: newObstacleX,
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
      boatX: prevGameState.boatX,
    };
  }

  // return {
  //   boatX: newVal,
  //   nextObstacleIndex: newNextObstacleIndex,
  //   obstacleInPlay: newObstacleInPlay,
  // };
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
