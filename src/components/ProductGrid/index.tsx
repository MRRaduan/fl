import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductItem from "../ProductItem";
import * as styles from "./index.module.scss";

const options = ["Red", "White", "All"];
const ProductGrid = () => {
  const { data, colorFilter } = useProducts();

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleOnSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    colorFilter(target?.value);
  };

  return (
    <div className={styles.listWrapper}>
      <label htmlFor="color">Filter by color</label>
      <select
        className={styles.selectFilter}
        name="color"
        id="color"
        onChange={handleOnSelect}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ul className={styles.productList}>
        {data?.map((product) => (
          <li key={product.id} className={styles.item}>
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductGrid;
