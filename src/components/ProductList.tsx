import { memo, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { categories } from "../utils/category";
import useCategoryParam from "../hooks/useCategoryParam";
import { useGetProductList } from "../api/products/hooks";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
} from "@mui/material";

function ProductList() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useCategoryParam();
  const [search, setSearch] = useState("");
  const {
    data: products,
    refetch,
    isLoading,
  } = useGetProductList({ search, category });

  const totalSum = 2;
  return (
    <Card className="w-full" variant="outlined">
      <CardContent>
        <Stack gap={2}>
          <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
            <TextField
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              fullWidth
            />
            <Button onClick={() => refetch()}>refresh</Button>
          </Stack>
          <Stack direction={"row"} gap={1}>
            {categories.map((categoryItem) => (
              <Chip
                size="medium"
                color={category === categoryItem ? "primary" : "default"}
                variant={category === categoryItem ? "filled" : "outlined"}
                label={categoryItem}
                onClick={() => {
                  setCategory(categoryItem); // setSearchParams({ category:'ناهار' });
                }}
                key={categoryItem}
              />
            ))}
          </Stack>

          {isLoading ? (
            <ProductCardSkeleton />
          ) : (
            products?.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                image={item.image}
                price={item.price}
                name={item.name}
                discount={item.discount}
                discountEndTime={item.discountEndTime}
                category={item.category}
                description={item.description}
              />
            ))
          )}
        </Stack>
        <div>جمع کل : {totalSum.toLocaleString("fa")}</div>
      </CardContent>
    </Card>
  );
}
export default memo(ProductList);
