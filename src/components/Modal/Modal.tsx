import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { getCurrentDateStr, getNextDateStr } from "../../utils/date.utils";
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
}

const Modal: FC<ModalProps> = ({
  title,
  setTitle,
  addTask,
  setShowModal,
  handleInputChange,
}) => {
  const [createdDate, setCreatedDate] = useState<string>(getCurrentDateStr());
  const [expiredDate, setExpiredDate] = useState<string>(getNextDateStr());

  const handleCreatedDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreatedDate(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const created = new Date(createdDate);
    const expired = new Date(expiredDate);
    expired.setHours(23, 59, 59, 999);

    addTask(title, expired, created);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setTitle("");
  };

  return (
    <div className={styles.bg}>
      <div className={styles.centered}>
        <h2>Add Task</h2>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <Input
            inputPlaceholder="Enter Task Title"
            inputValue={title}
            onInputChange={(e) => handleInputChange(e)}
          />
          <label>
            Created Date
            <Input
              inputType="date"
              inputValue={createdDate}
              onInputChange={handleCreatedDateChange}
            />
          </label>
          <label>
            Expired Date
            <Input
              inputType="date"
              inputValue={expiredDate}
              onInputChange={(e) => setExpiredDate(e.target.value)}
            />
          </label>
          <div className={styles.buttons}>
            <Button text="Cancel" buttonClick={closeModal} buttonStyle="red" />
            <Button
              text="Save"
              type="submit"
              buttonDisabled={!createdDate || !expiredDate}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
