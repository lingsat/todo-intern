import React, { ChangeEvent, FC } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  inputValue: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputType?: string;
  inputPlaceholder?: string;
}

const Input: FC<InputProps> = ({
  inputValue,
  onInputChange,
  inputType = "text",
  inputPlaceholder = "",
}) => {
  return (
    <input
      className={styles.input}
      type={inputType}
      placeholder={inputPlaceholder}
      value={inputValue}
      onChange={onInputChange}
    />
  );
};

export default Input;
