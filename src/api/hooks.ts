import { getProductById, getProducts } from "./api";
import { useQuery } from "@tanstack/react-query";

export function useGetProductList({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) {
  return useQuery({
    queryFn: () => getProducts({ search, category }),
    queryKey: ["products", category, search],
  });
}

export function useGetProductById(id: string | undefined) {
  return useQuery({
    queryFn: () => getProductById(id!),
    queryKey: ["products", id],
    enabled: !!id,
  });
}
