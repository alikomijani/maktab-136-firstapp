import type { Product } from "../api/api";
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
    <div className="max-w-2xs rounded-2xl border border-gray-300 p-3">
      <div className="flex flex-col gap-2.5">
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
            <div className="flex justify-between">
              <p>count: {count}</p>
              <p>price: {count * product.price}$</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
