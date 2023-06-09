import { FC, useContext } from "react";

import { ThemeContext } from "@/App";

import moon from "@Images/moon.svg";
import sun from "@Images/sun.svg";

import styles from "./Theme.module.scss";

const Theme: FC = () => {
  const { lightMode, setLightMode } = useContext(ThemeContext);

  const handleCheckboxChange = () => {
    setLightMode((prev) => !prev);
  };

  const setLightTheme = (newTheme: boolean) => () => {
    setLightMode(newTheme);
  };

  return (
    <div className={styles.theme}>
      <img src={sun} alt="Sun" onClick={setLightTheme(true)} />
      <input
        type="checkbox"
        checked={!lightMode}
        className={styles.checkbox}
        onChange={handleCheckboxChange}
      />
      <img src={moon} alt="Moon" onClick={setLightTheme(false)} />
    </div>
  );
};

export default Theme;
