import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

const rootReducers = combineReducers({
  cart: cartReducer,
});

export default rootReducers;
