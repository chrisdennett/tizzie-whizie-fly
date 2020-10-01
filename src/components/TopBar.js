import React from "react";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";
import { TizzieLogo } from "./TizzieLogo";
import { useScroll } from "../hooks/useScroll";

const TopBar = ({ onHomeClick, onInfoClick, showTitle }) => {
  const { scrollY } = useScroll();

  return (
    <Container scrollY={scrollY}>
      <HomeButton onClick={onHomeClick}>
        <TizzieLogo height={42} />
      </HomeButton>

      {showTitle && <h1>Fly Tizzie Fly</h1>}

      <InfoButton onClick={onInfoClick}>
        <FaInfoCircle />
        <span> INFO</span>
      </InfoButton>
    </Container>
  );
};

export default TopBar;

const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  /* background: rgba(255, 255, 255, 0.9); */
  background-image: url("/linedpaper.png");
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: ${(props) =>
    props.scrollY > 0 ? "0px 3px 3px rgba(0, 0, 0, 0.1)" : ""};

  h1 {
    font-size: 28px;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }
`;

const HomeButton = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
`;

const InfoButton = styled.button`
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  cursor: pointer;

  svg {
    vertical-align: middle;
  }
`;
