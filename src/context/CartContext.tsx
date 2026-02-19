import {
  createContext,
  useReducer,
  type ActionDispatch,
  type ReactNode,
} from "react";
import { cartReducer, type CartAction } from "../reducers/cartReducer";
import type { Product } from "../api/products/api";

type Cart = {
  product: Product;
  count: number;
}[];
export type CartDispatch = ActionDispatch<[action: CartAction]>;

export const CartContext = createContext<{
  cart: Cart;
  dispatchCartAction: CartDispatch;
}>({
  cart: [],
  dispatchCartAction: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider
      value={{
        cart,
        dispatchCartAction: dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
