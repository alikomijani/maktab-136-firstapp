import type { Product } from "../api/api";

export enum CartActionType {
  ADD,
  REMOVE,
  DECREASE,
  CLEAR,
}
type CartAction =
  | {
      type: CartActionType.CLEAR;
      payload?: undefined;
    }
  | {
      type:
        | typeof CartActionType.ADD
        | typeof CartActionType.REMOVE
        | typeof CartActionType.DECREASE;
      payload: Product;
    };

export function cartReducer(
  state: { product: Product; count: number }[],
  action: CartAction,
) {
  const { type, payload } = action;
  if (type !== CartActionType.CLEAR && payload === undefined) {
    throw new Error(`cart reducer need payload on action ${type}`);
  }
  switch (type) {
    case CartActionType.CLEAR:
      return [];
    case CartActionType.ADD: {
      const index = state.findIndex((item) => item.product.id === payload.id);
      if (index === -1) {
        return [...state, { product: payload, count: 1 }];
      } else {
        return state.map((item) =>
          item.product.id === payload!.id
            ? { ...item, count: item.count + 1 }
            : item,
        );
      }
    }
    case CartActionType.DECREASE: {
      const item = state.find((item) => item.product.id === payload.id);
      if (item === undefined) {
        throw new Error("can not find product");
      }
      if (item.count > 2) {
        return state.map((item) =>
          item.product.id === payload!.id
            ? { ...item, count: item.count - 1 }
            : item,
        );
      }
      return state.filter((item) => item.product.id !== payload.id);
    }
    case CartActionType.REMOVE:
      return state.filter((item) => item.product.id !== payload.id);
    default:
      throw new Error(`you call a wrong action=${action} on cartReducer`);
  }
}
