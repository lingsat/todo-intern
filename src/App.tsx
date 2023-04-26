import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TodoList from "./components/TodoList/TodoList";
import styles from "./App.module.scss";
import CreateTodo from "./components/CreateTodo/CreateTodo";

const App = () => {
  return (
    <Provider store={store}>
      <h1 className={styles.title}>Todo Application</h1>
      <CreateTodo />
      <TodoList />
    </Provider>
  );
};

export default App;
