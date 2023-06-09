import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { LOCAL_STORAGE_THEME } from "@/constants";
import Theme from "@Components/Theme/Theme";
import Auth from "@Pages/Auth/Auth";
import Main from "@Pages/Main/Main";
import { store, persistor } from "@Store/store";
import { IContext } from "@Types/theme";

import styles from "./App.module.scss";

export const ThemeContext = createContext<IContext>(undefined!);

const App = () => {
  const [lightMode, setLightMode] = useState<boolean>(true);

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
        <HashRouter>
          <ThemeContext.Provider value={{ lightMode, setLightMode }}>
            <div className={`${styles.app} ${!lightMode && styles.dark}`}>
              <div className={styles.container}>
                <header className={styles.header}>
                  <h1 className={styles.title}>Todo Application</h1>
                  <Theme />
                </header>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/auth" element={<Auth />} />
                </Routes>
              </div>
            </div>
          </ThemeContext.Provider>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
