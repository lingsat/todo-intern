import React, { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import TodoList from "./components/TodoList/TodoList";
import CreateTask from "./components/CreateTask/CreateTask";
import { FilterValue } from "./types/filter";
import styles from "./App.module.scss";

const App = () => {
  const [filterValue, setFilterValue] = useState<FilterValue>(FilterValue.ALL);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={styles.container}>
          <h1 className={styles.title}>Todo Application</h1>
          <CreateTask
            setFilterValue={setFilterValue}
            setSearchValue={setSearchValue}
          />
          <TodoList
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
