import { useState } from "react";
import type { Product } from "../App";
import { ProductCard } from "./ProductCard";

const productList = [
  { id: 1, name: "persian food", price: 100, image: "/image/food.jpeg" },
  { id: 2, name: "kabab", price: 150, image: "/image/food.jpeg" },
  { id: 3, name: "burger", price: 110, image: "/image/food.jpeg" },
];
type ProductListProps = {
  addToCart: (item: Product) => void;
};
export default function ProductList(props: ProductListProps) {
  const { addToCart } = props;
  const [search, setSearch] = useState("");
  return (
    <div
      style={{
        border: "1px solid var(--stroke-color)",
        width: "100%",
        borderRadius: "25px",
        padding: "15px",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          style={{
            border: "1px solid var(--stroke-color)",
            padding: "10px 15px",
            borderRadius: "25px",
            fontSize: 16,
          }}
        />
        {productList
          .filter((product) => product.name.includes(search))
          .map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              image={item.image}
              price={item.price}
              name={item.name}
              handleAdd={() => addToCart(item)}
            />
          ))}
      </div>
    </div>
  );
}
