import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import { LOCAL_STORAGE_THEME, MESSAGE_TIMER } from "@/constants";
import Header from "@Components/Header/Header";
import Login from "@Pages/Login/Login";
import Main from "@Pages/Main/Main";
import { store, persistor } from "@Store/store";
import { ERoutes } from "@Types/routes";
import { ETheme, IContext } from "@Types/theme";

import "react-toastify/dist/ReactToastify.css";
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
                <Header />
                <Routes>
                  <Route path={ERoutes.HOME} element={<Main />} />
                  <Route path={ERoutes.AUTH} element={<Login />} />
                </Routes>
              </div>
              <ToastContainer
                position="bottom-center"
                theme={lightMode ? ETheme.LIGHT : ETheme.DARK}
                autoClose={MESSAGE_TIMER}
              />
            </div>
          </ThemeContext.Provider>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
