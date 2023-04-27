import React, { FC } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  buttonClick?: () => void;
  buttonStyle?: "red" | "green";
}

const Button: FC<ButtonProps> = ({
  text,
  type = "button",
  buttonClick,
  buttonStyle = "green",
}) => {
  return (
    <button
      className={`${styles.button} ${
        buttonStyle === "green" ? styles.green : styles.red
      }`}
      type={type}
      onClick={buttonClick}>
      {text}
    </button>
  );
};

export default Button;
