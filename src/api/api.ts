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

export async function getProducts(
  signal: AbortSignal,
): Promise<Array<Product>> {
  const res = await fetch("http://localhost:3000/products", { signal });
  const data = await res.json();
  return data;
}
