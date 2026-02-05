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
