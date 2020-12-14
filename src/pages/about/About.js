import React from "react";
import styled from "styled-components";
import { CallToActionButton } from "../../components/CallToActionButton";
import { Emoji } from "../../components/Emoji";
import ExternalLink from "../../components/ExternalLink";

const About = () => {
  return (
    <Content>
      <CenteredSection>
        <img
          width={420}
          height={300}
          src="./img/tizzie-whizie-postcard_420x300.jpg"
          alt={"Tizzie Whizie Postcard"}
        />
      </CenteredSection>

      <section>
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
          In the game you play a{" "}
          <ExternalLink href="https://www.rabbies.com/en/blog/tizzie-whizie-legend-lake-district">
            Tizzie Whizie
          </ExternalLink>{" "}
          skimming over Windermere dodging boats, islands and legends to collect
          as many stories as you can.
        </p>
        <p>
          I trying to introduce the boats and stories of Windermere in a way
          that’s more palatable for those who’ll play on their phone rather than
          read the information boards in the museum.
        </p>
        <p>
          I'm primarily aiming the game at families and kids. Hopefully shifting
          people a little from the trance-like consumption of mobile games to
          more of an experimental and creative experinece.
        </p>
        <p>
          I'm particularly excited to experiment with ways of allowing people to
          use quick art made in the real world art to simply generate cool
          digital doodahs!
        </p>

        <p>
          I've written more about{" "}
          <ExternalLink href={"https://artfly.io/fly-tizzie-fly"}>
            how it works here
          </ExternalLink>
          .{" "}
        </p>
      </section>

      <section>
        <h2>
          <Emoji symbol="🧪" name="test-tube" /> It's all a bit experimental!{" "}
          <Emoji symbol="🧪" name="test-tube" />
        </h2>
        <p>
          Everything should work, but there might be some exciting bugs!{" "}
          <Emoji symbol="🐞" name="bug" />
        </p>
        <p>
          If you're up for it, I'd love to hear your feedback through a{" "}
          <CallToActionButton
            href="https://forms.gle/tyMemgSL8qLbrbzA8"
            style={{ padding: "2px 10px", textTransform: "uppercase" }}
          >
            quick feedback form
          </CallToActionButton>
          . Or by email at{" "}
          <a
            href="mailto:chrisdennett@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            chrisdennett@gmail.com
          </a>{" "}
          if you'd rather.
        </p>
      </section>
      <SignOff>
        <p>Toodle pip</p>
        <p>
          Chris <Emoji symbol={"😊"} name="smiley face" />
        </p>
      </SignOff>
    </Content>
  );
};

export default About;

const CenteredSection = styled.div`
  padding: 20px 0;
  text-align: center;
  max-width: 420px;
  margin: 0 auto;

  img {
    width: 100%;
  }
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;

  h1 {
    margin-top: 0;
  }

  h2 {
    margin-top: 40px;
  }

  li {
    padding-bottom: 15px;
  }

  p {
    margin: 20px 0;
  }

  img {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
`;

const SignOff = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  border-top: 1px solid;
  padding-top: 20px;

  p {
    margin: 0;
    padding: 0;
  }
`;
