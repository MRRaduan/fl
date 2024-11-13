import React from "react";
import Countdown from "../components/Countdown";
import ProductGrid from "../components/ProductGrid";

const pageStyles = {
    color: "#232129",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
    marginTop: 0,
    marginBottom: 32,
    maxWidth: 320,
}

const HomePage = (): JSX.Element => (
    <main style={pageStyles}>
        <h1 style={headingStyles}>Choose a challenge:</h1>
        <ul>
            <li>
                <a href="/countries">Countries</a>
            </li>
            <li>
                <a href="/bucket">Bucket</a>
            </li>
            <li>
                <a href="/promo">Promo</a>
            </li>
        </ul>
    </main>
);

export default HomePage;
