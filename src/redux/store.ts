import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import persistedReducer from "./persisted-reducer";
const isDev = import.meta.env.DEV;

const logger = createLogger({
  diff: true,
  duration: true,
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    let defaultMiddlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
    if (isDev) {
      return defaultMiddlewares.concat(logger);
    }
    return defaultMiddlewares;
  },
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
