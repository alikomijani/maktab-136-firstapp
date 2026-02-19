import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createProduct, type Product } from "../../../../api/products/api";

export default function AdminProductCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    discount: 0,
    discountEndTime: "",
  });
  const queryClient = useQueryClient();
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  // optimistic update
  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    mutationKey: ["create-product"],
    async onMutate(newProduct, context) {
      await context.client.cancelQueries({ queryKey: ["product-list"] });
      const previousProduct = context.client.getQueryData(["product-list"]);
      context.client.setQueryData<Product[]>(
        ["product-list"],
        (oldProducts) => [...(oldProducts ?? []), { ...newProduct, id: 1.4 }],
      );
      return {
        previousProduct,
      };
    },
    onError(_error, _variables, onMutateResult) {
      queryClient.setQueryData(
        ["product-list"],
        () => onMutateResult?.previousProduct,
      );
    },
    onSettled() {
      // just do it
      queryClient.invalidateQueries({
        queryKey: ["products-list"],
      });
    },
    onSuccess() {
      navigate("/admin/products");
    },
  });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Create Product</h1>

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
