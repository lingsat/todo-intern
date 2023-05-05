import React, { FC, useContext } from "react";
import { ThemeContext } from "../../App";
import sun from "../../assets/images/sun.svg";
import moon from "../../assets/images/moon.svg";
import styles from "./ThemeSwitcher.module.scss";

const ThemeSwitcher: FC = () => {
  const { lightMode, setLightMode } = useContext(ThemeContext);

  const handleCheckboxChange = () => {
    setLightMode((prev) => !prev);
  };

  const setDarkTheme = () => {
    setLightMode(false);
  };

  const setLightTheme = () => {
    setLightMode(true);
  };

  return (
    <div className={styles.theme}>
      <img src={sun} alt="Sun" onClick={setLightTheme} />
      <input
        type="checkbox"
        checked={!lightMode}
        className={styles.checkbox}
        onChange={handleCheckboxChange}
      />
      <img src={moon} alt="Moon" onClick={setDarkTheme} />
    </div>
  );
};

export default ThemeSwitcher;
