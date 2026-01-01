import { useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getProducts, type Product } from "../api/api";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

type ProductListProps = {
  addToCart: (item: Product) => void;
};
export default function ProductList(props: ProductListProps) {
  const [products, setProducts] = useState<Array<Product>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = props;
  const [search, setSearch] = useState("");

  useEffect(() => {
    // component did mount
    getProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
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
    <div className="w-full rounded-2xl border border-gray-300 p-4">
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
              handleAdd={() => addToCart(item)}
            />
          ))
        )}
      </div>
      <div>جمع کل : {totalSum.toLocaleString("fa")}</div>
    </div>
  );
}

// let olddep = [];
// let value = null;
// function useMemo(callback: () => any, dependency: any[]) {
//   for (let i = 0; i < dependency.length; i++)
//     if (!Object.is(dependency[i], olddep[i])) {
//       value = callback();
//       olddep = dependency;
//       break;
//     }

//   return value;
// }
