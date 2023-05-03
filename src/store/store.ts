import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { todoReducer } from "./reducers/todoReducer";

const persistConfig = {
  key: "todos",
  storage,
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
