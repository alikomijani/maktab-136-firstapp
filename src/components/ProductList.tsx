import { memo, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import Card from "./Card";
import { categories } from "../utils/category";
import useCategoryParam from "../hooks/useCategoryParam";
import { useGetProductList } from "../api/products/hooks";

function ProductList() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useCategoryParam();
  const [search, setSearch] = useState("");
  const {
    data: products,
    refetch,
    isLoading,
  } = useGetProductList({ search, category });

  const totalSum = 2;
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
          <button onClick={() => refetch()}>refresh</button>
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              className="rounded-2xl border px-8 py-2"
              onClick={() => {
                setCategory(category); // setSearchParams({ category:'ناهار' });
              }}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <ProductCardSkeleton />
        ) : (
          products?.map((item) => (
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
