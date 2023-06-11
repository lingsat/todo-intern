import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { ITodosState, todoReducer } from "@Store/reducers/todoReducer";
import { IUserState, userReducer } from "@Store/reducers/userReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ userReducer, todoReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export type RootState = { todos: ITodosState; user: IUserState };

export const todosSelector = (state: RootState) => state.todos.todos;
export const userSelector = (state: RootState) => state.user.user;
