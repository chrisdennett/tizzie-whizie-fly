export const msPerFrame = 16.7; // this is what use animation frame gives us
const msPerSecond = 1000;
export const getFrameFromSeconds = (seconds) =>
  (seconds * msPerSecond) / msPerFrame;

export const obstacles = () => {
  const arrWithTimings = obstacleArr.map((obs, i) => {
    const { type } = obs;

    return { type, triggerMs: getFrameFromSeconds(2 + i * 2) };
  });

  return arrWithTimings;
};

export const obstacleArr = [
  {
    type: "boat",
    name: "Margaret",
    position: "1",
    date: "1780",
    link: "https://lakelandarts.org.uk/items/margaret-around-1780/",
  },
  { type: "island", name: "Blake Holme", position: "2", link: "" },
  {
    type: "boat",
    name: "Esperance",
    position: "3",
    date: "1869",
    link: "https://lakelandarts.org.uk/items/esperance-1869/",
  },
  { type: "island", name: "Silver Holme.", position: "4", link: "" },
  {
    type: "story",
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
];
