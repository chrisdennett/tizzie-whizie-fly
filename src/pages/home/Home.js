import React from "react";
import styled from "styled-components";
import { CallToActionButton } from "../../components/CallToActionButton";
import { TizzieLogo } from "../../components/TizzieLogo";

export const Home = ({ onGetMaking }) => {
  return (
    <Content>
      <header>
        <TizzieLogo height={80} />
        <h1>Fly Tizzie Fly</h1>
        <StyledIntro>
          <h2>Paint your own game</h2>
          <p>
            An experimental art project where you get to paint and play your own
            online game.
          </p>
        </StyledIntro>
      </header>
      <ActionHolder>
        <CallToActionButton onClick={onGetMaking}>
          Get Making!
        </CallToActionButton>
      </ActionHolder>
      <SiteUnderContruction>
        <h2>
          <Emoji symbol="🚧" name="construction" /> SITE UNDER CONSTRUCTION{" "}
          <Emoji symbol="🚧" name="construction" />
        </h2>
        <p>
          The site should already work properly so feel free to have a play. I'd
          love to hear your feedback by{" "}
          <a
            href="mailto:chrisdennett@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            email (chrisdennett@gmail.com)
          </a>{" "}
          or through this{" "}
          <a
            href="https://forms.gle/tyMemgSL8qLbrbzA8"
            target="_blank"
            rel="noopener noreferrer"
          >
            quick feedback form
          </a>
          .
        </p>
        <p>
          Target completion date: <strong>14th December 2020</strong>
        </p>
        {/* <p>Still TODO:</p>
        <ul>
          <li>Test and fix bugs</li>
          <li>Finish all the game card content</li>
          <li>
            Finish "About" content including a link to a more detailed project
            blog post
          </li>
          <li>
            Ask local art students if they'd like to paint some example sheets
            and add them.
          </li>
          <li>Add intro video explaining what this is and how it works.</li>
        </ul> */}
      </SiteUnderContruction>
    </Content>
  );
};

const Emoji = ({ symbol, name }) => (
  <span role="img" aria-label={name}>
    {symbol}
  </span>
);

const SiteUnderContruction = styled.div`
  margin: 30px 0;
  padding: 20px;
  border-top: 5px dashed rgba(0, 0, 0, 0.5);
  border-bottom: 5px dashed rgba(0, 0, 0, 0.5);
  font-family: "Courier New", Courier, monospace;

  h2 {
    margin: 0;
    padding: 10px;
    background-color: #ffeb00;
    /* padding: 10px; */
    border: black 2px solid;
    text-align: center;
  }

  a {
    font-weight: bold;
  }
`;

const ActionHolder = styled.div`
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const VidHolder = styled.div`
//   min-width: 250px;
//   min-height: 150px;
//   border-radius: 5px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid rgba(0, 0, 0, 0.8);
// `;

const StyledIntro = styled.div`
  max-width: 600px;
  margin: 10px auto;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;

  header {
    padding: 20px 10px;
    text-align: center;

    h1 {
      font-size: 64px;
      margin: 0;
      font-family: "Cabin Sketch", cursive;
      line-height: 100%;
    }

    h2 {
      margin: 10px 0 0 0;
    }

    p {
      margin: 5px 0;
    }
  }

  @media (max-width: 430px) {
    header {
      padding: 10px 10px;

      h1 {
        font-size: 45px;
      }

      h2 {
        font-size: 18px;
        margin: 0;
      }

      p {
        font-size: 16px;
      }
    }
  }
`;
