import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getNextDayEnd } from "../../utils/date.utils";
import Modal from "../Modal/Modal";
import Input from "../../common/components/Input/Input";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { ITask } from "../../types/task.interface";
import plusIcon from "../../assets/images/plus.svg";
import styles from "./CreateTask.module.scss";

const CreateTask: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch();

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
      const task: ITask = {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        createdDate: new Date(),
        expiredDate: getNextDayEnd(),
        completed: false,
      };

      dispatch({ type: TodoActionTypes.ADD_TASK, payload: task });
      setShowModal(false);
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
        <button
          type="button"
          className={styles.button}
          onClick={() => setShowModal(true)}>
          <img className={styles.icon} src={plusIcon} alt="+" />
        </button>
      </div>
      {showModal && <Modal title={title} setShowModal={setShowModal} />}
    </>
  );
};

export default CreateTask;
