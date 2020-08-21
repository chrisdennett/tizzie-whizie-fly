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
      x: 410,
      y: 150,
      w: 300,
      h: 110,
    },
  ],
  shore: {
    x: 0,
    y: 80,
    w: 805,
    h: 130,
  },
  player: {
    x: 450,
    y: 295,
    w: 240,
    h: 131,
  },
};

export const defaultGameState = {
  gameW: 800,
  gameH: 600,

  gravity: 0.03,
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
  playerVelocityY: -4,
  isJumping: false,
  jumpPower: -15,
};

export const getNextGameState = (prevGameState, doJump) => {
  return {
    ...prevGameState,
    ...getPlayerState(prevGameState, doJump),
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

function getPlayerState(prevGameState, doJump) {
  if (doJump) {
    return {
      jumpPower: defaultGameState.jumpPower,
      isJumping: true,
      playerVelocityY: defaultGameState.playerVelocityY,
    };
  }
  if (!prevGameState.isJumping) return {};

  let newPlayerY = prevGameState.playerY;
  let newIsJumping = prevGameState.isJumping;
  let newPlayerVelocityY = prevGameState.playerVelocityY;

  newPlayerY += prevGameState.playerVelocityY;
  if (newPlayerY >= prevGameState.surface) {
    newPlayerY = prevGameState.surface;
    newIsJumping = false;
    newPlayerVelocityY = defaultGameState.playerVelocityY;
  }

  newPlayerVelocityY += prevGameState.gravity;

  return {
    isJumping: newIsJumping,
    playerY: newPlayerY,
    playerVelocityY: newPlayerVelocityY,
  };
}
