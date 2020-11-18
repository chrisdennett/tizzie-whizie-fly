import React from "react";
import styled from "styled-components";
import { CallToActionButton } from "../../components/CallToActionButton";

export const SampleCard = ({ onSelect, img, thumb, label, details }) => {
  return (
    <Card onClick={() => onSelect(img)}>
      <img src={"/" + thumb} alt={label} />
      <LabelHolder>
        <h3>{label}</h3>
        <p>{details}</p>
        <CallToActionButton>PICK ME!</CallToActionButton>
      </LabelHolder>
    </Card>
  );
};

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  background-color: white;
  /* max-width: 170px; */
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 1);
  margin: 7px;

  img {
    max-width: 100%;
  }
`;

const LabelHolder = styled.div`
  padding: 15px;
  display: inline-flex;
  flex-direction: column;
  h3 {
    margin: 0;
  }
  p {
    margin: 0 0 10px 0;
  }
  button {
    align-self: flex-end;
  }
`;

export const SampleCards = ({ children }) => <Holder>{children}</Holder>;

const Holder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.4);
  background: url("./img/bg/redox_01-min.png");
  border-bottom: 2px solid;
`;
