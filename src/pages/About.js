import React from "react";
import ExternalLink from "../components/ExternalLink";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <ul>
        <li>
          Made as part{" "}
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
      <p>Add more information about the project here...</p>
    </div>
  );
};

export default About;
