import React from "react";
import styled from "styled-components";
import { artistData } from "../../artistData";
import { ArtistInfoCard } from "../../components/ArtistInfoCard";
import { Emoji } from "../../components/Emoji";
import ExternalLink from "../../components/ExternalLink";

const About = () => {
  let mergedArtistList = [];
  for (let artist of artistData) {
    const currObj = mergedArtistList.find((a) => artist.name === a.name);

    if (!currObj) {
      mergedArtistList.push({ ...artist, thumbList: [artist.thumb] });
    } else {
      currObj.thumbList.push(artist.thumb);
    }
  }

  const artistNames = mergedArtistList.map((artist, index) => {
    let txt = artist.name;
    if (index === mergedArtistList.length - 2) {
      txt += " and ";
    } else if (index < mergedArtistList.length - 2) {
      txt += ", ";
    }

    return txt;
  });

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
            By Artist{" "}
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
          skimming over Windermere, dodging boats, islands and legends to
          collect as many stories as you can.
        </p>
        <p>
          The idea is to introduce the boats and stories of Windermere in an
          entertaining way with familes and kids in mind, providing an
          opportunity for creative and experimental fun. Making a game rather
          than simply consuming one.
        </p>
        <p>
          I love experimenting with ways that allow people to use quick art made
          in the real world to simply generate cool digital doodahs!
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
          <Emoji symbol="🙏" name="thank-you" /> Thank you to the artists who
          contributed work
        </h2>
        <p>
          Thank you to the artists <strong>{artistNames}</strong>. And to Mr
          Hardy and Mrs Charlesworth from{" "}
          <ExternalLink href="https://thelakesschool.com/the-lakes-school-cumbria/">
            The Lakes School
          </ExternalLink>
          . And lastly thank you to my lovely wife Jennie who created the
          initial test sheets and to my children for the endless testing.
        </p>
        {mergedArtistList.map((artist) => (
          <ArtistInfoCard key={artist.img} artist={artist} />
        ))}
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
          <ExternalLink href="https://forms.gle/tyMemgSL8qLbrbzA8">
            quick feedback form
          </ExternalLink>{" "}
          or by email at{" "}
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
    height: auto;
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
