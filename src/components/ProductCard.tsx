import { useEffect, useState } from "react";

export type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  discountEndTime?: string;
  size?: "small" | "medium";
  handleAdd?: () => void;
  handleRemove?: () => void;
};

export function ProductCard({ size = "medium", ...props }: ProductCardProps) {
  const {
    handleAdd,
    handleRemove,
    image,
    name,
    price,
    discount,
    discountEndTime,
  } = props;
  const imageSize = size === "medium" ? 120 : 75;

  const discountedPrice = discount ? price - discount * price : null;
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    let timer: undefined | number = undefined;
    if (discountEndTime) {
      timer = setInterval(() => {
        const remainingTime =
          new Date(discountEndTime).getTime() - new Date().getTime();
        setCounter(Math.floor(remainingTime / 1000));
        if (new Date(discountEndTime).getTime() < new Date().getTime()) {
          clearInterval(timer);
        }
      }, 1000);
      console.log(timer);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [discountEndTime]);

  return (
    <div className={"rounded-2xl border border-gray-300 p-2"}>
      <div className={"flex justify-between"}>
        <div>
          <h2>{name}</h2>
          <div>
            {discount && discountedPrice ? (
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
          {handleAdd && <button onClick={handleAdd}>Add to cart</button>}
          {handleRemove && (
            <button onClick={handleRemove}>remove from cart</button>
          )}
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
  );
}
