import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentDateStr, getNextDateStr } from "../../utils/date.utils";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { ITask } from "../../types/task.interface";
import styles from "./Modal.module.scss";

interface ModalProps {
  onCloseModal: () => void;
}

const Modal: FC<ModalProps> = ({ onCloseModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    createdDate: getCurrentDateStr(),
    expiredDate: getNextDateStr(),
  });
  const dispatch = useDispatch();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setFormData((prevData) => ({ ...prevData, title }));
  };

  const handleCreatedDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const createdDate = event.target.value;
    setFormData((prevData) => ({ ...prevData, createdDate }));
  };

  const handleExpiredDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const expiredDate = event.target.value;
    setFormData((prevData) => ({ ...prevData, expiredDate }));
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (formData.title) {
      const createdDate = new Date(formData.createdDate);
      const expiredDate = new Date(formData.expiredDate);
      expiredDate.setHours(23, 59, 59, 999);

      const task: ITask = {
        id: crypto.randomUUID(),
        title: formData.title,
        createdDate,
        expiredDate,
        completed: false,
      };

      dispatch({ type: TodoActionTypes.ADD_TASK, payload: task });
    }
    onCloseModal();
  };

  return (
    <div className={styles.bg}>
      <div className={styles.centered}>
        <h2>Add Task</h2>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter Task Title"
            value={formData.title}
            onChange={handleTitleChange}
          />
          <label>
            Created Date
            <input
              type="date"
              value={formData.createdDate}
              onChange={handleCreatedDateChange}
            />
          </label>
          <label>
            Expired Date
            <input
              type="date"
              value={formData.expiredDate}
              onChange={handleExpiredDateChange}
            />
          </label>
          <div className={styles.buttons}>
            <button className={styles.red} type="button" onClick={onCloseModal}>
              Cancel
            </button>
            <button className={styles.green} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
