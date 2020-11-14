import React from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";

export const StepSelector = ({ currStep, setCurrStep, children }) => {
  return (
    <Container>
      <AnimateSharedLayout>
        <List>
          {screens.map(({ title, color }, i) => (
            <ListItem
              animate
              key={i}
              style={{
                color: i === currStep ? color : "#333",
                fontSize: i === currStep ? 28 : 24,
              }}
              onClick={() => setCurrStep(i)}
            >
              {i === currStep && (
                <motion.div
                  layoutId="underline"
                  className="underline"
                  style={{ backgroundColor: color }}
                />
              )}
              {title}
            </ListItem>
          ))}
        </List>
      </AnimateSharedLayout>

      <ContentHolder>{children}</ContentHolder>
    </Container>
  );
};

const List = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListItem = styled(motion.div)`
  padding: 0;
  margin: 20px;
  user-select: none;
  font-size: 14px;
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
  position: relative;
  cursor: pointer;
`;

export const screens = [
  {
    title: "INTRO",
    color: "#ff0055",
  },
  {
    title: "MAKE",
    color: "#0099ff",
  },
  {
    title: "ABOUT",
    color: "#22cc88",
  },
];

const Container = styled.div`
  padding-top: 20px;
  width: 100%;
`;

const ContentHolder = styled.div`
  width: 100%;
`;
