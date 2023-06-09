import { FC } from "react";

import { EBtnStyle } from "@/common/types/button";

import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  style?: EBtnStyle;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  text,
  type = "button",
  style = EBtnStyle.GREEN,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${
        style === EBtnStyle.GREEN ? styles.green : styles.red
      }`}
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
