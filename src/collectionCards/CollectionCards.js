import React from "react";
import styled from "styled-components";
import { Card } from "./Card";
import { obstacleArr } from "../pages/game/gameLogic/gameItems";

// const cards = [
//   {
//     type: "boat",
//     name: "The Swallow",
//     date: "1911",
//     img: "./img/boats/swallow.jpg",
//     info: `The Swallow and information about it with a <a href="https://lakelandarts.org.uk/items/swallow-1911/" alt="Boat on Windermere" target="_blank" rel="noopener"> link like this one</a>.`,
//   },
// ];

const CollectionCards = ({ maxIndexCollected = 0 }) => {
  return (
    <CardList>
      {obstacleArr.map((item, index) => (
        // <Card key={index} data={item} showCard={true} />
        <Card key={index} data={item} showCard={index <= maxIndexCollected} />
      ))}
    </CardList>
  );
};

export default CollectionCards;

const CardList = styled.div`
  margin: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;
