import { createProduct, getProductById, getProducts } from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetProductList({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) {
  return useQuery({
    queryFn: () => getProducts({ search, category }),
    queryKey: ["products-list", category, search],
  });
}

export function useGetProductById(id: string | undefined) {
  return useQuery({
    queryFn: () => getProductById(id!),
    queryKey: ["products", id],
    enabled: !!id,
  });
}

export function useCreateProduct() {
  return useMutation({
    mutationFn: createProduct,
    mutationKey: ["create-product"],
  });
}
