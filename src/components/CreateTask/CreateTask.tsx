import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal/Modal";
import Input from "../../common/components/Input/Input";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { ITask } from "../../types/task.interface";
import plusIcon from "../../assets/plus.svg";
import styles from "./CreateTask.module.scss";

const CreateTask: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const specSymRegex = /[#$%^&*{}`|<>]/g;

    if (!specSymRegex.test(event.target.value)) {
      setTitle(event.target.value);
    }
  };

  const addTask = (
    title: string,
    expired: string | Date,
    created: string | Date = new Date()
  ) => {
    if (title.trim()) {
      const createdDate = new Date(created);
      const expiredDate = new Date(expired);

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
    nextDay.setHours(23, 59, 59, 999);
    addTask(title, nextDay);
  };

  return (
    <>
      <div className={styles.create}>
        <form onSubmit={handleFormSubmit}>
          <Input
            inputPlaceholder='Title - "Enter" to create'
            inputValue={title}
            onInputChange={handleInputChange}
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
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );
};

export default CreateTask;
