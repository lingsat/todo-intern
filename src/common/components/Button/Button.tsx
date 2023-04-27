import React, { FC } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  buttonClick?: () => void;
  buttonStyle?: "red" | "green";
  buttonDisabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  type = "button",
  buttonClick,
  buttonStyle = "green",
  buttonDisabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${
        buttonStyle === "green" ? styles.green : styles.red
      }`}
      type={type}
      onClick={buttonClick}
      disabled={buttonDisabled}>
      {text}
    </button>
  );
};

export default Button;
