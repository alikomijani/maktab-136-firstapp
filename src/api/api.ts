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
  params: any,
  signal: AbortSignal,
): Promise<Array<Product>> {
  // {category: 'lunch' ,search:"برنج"}

  const searchParams = new URLSearchParams(params);

  const res = await fetch(
    `http://localhost:3000/products?${searchParams.toString()}`,
    { signal },
  );
  const data = await res.json();
  return data;
}

export async function getProductById(
  id: string | undefined,
  signal?: AbortSignal,
): Promise<Product> {
  if (!id) {
    throw new Error("id should provided");
  }
  const res = await fetch(`http://localhost:3000/products/${id}`, { signal });
  const data = await res.json();
  return data;
}
