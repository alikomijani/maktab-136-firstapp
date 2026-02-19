import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useCountDown from "../hooks/useCountDown";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { add, decrease } from "../redux/slices/cartSlice";
import type { Product } from "../api/products/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
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
  const { counter } = useCountDown(discountEndTime);
  const itemInCart = useAppSelector((store) =>
    store.cart.items.find((item) => item.product.id == id),
  );
  const dispatch = useAppDispatch();
  const imageSize = size === "medium" ? 140 : 200;
  const discountedPrice = discount ? price - discount * price : null;

  return (
    <Link to={`/product/${id}`}>
      <Card
        sx={{
          display: "flex",
          flexDirection: size === "small" ? "column-reverse" : "row",
        }}
      >
        <CardContent
          sx={{
            flex: "1 0 auto",
          }}
        >
          <Typography variant="body1">{name}</Typography>
          <Box>
            {discount && discountedPrice && counter > 0 ? (
              <Box>
                <Box display={"flex"} gap={1}>
                  <Typography
                    sx={{
                      textDecoration: "line-through",
                    }}
                  >
                    {price.toLocaleString("fa")}
                  </Typography>
                  <Chip
                    label={`${(discount * 100).toLocaleString("fa")}%`}
                    color="error"
                  />
                  {Math.ceil(counter / 3600)} ساعت
                  {Math.ceil((counter % 3600) / 60)} دقیقه
                  {Math.ceil((counter % (3600 * 60)) % 60)} ثانیه
                </Box>
                <Typography variant="body1">
                  {discountedPrice.toLocaleString("fa")}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body1">
                {price.toLocaleString("fa")}
              </Typography>
            )}
          </Box>
          <Box marginTop={size === "medium" ? 2 : 0}>
            {itemInCart ? (
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="primary"
                  onClickCapture={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(add(props));
                  }}
                >
                  <AddIcon />
                </IconButton>
                <Typography variant="body2">{itemInCart.count}</Typography>
                <IconButton
                  color="error"
                  onClickCapture={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(decrease(props));
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
            ) : (
              <Button
                color="error"
                variant="contained"
                onClickCapture={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(add(props));
                }}
              >
                افزودن به سبد خرید
              </Button>
            )}
          </Box>
        </CardContent>

        <CardMedia
          component="img"
          sx={{ width: imageSize, height: 140 }}
          image={image}
          alt={name}
        />
      </Card>
    </Link>
  );
}
