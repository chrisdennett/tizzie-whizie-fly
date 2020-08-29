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

export const defaultGameState = {
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
  shorelineSpeed: 0.05,

  boatX: 800,
  boatY: water + 10,
  boatH: 70,
  boatSpeed: 2,
  boatLength: 80,

  playerY: water,
  playerH: 50,
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
  };
};

function getBackgroundState(prevGameState) {
  let newVal = prevGameState.shorelineX - prevGameState.shorelineSpeed;
  if (newVal < 0 - prevGameState.shorelineW) {
    newVal = 800;
  }

  return { shorelineX: newVal };
}

function getObstacleState(prevGameState) {
  let newVal = prevGameState.boatX - prevGameState.boatSpeed;

  const currBoat = spriteData.boat;

  if (newVal < 0 - currBoat.w) {
    newVal = 800;
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
