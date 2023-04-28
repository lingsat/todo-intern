import React, { FC } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  style?: "red" | "green";
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  text,
  type = "button",
  style = "green",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${
        style === "green" ? styles.green : styles.red
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
