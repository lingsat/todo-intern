import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTask } from "../../utils/task.utils";
import Modal from "../Modal/Modal";
import Input from "../../common/components/Input/Input";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import plusIcon from "../../assets/images/plus.svg";
import styles from "./CreateTask.module.scss";

const CreateTask: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const specSymRegex = /[#$%^&*{}`|<>]/g;

    if (!specSymRegex.test(event.target.value)) {
      setTitle(event.target.value);
      setErrorMessage("");
    } else {
      setErrorMessage('"#$%^&*{}`|<>" - symbols not available');
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      const task = createNewTask(trimmedTitle);
      dispatch({ type: TodoActionTypes.ADD_TASK, payload: task });
      closeModal();
      setErrorMessage("");
    } else {
      setErrorMessage("Title can`t be empty!");
    }
    setTitle("");
  };

  useEffect(() => {
    setTitle("");
  }, [showModal]);

  return (
    <>
      <div className={styles.create}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <Input
            placeholder='Title - "Enter" to create'
            value={title}
            onChange={handleInputChange}
          />
          <p className={styles.error}>{errorMessage}</p>
        </form>
        <button type="button" className={styles.button} onClick={openModal}>
          <img className={styles.icon} src={plusIcon} alt="+" />
        </button>
      </div>
      {showModal && <Modal title={title} onCloseModal={closeModal} />}
    </>
  );
};

export default CreateTask;
