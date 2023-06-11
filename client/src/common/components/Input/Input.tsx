import { ChangeEvent, FC, SyntheticEvent } from "react";

import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: SyntheticEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  placeholder?: string;
  min?: string;
  max?: string;
}

const Input: FC<InputProps> = ({
  value,
  onChange,
  onBlur,
  type = "text",
  name,
  placeholder = "",
  min,
  max,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
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
