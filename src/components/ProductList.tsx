import { memo, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import Card from "./Card";
import { useGetProductList } from "../api/hooks";

function ProductList() {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log("render ProductList");
  const [search, setSearch] = useState("");
  const { isLoading, refreshProductList, filteredProducts, totalSum } =
    useGetProductList(search);

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
          <button onClick={refreshProductList}>refresh</button>
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
