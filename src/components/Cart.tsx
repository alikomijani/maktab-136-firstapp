import { ProductCard } from "./ProductCard";
import { useAppSelector } from "../redux/hooks";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
export default function Cart() {
  const cart = useAppSelector((store) => store.cart);
  const { items, totalItems, totalPrice } = cart;
  return (
    <Card sx={{ width: 400 }} variant="outlined">
      <CardContent>
        <Stack gap={2}>
          {totalItems === 0 ? <h1>سبد خرید شما خالی است.</h1> : undefined}
          {items.map(({ product, count }) => (
            <Box key={product.id}>
              <ProductCard
                id={product.id}
                image={product.image}
                price={product.price}
                name={product.name}
                size="small"
                category={product.category}
                description={product.description}
                discount={product.discount}
                discountEndTime={product.discountEndTime}
              />
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography>count: {count}</Typography>
                <Typography>price: {count * product.price}$</Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
        <Divider
          sx={{
            mt: 2,
          }}
        />
        <Typography>total items: {totalItems} </Typography>
        <Typography>total price: {totalPrice} </Typography>
      </CardContent>
    </Card>
  );
}
