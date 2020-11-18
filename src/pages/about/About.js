import React from "react";
import styled from "styled-components";
import ExternalLink from "../../components/ExternalLink";

const About = () => {
  return (
    <Content>
      {/* <h1>About</h1> */}
      <ul>
        <li>
          Made as part of{" "}
          <ExternalLink href="https://signalfilmandmedia.com/source/">
            SOURCE
          </ExternalLink>{" "}
          — the Cumbrian Artist Digital Development Lab from{" "}
          <ExternalLink href="https://signalfilmandmedia.com/">
            Signal Film & Media
          </ExternalLink>
        </li>
        <li>
          By Artist:{" "}
          <ExternalLink href="https://artfly.io/chris-dennett/">
            Chris Dennett
          </ExternalLink>{" "}
        </li>
        <li>
          For the{" "}
          <ExternalLink
            href={"https://lakelandarts.org.uk/windermere-jetty-museum/"}
          >
            Windermere Jetty Museum
          </ExternalLink>
        </li>
      </ul>
      <p>
        I've written more about{" "}
        <ExternalLink href={"https://artfly.io/fly-tizzie-fly"}>
          how it works here
        </ExternalLink>
        .{" "}
      </p>

      <CenteredSection>
        <img
          src="./img/tizzie-whizie-postcard_600x429.jpg"
          alt={"Tizzie Whizie Postcard"}
        />
      </CenteredSection>
    </Content>
  );
};

export default About;

const CenteredSection = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;

  h1 {
    margin-top: 0;
  }

  li {
    padding-bottom: 15px;
  }

  img {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
`;
