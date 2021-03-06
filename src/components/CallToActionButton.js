import React from "react";
import styled from "styled-components";
import { BiLinkExternal } from "react-icons/bi";

export const CallToActionButton = ({
  children,
  onClick,
  disabled,
  href,
  className,
  style,
  icon,
}) => {
  if (href) {
    return (
      <StyledAnchor
        href={href}
        className={className}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
        disabled={disabled}
      >
        {children} <BiLinkExternal />
      </StyledAnchor>
    );
  }

  return (
    <StyledButton onClick={onClick} disabled={disabled} style={style}>
      {children}
    </StyledButton>
  );
};

const StyledAnchor = styled.a`
  display: inline-block;
  white-space: nowrap;
  padding: 10px 12px;
  text-decoration: none;
  color: black;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  background-color: ${(props) => (props.disabled ? "#ccc" : "#78b92cb0")};
  border: 2px solid black;
  border-radius: 3px;
  cursor: pointer;

  @media (max-width: 430px) {
    font-size: 0.9em;
    /* padding: 5px 8px; */
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  white-space: nowrap;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  background-color: ${(props) => (props.disabled ? "#ccc" : "#78b92cb0")};
  border: 2px solid black;
  border-radius: 3px;
  font-size: 1.1em;
  cursor: pointer;
  display: flex;

  svg {
    font-size: 120%;
    margin: 0 5px;
  }
`;
