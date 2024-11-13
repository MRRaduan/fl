import React from "react";
import ProductGrid from "../components/ProductGrid";
import Header from "../components/Header";

const Counter = (): JSX.Element => (
  <div style={{ backgroundColor: "#fbfaf9", paddingBottom: "40px" }}>
    <Header />
    <ProductGrid />
  </div>
);

export default Counter;
