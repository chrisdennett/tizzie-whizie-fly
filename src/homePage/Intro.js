import React from "react";
import styled from "styled-components";
import { CallToActionButton } from "../components/CallToActionButton";
import { TizzieLogo } from "../components/TizzieLogo";

const Intro = ({ onGetMaking }) => {
  return (
    <Content>
      <header>
        <TizzieLogo height={80} />
        <h1>Fly Tizzie Fly</h1>
        <StyledIntro>
          <h2>Paint your own game</h2>
          <p>
            This is an experimental art project where you get to paint your own
            game and then play it to generate the game you play.
          </p>
        </StyledIntro>
      </header>
      <ActionHolder>
        <CallToActionButton onClick={onGetMaking}>
          Get Making!
        </CallToActionButton>
      </ActionHolder>
      <VidHolder>
        <div>[TODO] Add Intro Vid here...</div>
      </VidHolder>
    </Content>
  );
};

export default Intro;

const ActionHolder = styled.div`
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VidHolder = styled.div`
  min-width: 250px;
  min-height: 150px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.8);
`;

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
