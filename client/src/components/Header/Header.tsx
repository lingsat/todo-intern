import React, { FC } from "react";
import { useDispatch } from "react-redux";

import { useAuth } from "@/hooks/useAuth";
import Theme from "@Components/Theme/Theme";
import { logOut } from "@Store/reducers/userReducer";
import { AppDispatch } from "@Store/store";
import { clearTokens } from "@Utils/token";

import styles from "./Header.module.scss";

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth } = useAuth();

  const handleLogOut = () => {
    dispatch(logOut());
    clearTokens();
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Todo Application</h1>
      <div className={styles.controls}>
        <Theme />
        {isAuth && (
          <button className={styles.button} onClick={handleLogOut}>
            Log Out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
