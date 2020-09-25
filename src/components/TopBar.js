import React from "react";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";
import { TizzieLogo } from "./TizzieLogo";

const TopBar = ({ onInfoClick, showTitle }) => {
  return (
    <Container>
      <TizzieLogo height={42} />

      {showTitle && <h1>Fly Tizzie Fly</h1>}

      <button onClick={onInfoClick}>
        <FaInfoCircle />
        <span> INFO</span>
      </button>
    </Container>
  );
};

export default TopBar;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);

  h1 {
    font-size: 28px;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  button {
    font-size: 18px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;

    svg {
      vertical-align: middle;
    }
  }
`;
