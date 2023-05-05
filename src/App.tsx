import React, { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import TodoList from "./components/TodoList/TodoList";
import CreateTask from "./components/CreateTask/CreateTask";
import { FilterValue, IFilter } from "./types/filter";
import styles from "./App.module.scss";

const App = () => {
  const [filter, setFilter] = useState<IFilter>({
    filterValue: FilterValue.ALL,
    searchValue: "",
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={styles.container}>
          <h1 className={styles.title}>Todo Application</h1>
          <CreateTask setFilter={setFilter} />
          <TodoList filter={filter} setFilter={setFilter} />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
