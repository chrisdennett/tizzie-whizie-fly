import React from "react";
import styled from "styled-components";
import PhotoCorner from "../components/PhotoCorner";

export const Card = ({ data, showCard }) => {
  return (
    <Outer>
      <Corner style={{ top: 0, left: 0 }}>
        <PhotoCorner />
      </Corner>
      <Corner style={{ top: 0, right: 0 }}>
        <PhotoCorner flipH={true} />
      </Corner>
      <Corner style={{ bottom: 0, left: 0 }}>
        <PhotoCorner flipV={true} />
      </Corner>
      <Corner style={{ bottom: 0, right: 0 }}>
        <PhotoCorner flipH={true} flipV={true} />
      </Corner>

      <CardHolder>
        <img src={data.img} alt="" />
        <h2>{showCard ? data.name : "?"}</h2>
        <p dangerouslySetInnerHTML={{ __html: data.info }} />
      </CardHolder>
    </Outer>
  );
};

const Outer = styled.div`
  position: relative;
  margin: 5px;
`;

const Corner = styled.div`
  padding: 0;
  margin: 0;
  line-height: 0;
  position: absolute;
`;

const CardHolder = styled.div`
  margin: 5px;
  padding: 20px;
  max-width: 240px;
  /* border-top: 2px solid rgba(255, 255, 255, 1); */
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);

  img {
    max-width: 100%;
  }
`;
