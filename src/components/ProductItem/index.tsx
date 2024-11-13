import React from "react";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/Products";
import * as styles from "./index.module.scss";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className={styles.productItem}>
      <img src={product.images} alt="" className={styles.wineImage} />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{product.display_name}</h2>
        <h3 className={styles.origin}>
          {product.vintage} {product.origin}
        </h3>
        <h4 className={styles.tag}>{product.tag_line}</h4>
        <p className={styles.msrp}>{product.display_msrp} Retail price</p>
        <p className={styles.price}>{product.display_price} Member price</p>
        <button className={styles.cartButton}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductItem;
