import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getProducts, type Product } from "../api/api";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

type ProductListProps = {
  addToCart: (item: Product) => void;
};
export default function ProductList(props: ProductListProps) {
  const [products, setProducts] = useState<Array<Product>>([]);

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
  // without extra rerender but has expensive calculation on every rerender
  // const filteredProducts = products.filter((product) =>
  //   product.name.includes(search)
  // );
  // one extra rerender
  // const [filteredProducts, setFilteredProducts] = useState<Array<Product>>([]);
  // useEffect(() => {
  //   setFilteredProducts(
  //     products.filter((product) => product.name.includes(search))
  //   );
  // }, [products, search]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.name.includes(search));
  }, [products, search]);

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
