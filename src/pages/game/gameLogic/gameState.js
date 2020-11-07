import { obstacles, getFrameFromSeconds, spriteData } from "./gameItems";

const water = 230;
// const totalDurationSeconds = 45;
// const durationMs = getFrameFromSeconds(totalDurationSeconds);

const _obstacles = obstacles();
const duration = _obstacles[_obstacles.length - 1].triggerMs;

export const defaultGameState = {
  topScore: 123456,
  gameTick: 0,
  gameOver: false,
  progress: 0,
  nextObstacleIndex: 0,
  obstacleInPlay: false,
  maxObstacleIndexCollected: -1,
  soundOn: false,

  obstacles: _obstacles,
  duration,

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
  const cardsWon = prevGameState.nextObstacleIndex;
  const pointsWon =
    newProgress >= 1
      ? prevGameState.topScore
      : Math.round(newProgress * prevGameState.topScore);

  return {
    gameTick: newGameTick,
    gameOver: newGameOver,
    progress: newProgress,
    cardsWon,
    pointsWon,
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
