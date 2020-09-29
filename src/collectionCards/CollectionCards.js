import React from "react";
import styled from "styled-components";

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
    <div>
      <h1>Cards</h1>
      <CardList>
        <Card data={cards[0]} />
      </CardList>
    </div>
  );
};

export default CollectionCards;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = ({ data }) => {
  return (
    <CardHolder>
      <img src={data.img} alt="" />
      <h2>{data.name}</h2>
      <p dangerouslySetInnerHTML={{ __html: data.info }} />
    </CardHolder>
  );
};

const CardHolder = styled.div`
  padding: 10px;
  max-width: 240px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  img {
    max-width: 100%;
  }
`;
