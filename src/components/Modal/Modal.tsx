import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { getCurrentDateStr, getNextDateStr } from "../../utils/date.utils";
import styles from "./Modal.module.scss";

interface ModalProps {
  title: string;
  setTitle: (arg: string) => void;
  addTask: (
    title: string,
    expired: string | Date,
    created?: string | Date
  ) => void;
  setShowModal: (arg: boolean) => void;
}

const Modal: FC<ModalProps> = ({ title, setTitle, addTask, setShowModal }) => {
  const [createdDate, setCreatedDate] = useState<string>(getCurrentDateStr());
  const [expiredDate, setExpiredDate] = useState(getNextDateStr());

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCreatedDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreatedDate(event.target.value);
  };

  const handleExpiredDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpiredDate(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const created = new Date(createdDate);
    const expired = new Date(expiredDate);
    expired.setHours(23, 59, 59, 999);
    addTask(title, expired, created);
    setShowModal(false);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.centered}>
        <h2>Add Task</h2>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter Task Title"
            value={title}
            onChange={handleTitleChange}
          />
          <label>
            Created Date
            <input
              type="date"
              value={createdDate}
              onChange={handleCreatedDateChange}
            />
          </label>
          <label>
            Expired Date
            <input
              type="date"
              value={expiredDate}
              onChange={handleExpiredDateChange}
            />
          </label>
          <div className={styles.buttons}>
            <button
              className={styles.red}
              type="button"
              onClick={() => setShowModal(false)}>
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
