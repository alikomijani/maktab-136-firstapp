export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export async function getProducts(): Promise<Array<Product>> {
  const res = await fetch("http://localhost:3000/products");
  const data = await res.json();
  return data;
}
