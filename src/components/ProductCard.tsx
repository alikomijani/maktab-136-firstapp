import classNames from "./product-card.style.module.css";

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

  const imageSize = size === "medium" ? 150 : 75;
  const styleClass = size === "medium" ? classNames.medium : classNames.small;

  return (
    <div className={classNames["product-card"] + " " + styleClass}>
      <div className={classNames["product-card--body"]}>
        <div>
          <h2>{name}</h2>
          <p>{price}</p>
          {handleAdd && <button onClick={handleAdd}>Add to cart</button>}
          {handleRemove && (
            <button onClick={handleRemove}>remove from cart</button>
          )}
        </div>
        <img src={image} alt={name} width={imageSize} height={imageSize} />
      </div>
    </div>
  );
}
