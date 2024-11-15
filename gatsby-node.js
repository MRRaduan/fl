const path = require("path");
const crypto = require("crypto");

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  // Load countries
  let res;
  try {
    res = await fetch("https://restcountries.com/v3.1/all");
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    res = await res.json();
  } catch (error) {
    console.error(error.message);
  }

  // Map the countries return to the GraphQL schema format
  res.map((country, i) => {
    const countryNode = {
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Countries`,
      },
      children: [],
      cca3: country.cca3,
      name: country.name.common,
      languages: Object.values(country.languages),
      flag: country.flag,
      timezones: country.timezones,
      flags: country.flags,
      capital: country.capital,
      region: country.region,
      currencies: country.currencies,
    };

    // Prepare and populate for GraphQL queries
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(countryNode))
      .digest(`hex`);
    countryNode.internal.contentDigest = contentDigest;
    createNode(countryNode);
  });

  return;
};

// Create each country page
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Search already using graphql only the cca3 as slug for each country page
  const result = await graphql(
    `
      {
        allCountries {
          edges {
            node {
              cca3
            }
          }
        }
      }
    `
  );

  // Handle errors in case not working
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create pages for each country, maching with the proper template
  const countryTemplate = path.resolve(`src/templates/country.jsx`);
  result.data.allCountries.edges.forEach(({ node }) => {
    const path = node.cca3; // Using the cca3 as slug
    createPage({
      path: `/countries/${path}`,
      component: countryTemplate,
      context: {
        slug: path,
      },
    });
  });
};
