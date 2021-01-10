import React, { useState } from "react";
import styled from "styled-components";
import { CallToActionButton } from "../../components/CallToActionButton";
import { Boop } from "../../components/Boop";
import { SampleArtworkModal } from "../../components/SampleArtworkModal";
import { artistImgDir } from "../../artistData";

export const SampleCard = ({ onSelect, artist }) => {
  const [isShowing, setIsShowing] = useState(false);

  const onShowInfo = () => {
    setIsShowing(true);
  };

  const onArtistInfoClose = () => {
    setIsShowing(false);
  };

  const onArtistSelect = () => {
    onSelect(artistImgDir + artist.img);
    setIsShowing(false);
  };

  return (
    <>
      <SampleArtworkModal
        artist={artist}
        isShowing={isShowing}
        onClose={onArtistInfoClose}
        onSelect={onArtistSelect}
      />
      <Boop>
        <Card onClick={onShowInfo}>
          <img
            src={artistImgDir + artist.thumb}
            alt={artist.label}
            onClick={onShowInfo}
          />
          <LabelHolder>
            <h3>{artist.label}</h3>
            <p>by {artist.name}</p>
            <CallToActionButton>PICK ME!</CallToActionButton>
          </LabelHolder>
        </Card>
      </Boop>
    </>
  );
};

const Card = styled.div`
  max-width: 250px;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  background-color: white;
  /* max-width: 170px; */
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 1);
  margin: 7px;

  img {
    cursor: pointer;
    max-width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 1);
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const LabelHolder = styled.div`
  padding: 15px;
  display: inline-flex;
  flex-direction: column;
  h3 {
    margin: 0;
  }
  p {
    margin: 0 0 10px 0;
  }
  button {
    align-self: flex-end;
  }
`;

export const SampleCards = ({ children }) => <Holder>{children}</Holder>;

const Holder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.4);
  background: url("./img/bg/redox_01-min.png");
  border-bottom: 2px solid;
  align-items: center;
`;
