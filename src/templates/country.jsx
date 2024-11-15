import React from "react";
import { graphql, Link } from "gatsby";
import * as styles from "./index.module.scss";

const Country = (props) => {
  const data = props.data.allCountries.nodes[0];

  return (
    <div className={styles.container}>
      <Link className={styles.backLink} to="/countries">
        Turn back
      </Link>
      <div className={styles.countryCard}>
        <img src={data.flags.png} loading="eager" />
        <h1>{data.name}</h1>
        <p>
          <b>{data.flag} Capital </b> <br /> <span>{data.capital}</span>
        </p>
        <p>
          <b>🌎 Region</b>
          <br /> <span>{data.region}</span>
        </p>
        <p>
          <b>🗣️ Language(s)</b>
          <br />
          {data.languages.map((lang) => (
            <span key={lang}>{lang}</span>
          ))}
        </p>
        <p>
          <b>🕒 Timezone(s) </b>
          <br />
          {data.timezones.map((time) => (
            <div key={time}>
              <span key={time}>{time}</span>
              <br />
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Country;

export const query = graphql`
  query ($slug: String!) {
    allCountries(filter: { cca3: { eq: $slug } }) {
      nodes {
        name
        capital
        languages
        timezones
        region
        flag
        flags {
          png
          alt
        }
      }
    }
  }
`;
