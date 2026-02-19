import { ProductCard } from "./ProductCard";
import Card from "./Card";
import { useAppSelector } from "../redux/hooks";
export default function Cart() {
  const cart = useAppSelector((store) => store.cart);
  const { items, totalItems, totalPrice } = cart;
  return (
    <Card className="max-w-2xs">
      <div className="flex flex-col gap-2.5">
        {totalItems === 0 ? <h1>سبد خرید شما خالی است.</h1> : undefined}
        {items.map(({ product, count }) => (
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
      <hr />
      <p>total items: {totalItems} </p>
      <p>total price: {totalPrice} </p>
    </Card>
  );
}
