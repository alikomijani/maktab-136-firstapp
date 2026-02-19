import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../api/products/api";

interface CartState {
  items: { product: Product; count: number }[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clear: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    add: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.items.findIndex(
        (item) => item.product.id === product.id,
      );
      if (index == -1) {
        state.items.push({ product, count: 1 });
      } else {
        state.items[index].count += 1;
      }
      state.totalItems += 1;
      state.totalPrice += product.price;
    },
    decrease: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.items.findIndex(
        (item) => item.product.id === product.id,
      );
      if (index == -1) {
        throw new Error(
          `cant not decrease on product ${product.name} in cart because items doesn't exist is cart`,
        );
      }
      const p = state.items[index];

      if (p.count === 1) {
        state.items.splice(index, 1);
      } else {
        state.items[index].count -= 1;
      }
      state.totalItems -= 1;
      state.totalPrice -= p.product.price;
    },
    removeItem: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.items.findIndex(
        (item) => item.product.id === product.id,
      );
      if (index == -1) {
        throw new Error(
          `cant not remove product = ${product.name} in cart because items doesn't exist is cart`,
        );
      }
      const p = state.items[index];
      state.totalItems -= p.count;
      state.totalPrice -= p.product.price * p.count;
      state.items.splice(index, 1);
    },
  },
});

export const { add, clear, decrease, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
