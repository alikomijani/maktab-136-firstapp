import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useGetProductById } from "../../../../api/products/hooks";
import { updateProduct } from "../../../../api/products/api";

export default function AdminProductSingle() {
  const { id } = useParams();
  const { data: product } = useGetProductById(id);
  const { mutate, isPending } = useMutation({
    mutationFn: updateProduct,
    mutationKey: ["update-product"],

    onSettled(data, _error, _variables, _onMutateResult, context) {
      context.client.invalidateQueries({
        queryKey: ["products", data?.id.toString()],
      });
    },
  });
  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    discount: 0,
    discountEndTime: "",
  });

  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name || "",
      price: Number(product.price ?? ""),
      category: product.category || "",
      description: product.description || "",
      image: product.image || "",
      discount: product.discount ? Number(product.discount) : 0,
      discountEndTime: product.discountEndTime
        ? product.discountEndTime.slice(0, 16)
        : "",
    });
  }, [product]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      mutate({ ...form, id: id });
    }
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Edit Product</h1>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-lg border bg-white p-6"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={onChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={onChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={onChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={form.discount}
            onChange={onChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Discount Expire At
          </label>
          <input
            type="datetime-local"
            name="discountEndTime"
            value={form.discountEndTime}
            onChange={onChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
}
