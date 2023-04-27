import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { ITask } from "../../types/task.interface";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import plusIcon from "../../assets/plus.svg";
import styles from "./CreateTask.module.scss";
import Modal from "../Modal/Modal";

const CreateTask: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const specSymRegex = /[#$%^&*{}|<>]/g;

    if (!specSymRegex.test(event.target.value)) {
      setTitle(event.target.value);
    }
  };

  const addTask = (
    title: string,
    expired: string | Date,
    created: string | Date = new Date()
  ) => {
    if (title) {
      const createdDate = new Date(created);
      const expiredDate = new Date(expired);
      expiredDate.setHours(23, 59, 59, 999);

      const task: ITask = {
        id: crypto.randomUUID(),
        title,
        createdDate,
        expiredDate,
        completed: false,
      };

      dispatch({ type: TodoActionTypes.ADD_TASK, payload: task });
    }
    setTitle("");
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextDay = new Date();
    nextDay.setDate(new Date().getDate() + 1);
    addTask(title, nextDay);
  };

  return (
    <>
      <div className={styles.create}>
        <form onSubmit={handleFormSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder='Title - "Enter" to create'
            value={title}
            onChange={handleInputChange}
          />
        </form>
        <button
          type="button"
          className={styles.button}
          onClick={() => setShowModal(true)}>
          <img src={plusIcon} alt="+" />
        </button>
      </div>
      {showModal && (
        <Modal
          title={title}
          setTitle={setTitle}
          addTask={addTask}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default CreateTask;
