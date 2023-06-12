import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { LOCAL_STORAGE_THEME } from "@/constants";
import CreateTask from "@Components/CreateTask/CreateTask";
import Theme from "@Components/Theme/Theme";
import TodoList from "@Components/TodoList/TodoList";
import { store, persistor } from "@Store/store";
import { FilterValue, IFilter } from "@Types/filter";
import { IContext } from "@Types/theme";

import styles from "./App.module.scss";

export const ThemeContext = createContext<IContext>(undefined!);

const App = () => {
  const [lightMode, setLightMode] = useState<boolean>(true);
  const [filter, setFilter] = useState<IFilter>({
    filterValue: FilterValue.ALL,
    searchValue: "",
  });

  const getBrowserTheme = () => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setLightMode(false);
    }
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME, JSON.stringify(lightMode));
  }, [lightMode]);

  useLayoutEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_THEME);
    if (theme) {
      setLightMode(JSON.parse(theme));
    } else {
      getBrowserTheme();
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
                <Theme />
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
