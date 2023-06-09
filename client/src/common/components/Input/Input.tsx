import { ChangeEvent, FC, SyntheticEvent } from "react";

import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: SyntheticEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
}

const Input: FC<InputProps> = ({
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder = "",
  min,
  max,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      name={type}
      placeholder={placeholder}
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Input;
