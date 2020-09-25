import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import ExternalLink from "./ExternalLink";

const About = ({ onClose }) => {
  const onContainerClick = (e) => {
    e.stopPropagation();

    if (e.target.id === "bg") {
      onClose();
    }
  };

  return (
    <Container id={"bg"} onClick={onContainerClick}>
      <Content onClick={() => console.log("CLICKED")}>
        <CloseButton onClick={onClose}>
          <AiOutlineClose />
        </CloseButton>
        <h1>About</h1>
        <ul>
          <li>
            Made as part{" "}
            <ExternalLink href="https://signalfilmandmedia.com/source/">
              SOURCE
            </ExternalLink>{" "}
            — the Cumbrian Artist Digital Development Lab from{" "}
            <ExternalLink href="https://signalfilmandmedia.com/">
              Signal Film & Media
            </ExternalLink>
          </li>
          <li>
            By Artist:{" "}
            <ExternalLink href="https://artfly.io/chris-dennett/">
              Chris Dennett
            </ExternalLink>{" "}
          </li>
          <li>
            For the{" "}
            <ExternalLink
              href={"https://lakelandarts.org.uk/windermere-jetty-museum/"}
            >
              Windermere Jetty Museum
            </ExternalLink>
          </li>
        </ul>
        <p>Add more information about the project here...</p>
      </Content>
    </Container>
  );
};

export default About;

const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background: whitesmoke;
  max-width: 800px;
  border-radius: 10px;
  padding: 10px 30px;
  position: relative;

  h1 {
    margin: 20px 0 0 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  border: none;
  background: none;
  outline: none;
  font-size: 36px;
  cursor: pointer;
`;
