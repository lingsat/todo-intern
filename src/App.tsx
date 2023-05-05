import React, { createContext, useLayoutEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import TodoList from "./components/TodoList/TodoList";
import CreateTask from "./components/CreateTask/CreateTask";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import { FilterValue, IFilter } from "./types/filter";
import { IContext } from "./types/theme.interface";
import styles from "./App.module.scss";

export const ThemeContext = createContext<IContext>(undefined!);

const App = () => {
  const [lightMode, setLightMode] = useState<boolean>(true);
  const [filter, setFilter] = useState<IFilter>({
    filterValue: FilterValue.ALL,
    searchValue: "",
  });

  useLayoutEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setLightMode(false);
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeContext.Provider value={{ lightMode, setLightMode }}>
          <div className={`${styles.app} ${!lightMode && styles.dark}`}>
            <div className={styles.container}>
              <header className={styles.header}>
                <h1 className={styles.title}>Todo Application</h1>
                <ThemeSwitcher />
              </header>
              <CreateTask setFilter={setFilter} />
              <TodoList filter={filter} setFilter={setFilter} />
            </div>
          </div>
        </ThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
};

export default App;
