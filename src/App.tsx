import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TodoList from "./components/TodoList/TodoList";
import CreateTask from "./components/CreateTask/CreateTask";
import styles from "./App.module.scss";

const App = () => {
  return (
    <Provider store={store}>
      <h1 className={styles.title}>Todo Application</h1>
      <CreateTask />
      <TodoList />
    </Provider>
  );
};

export default App;