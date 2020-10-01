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
  padding: 20px;
  max-width: 240px;
  border-top: 2px solid rgba(255, 255, 255, 1);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.5), 4px 4px 6px rgba(0, 0, 0, 0.2);

  img {
    max-width: 100%;
  }
`;
