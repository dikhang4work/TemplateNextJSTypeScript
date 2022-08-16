import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";
const expireReducer = require("redux-persist-expire");
import commonSlice from "./reducer/common";
import userSlice from "./reducer/user";
import dataSlice from "./reducer/data";
import { logger } from "./middleware";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const userPersistConfig = {
  key: "user",
  storage:
    typeof window !== "undefined"
      ? createWebStorage("local")
      : createNoopStorage(),
  stateReconciler: hardSet,
};
const dataPersistConfig = {
  key: "data",
  storage:
    typeof window !== "undefined"
      ? createWebStorage("local")
      : createNoopStorage(),
  stateReconciler: hardSet,
  transforms: [
    //reset data after expire
    expireReducer("data", {
      expireSeconds: 1 * 60 * 60,
      expiredState: {
        stores: [],
        menu: [],
        carts: [],
        topping: null,
        //  menuClean: [],
      },
    }),
  ],
};
const persistConfig = {
  key: "root",
  storage:
    typeof window !== "undefined"
      ? createWebStorage("local")
      : createNoopStorage(),
  stateReconciler: hardSet,
  blacklist: ["common"],
};

const reducers = combineReducers({
  common: commonSlice,
  user: persistReducer<any>(userPersistConfig, userSlice),
  data: persistReducer<any>(dataPersistConfig, dataSlice),
});

const persistedReducer = persistReducer<any>(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend([logger]),
});

export const persistor = persistStore(store);
