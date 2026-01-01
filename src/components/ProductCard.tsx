export type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  size?: "small" | "medium";
  handleAdd?: () => void;
  handleRemove?: () => void;
};

export function ProductCard({ size = "medium", ...props }: ProductCardProps) {
  const { handleAdd, handleRemove, image, name, price } = props;

  const imageSize = size === "medium" ? 120 : 75;
  const styleClass = size === "medium";

  return (
    <div className={"rounded-2xl border border-gray-300 p-2"}>
      <div className={"flex justify-between"}>
        <div>
          <h2>{name}</h2>
          <p>{price.toLocaleString("fa")}</p>
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
