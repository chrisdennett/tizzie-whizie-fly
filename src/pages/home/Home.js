import React from "react";
import ReactPlayer from "react-player/youtube";

import styled from "styled-components";
import { BubbleButton } from "../../components/bubbleButton/BubbleButton";
import { Emoji } from "../../components/Emoji";
import { TizzieLogo } from "../../components/TizzieLogo";

export const Home = ({ onGetMaking }) => {
  return (
    <>
      <Content>
        <header>
          <TizzieLogo height={80} />
          <h1>Fly Tizzie Fly</h1>
          <StyledIntro>
            <h2>Paint your own game</h2>
            <p>
              An experimental art project where you get to paint and play your
              own online game.
            </p>
          </StyledIntro>
        </header>
        <ActionHolder>
          <BubbleButton onClick={onGetMaking}>GET MAKING!</BubbleButton>
          {/* <CallToActionButton onClick={onGetMaking}>
          Get Making!
        </CallToActionButton> */}
        </ActionHolder>

        <section>
          <h2>How it works</h2>
          <p>
            Print and paint a template, take a photo, press Generate and BAM!!!
            You're playing your own painted game.{" "}
            <Emoji symbol="😄" name="smile" />
            <Emoji symbol="🕹️" name="joystick" />
          </p>
          <VidWrapper>
            <StyledReactPlayer
              config={{
                youtube: {
                  playerVars: { controls: true },
                },
              }}
              url={"https://youtu.be/Ov6FIntydEc"}
              width="100%"
              height="100%"
            />
          </VidWrapper>
        </section>
      </Content>
    </>
  );
};

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const VidWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
`;

// const SiteUnderContruction = styled.div`
//   margin: 30px 0;
//   background-color: black;
//   padding: 20px;
//   color: white;

//   h2 {
//     margin: 0;
//     padding: 10px;
//     /* padding: 10px; */
//     border: black 2px solid;
//     text-align: center;
//   }

//   a {
//     font-weight: bold;
//   }
// `;

const ActionHolder = styled.div`
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIntro = styled.div`
  max-width: 600px;
  margin: 10px auto;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto 60px auto;

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

  section {
    border-top: 1px solid rgba(0, 0, 0, 0.8);
    margin-top: 40px;
    padding-top: 10px;
    /* text-align: center; */
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
