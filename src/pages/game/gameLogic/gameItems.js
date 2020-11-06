export const msPerFrame = 16.7; // this is what use animation frame gives us
const msPerSecond = 1000;

export const getFrameFromSeconds = (seconds) =>
  (seconds * msPerSecond) / msPerFrame;

// gets just the data needed during the game
export const obstacles = () => {
  const arrWithTimings = obstacleArr.map((obs, i) => {
    const { type } = obs;

    return { type, triggerMs: getFrameFromSeconds(2 + i * 2) };
  });

  return arrWithTimings;
};

export const obstacleArr = [
  // { type: "bownessie", name: "Wreck Name", position: "0", link: "" },
  {
    type: "boat",
    name: "Margaret",
    position: "1",
    date: "1780",
    link: "https://lakelandarts.org.uk/items/margaret-around-1780/",
  },
  { type: "wreck", name: "Wreck Name", position: "2", link: "" },
  {
    type: "boat",
    name: "Esperance",
    position: "3",
    date: "1869",
    link: "https://lakelandarts.org.uk/items/esperance-1869/",
  },
  { type: "island", name: "Silver Holme.", position: "4", link: "" },
  {
    type: "pike",
    name: "The Pike",
    position: "5",
    date: "XXXX",
    link: "XXXX",
  },
  { type: "island", name: "Crag Holme", position: "6", link: "" },
  {
    type: "boat",
    name: "Branksome",
    position: "7",
    date: "1896",
    link: "https://lakelandarts.org.uk/items/branksome/",
  },
  { type: "island", name: "Grass Holme,", position: "8", link: "" },
  {
    type: "bownessie",
    name: "Kittiwake",
    position: "9",
    date: "1898",
    link: "https://lakelandarts.org.uk/items/kittiwake-1898/",
  },
  { type: "island", name: "Ling Holme", position: "10", link: "" },
  {
    type: "boat",
    name: "Motorboat",
    position: "11",
    date: "1898",
    link: "https://lakelandarts.org.uk/items/motorboat-1898/",
  },
  { type: "island", name: "Ramp Holme", position: "12", link: "" },
  {
    type: "boat",
    name: "Lady Elizabeth",
    position: "13",
    date: "1900",
    link: "https://lakelandarts.org.uk/items/lady-elizabeth-around-1900/",
  },
  { type: "island", name: "Crow Holme,", position: "14", link: "" },
  {
    type: "boat",
    name: "Osprey",
    position: "15",
    date: "1902",
    link: "https://lakelandarts.org.uk/items/osprey-1902/",
  },
  { type: "island", name: "Maiden Holme", position: "16", link: "" },
  {
    type: "boat",
    name: "Swallow",
    position: "17",
    date: "1911",
    link: "https://lakelandarts.org.uk/items/swallow-1911/",
  },
  { type: "island", name: "Belle Isle", position: "18", link: "" },
  {
    type: "boat",
    name: "Canfly",
    position: "19",
    date: "1922",
    link: "https://lakelandarts.org.uk/items/canfly-1922/",
  },
  {
    type: "island",
    name: "Lilies of the Valley (East)",
    position: "20",
    link: "",
  },
  {
    type: "boat",
    name: "White Lady II",
    position: "21",
    date: "1930",
    link: "https://lakelandarts.org.uk/items/white-lady-ii/",
  },
  {
    type: "island",
    name: "Lilies of the Valley (West),",
    position: "22",
    link: "",
  },
  {
    type: "boat",
    name: "Penelope II",
    position: "23",
    date: "1930",
    link: "https://lakelandarts.org.uk/items/penelope-ii-1930/",
  },
  { type: "island", name: "Snake Holme,", position: "24", link: "" },
  {
    type: "boat",
    name: "Jane",
    position: "25",
    date: "1937",
    link: "https://lakelandarts.org.uk/items/jane-1937/",
  },
  { type: "island", name: "Birk or Birch Holme", position: "26", link: "" },
  {
    type: "boat",
    name: "Slingsby Falcon 1 Glider",
    position: "27",
    date: "1943",
    link: "https://lakelandarts.org.uk/items/slingsby-falcon-1-glider-1943/",
  },
  { type: "island", name: "Thompson Holme ", position: "28", link: "" },
  {
    type: "boat",
    name: "Miss Windermere IV",
    position: "29",
    date: "1958",
    link: "https://lakelandarts.org.uk/items/miss-windermere-iv-1958/",
  },
  { type: "island", name: "Hawes Holme", position: "30", link: "" },
  { type: "island", name: "Hen Holme", position: "32", link: "" },
  { type: "island", name: "Ladyholme", position: "34", link: "" },
  { type: "island", name: "Rough Holme", position: "36", link: "" },
  { type: "island", name: "Green Tuft Island", position: "38", link: "" },
  { type: "island", name: "Bee Holme", position: "40", link: "" },
  { type: "island", name: "Blake Holme", position: "42", link: "" },
];

export const spriteData = {
  title: {
    x: 110,
    y: 20,
    w: 447,
    h: 71,
  },
  cloud: {
    x: 434,
    y: 640,
    w: 155,
    h: 92,
  },
  island: {
    x: 556,
    y: 366,
    w: 300,
    h: 345,
  },
  boat: {
    x: 603,
    y: 233,
    w: 439,
    h: 106,
  },
  shore: {
    x: 22,
    y: 103,
    w: 1028,
    h: 121,
  },
  pike: {
    x: 86,
    y: 385,
    w: 415,
    h: 229,
  },
  bownessie: {
    x: 10,
    y: 367,
    w: 402,
    h: 388,
  },
  wreck: {
    x: 760,
    y: 357,
    w: 316,
    h: 399,
  },
  player: {
    body: {
      x: 360,
      y: 322,
      w: 192,
      h: 110,
    },
    wing: {
      x: 434,
      y: 230,
      w: 36,
      h: 103,
    },
    tail: {
      x: 291,
      y: 264,
      w: 62,
      h: 139,
    },
    leg: {
      x: 387,
      y: 439,
      w: 24,
      h: 28,
    },
  },
  ripples: {
    x: 31,
    y: 903,
    w: 1029,
    h: 566,
  },
  underwater: {
    x: 30,
    y: 1474,
    w: 1029,
    h: 263,
  },
};

export const maskData = {
  title: {
    x: 30,
    y: 36,
    w: 447,
    h: 71,
  },
  cloud: {
    x: 490,
    y: 628,
    w: 155,
    h: 92,
  },
  island: {
    x: 444,
    y: 262,
    w: 300,
    h: 345,
  },
  boat: {
    x: 631,
    y: 19,
    w: 439,
    h: 106,
  },
  shore: {
    x: 30,
    y: 131,
    w: 1028,
    h: 121,
  },
  pike: {
    x: 684,
    y: 665,
    w: 415,
    h: 229,
  },
  bownessie: {
    x: 30,
    y: 407,
    w: 402,
    h: 388,
  },
  wreck: {
    x: 770,
    y: 259,
    w: 316,
    h: 399,
  },
  player: {
    body: {
      x: 236,
      y: 264,
      w: 192,
      h: 110,
    },
    wing: {
      x: 182,
      y: 274,
      w: 36,
      h: 103,
    },
    tail: {
      x: 30,
      y: 260,
      w: 62,
      h: 139,
    },
    leg: {
      x: 126,
      y: 335,
      w: 24,
      h: 28,
    },
  },
  ripples: {
    x: 31,
    y: 903,
    w: 1029,
    h: 566,
  },
  underwater: {
    x: 30,
    y: 1474,
    w: 1029,
    h: 263,
  },
};
