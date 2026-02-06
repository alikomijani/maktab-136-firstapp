import { useState } from "react";
import { useGetProductList } from "../../../api/hooks";
import useCategoryParam from "../../../hooks/useCategoryParam";
import { useNavigate } from "react-router";

export default function AdminProductListPage() {
  const [category, setCategory] = useCategoryParam();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {
    data: products,
    refetch,
    isLoading,
  } = useGetProductList({ search, category });
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
          Products List
        </h1>
        <button onClick={() => navigate("/admin/products/create")}>
          Create Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                Expire At
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products?.length ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="transition hover:bg-gray-50"
                  onClick={() => navigate(`/admin/products/${product.id}`)}
                >
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">
                    {product.id}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {product.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    ${product.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {product.discount ? (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        {product.discount}%
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.discountEndTime
                      ? new Date(product.discountEndTime).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
