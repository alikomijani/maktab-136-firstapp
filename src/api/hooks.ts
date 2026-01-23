import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getProductById, getProducts, type Product } from "./api";

export function useGetProductList(params: {
  search?: string;
  category?: string;
}) {
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
      const data = await getProducts(params, controller.signal);
      setProducts(data);
    } catch (err: any) {
      // Abort is expected; don't treat it as an error
      if (err?.name !== "AbortError") throw err; // or set an error state
    } finally {
      // only end loading if this request is still the latest one
      if (controllerRef.current === controller) setIsLoading(false);
    }
  }, [params.category, params.search]);

  const { filteredProducts, totalSum } = useMemo(() => {
    const filteredProducts = products.filter((product) =>
      product.name.includes(params.search || ""),
    );

    const totalSum = filteredProducts.reduce(
      (acc, product) => acc + product.price,
      0,
    );

    return {
      filteredProducts,
      totalSum,
    };
  }, [products, params.search]);

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

export function useGetProductById(id: string | undefined) {
  const [product, setState] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    setError("");
    getProductById(id)
      .then((data) => {
        setState(data);
      })
      .catch((e) => {
        setError("error on get product");
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);
  return {
    product,
    isLoading,
    error,
  };
}
