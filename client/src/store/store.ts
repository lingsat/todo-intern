import { useDispatch } from "react-redux";
import {
  AnyAction,
  combineReducers,
  applyMiddleware,
  createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk, { ThunkDispatch } from "redux-thunk";

import { ITodosState, todoReducer } from "@Store/reducers/todoReducer";
import { IUserState, userReducer } from "@Store/reducers/userReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ userReducer, todoReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export const todosSelector = (state: RootState) => state.todoReducer.todos;
export const userSelector = (state: RootState) => state.userReducer.user;

export const useStoreDispatch = () =>
  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
