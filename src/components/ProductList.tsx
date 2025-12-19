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
  return (
    <div
      style={{
        border: "1px solid var(--stroke-color)",
        width: "100%",
        borderRadius: "25px",
        padding: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h2>ali</h2>
        {productList.map((item) => (
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
