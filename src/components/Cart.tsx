import { ProductCard } from "./ProductCard";
import Card from "./Card";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  console.log("cart render");
  const { cart } = useContext(CartContext);
  return (
    <Card className="max-w-2xs">
      <div className="flex flex-col gap-2.5">
        {cart.length === 0 ? <h1>سبد خرید شما خالی است.</h1> : undefined}
        {cart.map(({ product, count }) => (
          <div key={product.id}>
            <ProductCard
              id={product.id}
              image={product.image}
              price={product.price}
              name={product.name}
              size="small"
              category={product.category}
              description={product.description}
              discount={product.discount}
              discountEndTime={product.discountEndTime}
            />
            <div className="flex justify-between">
              <p>count: {count}</p>
              <p>price: {count * product.price}$</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
