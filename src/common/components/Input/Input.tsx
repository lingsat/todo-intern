import React, { ChangeEvent, FC } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
}

const Input: FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  min,
  max,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      min={min}
      max={max}
      onChange={onChange}
    />
  );
};

export default Input;
