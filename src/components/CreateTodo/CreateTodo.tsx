import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { ITask } from "../../types/task.interface";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import plusIcon from "../../assets/plus.svg";
import styles from "./CreateTodo.module.scss";

const CreateTodo: FC = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const specSymRegex = /[!@#$%^&*(){}|<>]/g;

    if (!specSymRegex.test(event.target.value)) {
      setTitle(event.target.value);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title) {
      const createdDate = new Date();
      const expiredDate = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000);
      expiredDate.setHours(23, 59, 59, 999);

      const task: ITask = {
        id: crypto.randomUUID(),
        title,
        createdDate,
        expiredDate,
        completed: false,
      };

      dispatch({ type: TodoActionTypes.ADD_TASK, payload: task });
      setTitle("");
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
