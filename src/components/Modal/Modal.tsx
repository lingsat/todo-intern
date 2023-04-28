import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  getCurrentDateStr,
  getTenMinAgo,
  getNextDateStr,
  getTenMinAfter,
  getTenYearsAfter,
} from "../../utils/date.utils";
import Button from "../../common/components/Button/Button";
import Input from "../../common/components/Input/Input";
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
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  setErrorMessage: (arg: string) => void;
}

const Modal: FC<ModalProps> = ({
  title,
  setTitle,
  addTask,
  setShowModal,
  handleInputChange,
  errorMessage,
  setErrorMessage,
}) => {
  const [createdDate, setCreatedDate] = useState<string>(getCurrentDateStr());
  const [expiredDate, setExpiredDate] = useState<string>(getNextDateStr());

  const handleCreatedDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setCreatedDate(event.target.value);
    }
  };

  const handleExpiredDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setExpiredDate(event.target.value);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const created = new Date(createdDate);
    const expired = new Date(expiredDate);
    addTask(title, expired, created);
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage("");
    setTitle("");
  };

  return (
    <div className={styles.bg}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Add Task</h2>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <Input
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => handleInputChange(e)}
          />
          <p className={styles.error}>{errorMessage}</p>
          <label className={styles.label}>
            Created Date
            <Input
              type="datetime-local"
              value={createdDate}
              min={getTenMinAgo()}
              max={getTenYearsAfter()}
              onChange={handleCreatedDateChange}
            />
          </label>
          <label className={styles.label}>
            Expired Date
            <Input
              type="datetime-local"
              value={expiredDate}
              min={getTenMinAfter(createdDate)}
              max={getTenYearsAfter()}
              onChange={handleExpiredDateChange}
            />
          </label>
          <div className={styles.buttons}>
            <Button text="Cancel" style="red" onClick={closeModal} />
            <Button
              text="Save"
              type="submit"
              disabled={!createdDate || !expiredDate}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
