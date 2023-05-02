import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TodoList from "./components/TodoList/TodoList";
import CreateTask from "./components/CreateTask/CreateTask";
import { FilterValue } from "./types/filter";
import styles from "./App.module.scss";

const App = () => {
  const [filterValue, setFilterValue] = useState<FilterValue>(FilterValue.ALL);

  return (
    <Provider store={store}>
      <div className={styles.container}>
        <h1 className={styles.title}>Todo Application</h1>
        <CreateTask setFilterValue={setFilterValue} />
        <TodoList filterValue={filterValue} setFilterValue={setFilterValue} />
      </div>
    </Provider>
  );
};

export default App;
