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
        {!showCard && (
          <EmptyCardContent>
            <h2>?</h2>
          </EmptyCardContent>
        )}

        {showCard && (
          <Content>
            <img src={data.img} alt="" />

            <TextBit>
              <h3>{data.name}</h3>
              <div>
                <p>TYPE: {data.type}</p>

                {data.date && <p>DATE: {data.date}</p>}

                {data.info && (
                  <p dangerouslySetInnerHTML={{ __html: data.info }} />
                )}

                {data.link && (
                  <p>
                    <a
                      href={data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Find out more
                    </a>
                  </p>
                )}
              </div>
            </TextBit>
          </Content>
        )}
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

const EmptyCardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  p,
  h3 {
    margin: 0 0 10px 0;
  }
`;

const CardHolder = styled.div`
  margin: 5px;
  /* padding: 20px; */
  width: 240px;
  height: 335px;
  /* border-top: 2px solid rgba(255, 255, 255, 1); */
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);

  img {
    max-width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const TextBit = styled.div`
  padding: 20px;
`;
