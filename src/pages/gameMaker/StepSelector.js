import React from "react";
import styled from "styled-components";

export const StepSelector = ({ currStep, setCurrStep, children }) => {
  return (
    <Container>
      <Tabs>
        <Tab isSelected={currStep === 0} onClick={() => setCurrStep(0)}>
          Intro
        </Tab>
        <Tab isSelected={currStep === 1} onClick={() => setCurrStep(1)}>
          MAKE
        </Tab>
        <Tab isSelected={currStep === 2} onClick={() => setCurrStep(2)}>
          About
        </Tab>
      </Tabs>

      <ContentHolder>{children}</ContentHolder>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 20px;
  width: 100%;
`;

const ContentHolder = styled.div`
  width: 100%;
  /* border-top: 2px solid rgba(0, 0, 0, 0.8); */
  /* border-radius: 5px; */
`;

const Tabs = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
`;

const Tab = styled.div`
  margin: 0 5px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  font-size: 1em;
  background-color: ${(props) =>
    props.isSelected ? "rgba(0, 0, 0, 0.8)" : "white"};
  color: ${(props) => (props.isSelected ? "white" : "rgba(0, 0, 0, 0.8)")};

  border-radius: 5px;

  padding: 10px 10px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: 1px solid rgba(0, 0, 0, 0.8);
`;
