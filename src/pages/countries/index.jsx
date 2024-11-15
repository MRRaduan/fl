import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import * as styles from "./index.module.scss";

const CountriesPage = (props) => {
  const countries = props.data.allCountries.nodes;

  const [filterInput, setFilterInput] = useState("");

  const handleOnSearch = (e) => {
    setFilterInput(e.target.value.toLowerCase());
  };

  return (
    <main className={styles.page}>
      <input
        type="text"
        placeholder="Search by country name"
        onChange={handleOnSearch}
      />
      <div className={styles.container}>
        {countries
          .filter(
            (country) =>
              country.name.toLowerCase().includes(filterInput) ||
              filterInput === ""
          )
          .map((country, i) => {
            return (
              <Link
                key={i}
                to={`/countries/${country.cca3}`}
                className={styles.country}
              >
                <p className={styles.countryName}>
                  {country.name} {country.flag}
                </p>
              </Link>
            );
          })}
      </div>
    </main>
  );
};

export default CountriesPage;

export const query = graphql`
  query CountriesQuery {
    allCountries(sort: { name: ASC }) {
      nodes {
        id
        cca3
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
