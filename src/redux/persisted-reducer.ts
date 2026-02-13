import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducers from "./rootReducer";

const persistConfig = {
  key: "redux-store",
  storage,
  version: 2,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default persistedReducer;
