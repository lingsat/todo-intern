import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getTenMinAgo,
  getTenMinAfter,
  getTenYearsAfter,
  getCurrentDateStr,
  getNextDateStr,
} from "../../utils/date.utils";
import { createNewTask } from "../../utils/task.utils";
import Button from "../../common/components/Button/Button";
import Input from "../../common/components/Input/Input";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { FilterValue } from "../../types/filter";
import styles from "./Modal.module.scss";

interface ModalProps {
  editMode?: boolean;
  title: string;
  id?: string;
  createdDate?: string;
  expiredDate?: string;
  completed?: boolean;
  onCloseModal: () => void;
  setFilterValue?: (arg: FilterValue) => void;
}

const Modal: FC<ModalProps> = ({
  editMode = false,
  title,
  id = crypto.randomUUID(),
  createdDate = getCurrentDateStr(),
  expiredDate = getNextDateStr(),
  completed = false,
  onCloseModal,
  setFilterValue,
}) => {
  const [modalData, setModalData] = useState({
    title: title.trim(),
    createdDate,
    expiredDate,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const specSymRegex = /[#$%^&*{}`|<>]/g;

    if (!specSymRegex.test(event.target.value)) {
      setModalData((prevData) => ({
        ...prevData,
        title: event.target.value,
      }));
      setErrorMessage("");
    } else {
      setErrorMessage('"#$%^&*{}`|<>" - symbols not available');
    }
  };

  const handleCreatedDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setModalData((prevData) => ({
        ...prevData,
        createdDate: event.target.value,
      }));
    }
  };

  const handleExpiredDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setModalData((prevData) => ({
        ...prevData,
        expiredDate: event.target.value,
      }));
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = modalData.title.trim();
    const { createdDate, expiredDate } = modalData;
    if (trimmedTitle) {
      const task = createNewTask(
        trimmedTitle,
        id,
        createdDate,
        expiredDate,
        completed
      );

      if (editMode) {
        dispatch({ type: TodoActionTypes.EDIT_TASK, payload: task });
      } else {
        dispatch({ type: TodoActionTypes.ADD_TASK, payload: task });
        if (setFilterValue) setFilterValue(FilterValue.ALL);
      }
      onCloseModal();
    } else {
      setErrorMessage("Title can`t be empty!");
    }
  };

  return (
    <div className={styles.bg}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{editMode ? "Edit" : "Add"} Task</h2>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <Input
            placeholder="Enter Task Title"
            value={modalData.title}
            onChange={handleTitleChange}
          />
          <p className={styles.error}>{errorMessage}</p>
          <label className={styles.label}>
            Created Date
            <Input
              type="datetime-local"
              value={modalData.createdDate}
              min={getTenMinAgo()}
              max={getTenYearsAfter()}
              onChange={handleCreatedDateChange}
            />
          </label>
          <label className={styles.label}>
            Expired Date
            <Input
              type="datetime-local"
              value={modalData.expiredDate}
              min={getTenMinAfter(modalData.createdDate)}
              max={getTenYearsAfter()}
              onChange={handleExpiredDateChange}
            />
          </label>
          <div className={styles.buttons}>
            <Button text="Cancel" style="red" onClick={onCloseModal} />
            <Button text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
