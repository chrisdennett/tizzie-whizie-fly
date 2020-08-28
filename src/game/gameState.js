const water = 400;

export const spriteData = {
  cloud: {
    x: 0,
    y: 0,
    w: 130,
    h: 45,
  },
  boats: [
    {
      x: 404,
      y: 140,
      w: 305,
      h: 113,
    },
  ],
  shore: {
    x: 0,
    y: 80,
    w: 805,
    h: 130,
  },
  player: {
    x: 445,
    y: 285,
    w: 243,
    h: 131,
  },
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
  shorelineW: 805,
  shorelineH: 130,
  shorelineSpeed: 0.2,

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

  const currBoat = spriteData.boats[0];

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
