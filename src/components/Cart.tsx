import type { Product } from "../App";
import { ProductCard } from "./ProductCard";

type CartProps = {
  cartItems: { product: Product; count: number }[];
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
};

export default function Cart({
  cartItems,
  addToCart,
  removeFromCart,
}: CartProps) {
  return (
    <div
      style={{
        border: "1px solid var(--stroke-color)",
        width: "400px",
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
        {cartItems.length === 0 ? <h1>سبد خرید شما خالی است.</h1> : undefined}
        {cartItems.map(({ product, count }) => (
          <div key={product.id}>
            <ProductCard
              id={product.id}
              image={product.image}
              price={product.price}
              name={product.name}
              size="small"
              handleRemove={() => removeFromCart(product)}
              handleAdd={() => addToCart(product)}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>count: {count}</p>
              <p>price: {count * product.price}$</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
