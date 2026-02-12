import { useParams } from "react-router";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import useCountDown from "../hooks/useCountDown";
import { clsx } from "clsx";
import { CartActionType } from "../reducers/cartReducer";
import type { Product } from "../api/api";
import { http } from "../api/http";
import { useGetProductById } from "../api/hooks";

export async function getProductById(id: string) {
  return (await http.get<Product>(`/products/${id}`)).data;
}

export default function ProductPage() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductById(id);
  const { dispatchCartAction, cart } = useContext(CartContext);
  const itemInCart = cart.find((item) => item.product.id.toString() === id);
  const { counter } = useCountDown(product?.discountEndTime || "0");
  if (isLoading || !product) {
    return <div>در حال بارگزاری</div>;
  }
  if (error) {
    return <div>خطا در دریفات اطلاعات</div>;
  }
  const { image, name, price, discount } = product;
  const discountedPrice = discount ? price - discount * price : null;

  return (
    <div>
      <div className={clsx("flex justify-between")}>
        <div>
          <h2>{name}</h2>
          <div>
            {discount && discountedPrice && counter > 0 ? (
              <div>
                <div className="flex gap-1">
                  <del>{price.toLocaleString("fa")}</del>
                  <div className="rounded-2xl bg-red-700 px-1 py-0.5 text-white">
                    {(discount * 100).toLocaleString("fa")}%
                  </div>
                  {Math.ceil(counter / 3600)} ساعت
                  {Math.ceil((counter % 3600) / 60)} دقیقه
                  {Math.ceil((counter % (3600 * 60)) % 60)} ثانیه
                </div>
                <p>{discountedPrice.toLocaleString("fa")}</p>
              </div>
            ) : (
              <p>{price.toLocaleString("fa")}</p>
            )}
          </div>
          <div>
            {itemInCart ? (
              <div className="flex items-center gap-2">
                <button
                  className="rounded-lg border border-red-500 bg-white px-2 py-1 text-xl font-bold text-red-500"
                  onClick={() => {
                    dispatchCartAction({
                      type: CartActionType.ADD,
                      payload: product,
                    });
                  }}
                >
                  +
                </button>
                <p>{itemInCart.count}</p>
                <button
                  className="rounded-lg border border-red-500 bg-white px-2 py-1 text-xl font-bold text-red-500"
                  onClick={() => {
                    dispatchCartAction({
                      type: CartActionType.DECREASE,
                      payload: product,
                    });
                  }}
                >
                  -
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  dispatchCartAction({
                    type: CartActionType.ADD,
                    payload: product,
                  });
                }}
                className="rounded-lg bg-red-700 px-1.5 py-1 text-white"
              >
                افزودن به سبد خرید
              </button>
            )}
          </div>
        </div>
        <img
          className="rounded-2xl"
          src={image}
          alt={name}
          width={120}
          height={120}
        />
      </div>
    </div>
  );
}
