import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCorrectDateStr } from "../../utils/date.utils";
import { createNewTask, getInvalidSymError } from "../../utils/task.utils";
import Button from "../../common/components/Button/Button";
import Input from "../../common/components/Input/Input";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { DatesDelay } from "../../types/datesDelay";
import { FilterValue, IFilter } from "../../types/filter";
import styles from "./Modal.module.scss";

interface ModalProps {
  editMode?: boolean;
  title: string;
  id?: string;
  createdDate?: string;
  expiredDate?: string;
  completed?: boolean;
  onToggleModal: () => void;
  setFilter?: React.Dispatch<React.SetStateAction<IFilter>>;
}

const Modal: FC<ModalProps> = ({
  editMode = false,
  title,
  id = crypto.randomUUID(),
  createdDate = getCorrectDateStr(),
  expiredDate = getCorrectDateStr(DatesDelay.ONE_DAY_AFTER),
  completed = false,
  onToggleModal,
  setFilter,
}) => {
  const [modalData, setModalData] = useState({
    title: title.trim(),
    createdDate,
    expiredDate,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const errorMessage = getInvalidSymError(event.target.value);

    if (!errorMessage) {
      setModalData((prevData) => ({
        ...prevData,
        title: event.target.value,
      }));
    }
    setErrorMessage(errorMessage);
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
        if (setFilter) {
          setFilter({ filterValue: FilterValue.ALL, searchValue: "" });
        }
      }
      onToggleModal();
    } else {
      setErrorMessage("Title can`t be empty!");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
              min={getCorrectDateStr(DatesDelay.TEN_MIN_AGO)}
              max={getCorrectDateStr(DatesDelay.TEN_YEARS_AFTER)}
              onChange={handleCreatedDateChange}
            />
          </label>
          <label className={styles.label}>
            Expired Date
            <Input
              type="datetime-local"
              value={modalData.expiredDate}
              min={getCorrectDateStr(
                DatesDelay.TEN_MIN_AFTER,
                new Date(modalData.createdDate)
              )}
              max={getCorrectDateStr(DatesDelay.TEN_YEARS_AFTER)}
              onChange={handleExpiredDateChange}
            />
          </label>
          <div className={styles.buttons}>
            <Button text="Cancel" style="red" onClick={onToggleModal} />
            <Button text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
