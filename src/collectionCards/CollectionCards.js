import React from "react";
import styled from "styled-components";
import { Card } from "./Card";

const cards = [
  {
    type: "boat",
    name: "The Swallow",
    date: "1911",
    img: "./img/boats/swallow.jpg",
    info: `The Swallow and information about it with a <a href="https://lakelandarts.org.uk/items/swallow-1911/" alt="Boat on Windermere" target="_blank" rel="noopener"> link like this one</a>.`,
  },
];

const CollectionCards = ({ data }) => {
  return (
    <CardList>
      <Card data={cards[0]} />
    </CardList>
  );
};

export default CollectionCards;

const CardList = styled.div`
  margin: 30px;
  display: flex;
  flex-wrap: wrap;
`;
