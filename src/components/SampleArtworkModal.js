import React from "react";
import styled from "styled-components";
import { CallToActionButton } from "./CallToActionButton";
import ExternalLink from "./ExternalLink";

export const SampleArtworkModal = ({
  artist,
  isShowing,
  onClose,
  onSelect,
}) => {
  if (!isShowing) return null;

  const dir = "/img/artists/";

  const onClick = (e) => {
    if (e.target.id === "artistModalBg") {
      onClose();
    }
  };

  return (
    <Outer onClick={onClick} id="artistModalBg">
      <ModalContent>
        <h2>
          <span>Artist:</span> {artist.name}
        </h2>

        <img src={dir + artist.mediumImg} alt={artist.label} />

        <CallToActionButton onClick={onSelect}>
          GENERATE GAME WITH ARTWORK
        </CallToActionButton>

        {artist.links && (
          <>
            <p>See more of {artist.name}'s artwork:</p>
            <ul>
              {artist.links.map((link) => (
                <li key={link.url}>
                  <ExternalLink href={link.url}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </>
        )}

        <CallToActionButton onClick={onClose} style={{ background: "#63bbe4" }}>
          CLOSE
        </CallToActionButton>
      </ModalContent>
    </Outer>
  );
};

const Outer = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;

const ModalContent = styled.div`
  margin: 5px;
  max-height: 100%;
  overflow: auto;
  /* background-color: rgba(255, 255, 255, 0.5); */
  border-radius: 8px;
  background: whitesmoke;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 10px 0 0 0;

    span {
      color: rgba(0, 0, 0, 0.5);
    }
  }

  p {
    margin: 0;
  }
  ul {
    margin: 0 0 10px 0;
    text-align: left;
  }

  button {
    margin: 6px;
  }

  img {
    width: 100%;
    max-width: 500px;
    margin: 15px 5px 5px 5px;

    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
`;
