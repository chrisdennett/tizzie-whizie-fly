import React from "react";
import styled from "styled-components";

export const StepSelector = ({
  currStep,
  setCurrStep,
  children,
  playTabDisabled,
}) => {
  const onPlayTabClicked = () => {
    if (playTabDisabled) return;

    setCurrStep(3);
  };

  return (
    <Container>
      <Tabs>
        <Tab isSelected={currStep === 0} onClick={() => setCurrStep(0)}>
          PRINT
        </Tab>
        <Tab isSelected={currStep === 1} onClick={() => setCurrStep(1)}>
          CREATE
        </Tab>
        <Tab isSelected={currStep === 2} onClick={() => setCurrStep(2)}>
          SNAP
        </Tab>
        <Tab
          disabled={playTabDisabled}
          isSelected={currStep === 3}
          onClick={onPlayTabClicked}
        >
          PLAY
        </Tab>
      </Tabs>

      <ContentHolder>{children}</ContentHolder>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const ContentHolder = styled.div`
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0.8);
  border-radius: 5px;
`;

const Tabs = styled.div`
  display: flex;
  margin: auto;
  justify-content: space-around;
  max-width: 400px;
`;

const Tab = styled.div`
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  font-size: 1.1em;
  background-color: ${(props) =>
    props.isSelected ? "rgba(0, 0, 0, 0.8)" : "white"};
  color: ${(props) => (props.isSelected ? "white" : "rgba(0, 0, 0, 0.8)")};

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  padding: 5px 10px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-top: 1px solid rgba(0, 0, 0, 0.8);
  border-right: 1px solid rgba(0, 0, 0, 0.8);
  border-left: 1px solid rgba(0, 0, 0, 0.8);
`;
