import React from "react";
import styled from "styled-components";

export const Border = ({ type }) => {
  if (type === "top") {
    return <BorderTop />;
  }

  return <BorderBottom />;
};

const BorderTop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  opacity: 0.3;
  background-image: url("/img/bg/border-top.png");
`;

const BorderBottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10px;
  opacity: 0.3;
  background-image: url("/img/bg/border-bottom.png");
`;