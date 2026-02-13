import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";

const rootReducers = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducers;
