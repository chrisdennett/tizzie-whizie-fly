import React from "react";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";

export const InfoButton = ({ onClick }) => (
  <Container>
    <InfoButtonStyled onClick={onClick}>
      <FaInfoCircle />
      <span> About this project</span>
    </InfoButtonStyled>
  </Container>
);

const Container = styled.div`
  text-align: right;
  margin: 10px;
`;

const InfoButtonStyled = styled.button`
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;
