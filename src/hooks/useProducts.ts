import { useQuery } from "react-query";
import { Product } from "../types/Products";
import { useState } from "react";

const COLORS = {
  RED: "Red",
  WHITE: "White",
  ALL: "All",
};

export function useProducts() {
  const [colorFilter, setColorFilter] = useState(COLORS.ALL);
  const filterByColor = (data: Product[]) => {
    if (colorFilter === COLORS.ALL) return data;
    return data.filter((item) => item.color === colorFilter);
  };
  const { data, isLoading } = useQuery(
    "products",
    async () => {
      const products = (await fetch(
        "https://my-json-server.typicode.com/YofretRios/jsondetails/products"
      ).then((res) => res.json())) as Array<Product>;

      window.localStorage.setItem("products", JSON.stringify(products));

      return products;
    },
    { initialData: [], select: filterByColor }
  );

  return { data, isLoading, colorFilter: setColorFilter };
}

export default { useProducts };
