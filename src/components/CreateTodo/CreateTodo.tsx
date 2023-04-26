import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import plusIcon from "../../assets/plus.svg";
import styles from "./CreateTodo.module.scss";

const CreateTodo: FC = () => {
  const [title, setTitle] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (title) {
      // Dispatch new task ---------------------
      console.log(title);
    }
  };

  return (
    <div className={styles.create}>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <input
          className={styles.input}
          type="text"
          placeholder='Title - "Enter" to create'
          value={title}
          onChange={(e) => handleInputChange(e)}
        />
      </form>
      <button className={styles.button}>
        <img src={plusIcon} alt="+" />
      </button>
    </div>
  );
};

export default CreateTodo;
