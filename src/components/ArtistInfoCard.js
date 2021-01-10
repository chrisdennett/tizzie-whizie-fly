import React from "react";
import styled from "styled-components";
import { artistImgDir } from "../artistData";
import ExternalLink from "./ExternalLink";

export const ArtistInfoCard = ({ artist }) => {
  return (
    <Card>
      <h3>
        <span>Artist:</span> {artist.name}
      </h3>

      {artist.thumbList.map((thumb) => (
        <img
          key={thumb}
          src={artistImgDir + thumb}
          alt={artist.label}
          style={{ margin: 3 }}
        />
      ))}

      {/* <img src={artistImgDir + artist.thumb} alt={artist.label} /> */}

      {artist.links && (
        <div>
          <p>See more from {artist.name} here:</p>
          <ul>
            {artist.links.map((link) => (
              <li key={link.url}>
                <ExternalLink href={link.url}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

const Card = styled.div`
  max-width: 450px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  padding: 20px;

  h3 {
    margin: 0 0 10px 0;

    span {
      color: rgba(0, 0, 0, 0.5);
    }
  }

  p {
    margin-bottom: 0 !important;
    padding: 0;
  }

  ul {
    margin: 0;

    li {
      padding: 5px;
    }
  }
`;
