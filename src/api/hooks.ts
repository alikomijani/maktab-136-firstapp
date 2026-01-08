import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getProducts, type Product } from "./api";

export function useGetProductList(search: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const controllerRef = useRef<AbortController>(null);

  const refreshProductList = useCallback(async () => {
    // cancel any in-flight request before starting a new one
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoading(true);
    try {
      const data = await getProducts(controller.signal);
      setProducts(data);
    } catch (err: any) {
      // Abort is expected; don't treat it as an error
      if (err?.name !== "AbortError") throw err; // or set an error state
    } finally {
      // only end loading if this request is still the latest one
      if (controllerRef.current === controller) setIsLoading(false);
    }
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

  useEffect(() => {
    refreshProductList();
    return () => controllerRef.current?.abort();
  }, [refreshProductList]);

  return {
    products,
    isLoading,
    refreshProductList,
    filteredProducts,
    totalSum,
  };
}
