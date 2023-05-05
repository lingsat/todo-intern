import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTask, getInvalidSymError } from "../../utils/task.utils";
import Modal from "../Modal/Modal";
import Input from "../../common/components/Input/Input";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { FilterValue, IFilter } from "../../types/filter";
import plusIcon from "../../assets/images/plus.svg";
import styles from "./CreateTask.module.scss";

interface CreateTaskProps {
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

const CreateTask: FC<CreateTaskProps> = ({ setFilter }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const errorMessage = getInvalidSymError(event.target.value);

    if (!errorMessage) {
      setTitle(event.target.value);
    }
    setErrorMessage(errorMessage);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      const task = createNewTask(trimmedTitle);
      dispatch({ type: TodoActionTypes.ADD_TASK, payload: task });
      setErrorMessage("");
      setFilter({ filterValue: FilterValue.ALL, searchValue: "" });
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
        <button type="button" className={styles.button} onClick={toggleModal}>
          <img className={styles.icon} src={plusIcon} alt="+" />
        </button>
      </div>
      {showModal && (
        <Modal
          title={title}
          onToggleModal={toggleModal}
          setFilter={setFilter}
        />
      )}
    </>
  );
};

export default CreateTask;
