import { memo, useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getProducts, type Product } from "../api/api";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import Card from "./Card";

function ProductList() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("render ProductList");
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let controller = new AbortController();
    const signal = controller.signal;

    getProducts(signal).then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
    return () => {
      controller.abort();
    };
  }, []);

  const { filteredProducts, totalSum } = useMemo(() => {
    const filteredProducts = products.filter((product) =>
      product.name.includes(search),
    );

    const totalSum = filteredProducts.reduce(
      (acc, product) => acc + product.price,
      0,
    );

    return {
      filteredProducts,
      totalSum,
    };
  }, [products, search]);

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between gap-4">
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="grow rounded-2xl border border-gray-300 px-2.5 py-3.5"
          />
          <button
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            focus
          </button>
        </div>

        {isLoading ? (
          <ProductCardSkeleton />
        ) : (
          filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              image={item.image}
              price={item.price}
              name={item.name}
              discount={item.discount}
              discountEndTime={item.discountEndTime}
              category={item.category}
              description={item.description}
            />
          ))
        )}
      </div>
      <div>جمع کل : {totalSum.toLocaleString("fa")}</div>
    </Card>
  );
}
export default memo(ProductList);
