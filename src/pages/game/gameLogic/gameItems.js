// gets just the data needed during the game
export const obstacles = () => {
  const arrWithTimings = obstacleArr.map((obs, i) => {
    const { type } = obs;

    return { type, triggerMs: 2 + i * 250, position: i };
  });

  return arrWithTimings;
};

export const obstacleArr = [
  // { type: "bownessie", name: "Wreck Name", position: "0", link: "" },
  {
    type: "boat",
    name: "Margaret",
    date: "1780",
    link: "https://lakelandarts.org.uk/items/margaret-around-1780/",
  },
  { type: "wreck", name: "Wreck Name", link: "" },
  {
    type: "boat",
    name: "Esperance",
    date: "1869",
    link: "https://lakelandarts.org.uk/items/esperance-1869/",
  },
  { type: "island", name: "Silver Holme.", link: "" },
  { type: "island", name: "Crag Holme", link: "" },
  {
    type: "boat",
    name: "Branksome",
    date: "1896",
    link: "https://lakelandarts.org.uk/items/branksome/",
  },
  { type: "island", name: "Grass Holme,", link: "" },
  {
    type: "pike",
    name: "The Pike",
    date: "XXXX",
    link: "XXXX",
  },
  { type: "island", name: "Ling Holme", link: "" },
  {
    type: "boat",
    name: "Motorboat",
    date: "1898",
    link: "https://lakelandarts.org.uk/items/motorboat-1898/",
  },
  { type: "island", name: "Ramp Holme", link: "" },
  {
    type: "boat",
    name: "Lady Elizabeth",
    date: "1900",
    link: "https://lakelandarts.org.uk/items/lady-elizabeth-around-1900/",
  },
  {
    type: "bownessie",
    name: "Kittiwake",
    date: "1898",
    link: "https://lakelandarts.org.uk/items/kittiwake-1898/",
  },
  { type: "island", name: "Crow Holme,", link: "" },
  { type: "island", name: "Maiden Holme", link: "" },
  {
    type: "boat",
    name: "Osprey",
    date: "1902",
    link: "https://lakelandarts.org.uk/items/osprey-1902/",
  },
  { type: "island", name: "Belle Isle", link: "" },
  {
    type: "boat",
    name: "Swallow",
    position: "17",
    date: "1911",
    link: "https://lakelandarts.org.uk/items/swallow-1911/",
  },
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
    link: "",
  },
  {
    type: "boat",
    name: "White Lady II",
    date: "1930",
    link: "https://lakelandarts.org.uk/items/white-lady-ii/",
  },
  {
    type: "island",
    name: "Lilies of the Valley (West),",
    link: "",
  },
  {
    type: "boat",
    name: "Penelope II",
    date: "1930",
    link: "https://lakelandarts.org.uk/items/penelope-ii-1930/",
  },
  { type: "island", name: "Snake Holme,", link: "" },
  {
    type: "boat",
    name: "Jane",
    date: "1937",
    link: "https://lakelandarts.org.uk/items/jane-1937/",
  },
  { type: "island", name: "Birk or Birch Holme", link: "" },
  { type: "island", name: "Thompson Holme ", link: "" },
  { type: "island", name: "Hawes Holme", link: "" },
  { type: "island", name: "Hen Holme", link: "" },
  {
    type: "boat",
    name: "Slingsby Falcon 1 Glider",
    date: "1943",
    link: "https://lakelandarts.org.uk/items/slingsby-falcon-1-glider-1943/",
  },
  { type: "island", name: "Ladyholme", link: "" },
  { type: "wreck", name: "Wreck Name", link: "" },
  { type: "island", name: "Rough Holme", link: "" },
  {
    type: "boat",
    name: "Miss Windermere IV",
    date: "1958",
    link: "https://lakelandarts.org.uk/items/miss-windermere-iv-1958/",
  },
  { type: "island", name: "Green Tuft Island", link: "" },
  { type: "island", name: "Bee Holme", link: "" },
  { type: "wreck", name: "Wreck Name", link: "" },
  { type: "island", name: "Blake Holme", link: "" },
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
