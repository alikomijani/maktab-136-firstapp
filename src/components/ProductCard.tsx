import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartActionType } from "../reducers/cartReducer";
import type { Product } from "../api/api";
import clsx from "clsx";
import useCountDown from "../hooks/useCountDown";
import { Link } from "react-router";

export type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  discountEndTime?: string;
  size?: "small" | "medium";
  category: Product["category"];
  description: Product["description"];
};

export function ProductCard({ size = "medium", ...props }: ProductCardProps) {
  const { image, name, price, discount, discountEndTime, id } = props;
  const { dispatchCartAction, cart } = useContext(CartContext);
  const { counter } = useCountDown(discountEndTime);
  const itemInCart = cart.find((item) => item.product.id === id);
  const imageSize = size === "medium" ? 140 : "auto";
  const discountedPrice = discount ? price - discount * price : null;

  return (
    <Link to={`/product/${id}`}>
      <div className={"rounded-2xl border border-gray-300 p-2"}>
        <div
          className={clsx(
            "flex justify-between",
            size === "medium" ? "flex-row" : "flex-col-reverse items-stretch",
          )}
        >
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
                        payload: props,
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
                        payload: props,
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
                      payload: props,
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
            width={imageSize}
            height={imageSize}
          />
        </div>
      </div>
    </Link>
  );
}
