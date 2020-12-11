import React, { useEffect } from "react";
import styled from "styled-components";
import { Card } from "./Card";
import { obstacleArr } from "../../pages/game/gameLogic/gameItems";

// const cards = [
//   {
//     type: "boat",
//     name: "The Swallow",
//     date: "1911",
//     img: "./img/boats/swallow.jpg",
//     info: `The Swallow and information about it with a <a href="https://lakelandarts.org.uk/items/swallow-1911/" alt="Boat on Windermere" target="_blank" rel="noopener"> link like this one</a>.`,
//   },
// ];

export const CollectionCards = ({
  maxIndexCollected = 0,
  demoMode = false,
}) => {
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, []);

  const tizzieData = {
    type: "story",
    name: "Tizzie Whizie",
    date: "1900",
    img: "/img/stories/tizzie-whizie-postcard_280x200.jpg",
    link: "https://www.rabbies.com/en/blog/tizzie-whizie-legend-lake-district",
  };

  const uniqueObstacles = obstacleArr.filter((obs, i, self) => {
    // only return obstacles with a unique name property
    return i === self.findIndex((t) => t.name === obs.name);
  });

  return (
    <div>
      <CardList>
        <Card data={tizzieData} showCard={true} />

        {uniqueObstacles.map((item, index) => (
          <Card
            key={index}
            data={item}
            showCard={index <= maxIndexCollected || demoMode}
          />
        ))}
      </CardList>
    </div>
  );
};

const CardList = styled.div`
  margin: 3%;
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;
