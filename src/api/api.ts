import type { ProductPayload } from "../validations/product.validation";
import { http } from "./http";
export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  discount?: number;
  discountEndTime?: string;
};

export async function getProducts(params: any) {
  return (
    await http.get<Array<Product>>("/products", {
      params,
    })
  ).data;
}

export async function getProductById(id: string) {
  return (await http.get<Product>(`/products/${id}`)).data;
}

export async function createProduct(payload: ProductPayload) {
  return (await http.post<Product>(`/products/`, payload)).data;
}

export async function updateProduct(payload: ProductPayload & { id: string }) {
  return (await http.put<Product>(`/products/${payload.id}`, payload)).data;
}

export async function deleteProduct(id: string) {
  return (await http.delete(`/products/${id}`)).data;
}
