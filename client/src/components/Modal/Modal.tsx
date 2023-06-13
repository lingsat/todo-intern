import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import { ThemeContext } from "@/App";
import { EBtnStyle } from "@/common/types/button";
import { useAuth } from "@/hooks/useAuth";
import Button from "@CommonComponents/Button/Button";
import Input from "@CommonComponents/Input/Input";
import { editTask } from "@Store/reducers/todoReducer";
import { AppDispatch } from "@Store/store";
import { fetchAddTask } from "@Store/thunk/todos";
import { DatesDelay } from "@Types/dates";
import { FilterValue, IFilter } from "@Types/filter";
import { getCorrectDateStr } from "@Utils/date";
import { createNewTask, getInvalidSymError } from "@Utils/task";

import styles from "./Modal.module.scss";

interface ModalProps {
  editMode?: boolean;
  title: string;
  _id?: string;
  createdDate?: string;
  expiredDate?: string;
  completed?: boolean;
  onToggleModal: () => void;
  setFilter?: React.Dispatch<React.SetStateAction<IFilter>>;
}

const Modal: FC<ModalProps> = ({
  editMode = false,
  title,
  _id = crypto.randomUUID(),
  createdDate = getCorrectDateStr(),
  expiredDate = getCorrectDateStr(DatesDelay.ONE_DAY_AFTER),
  completed = false,
  onToggleModal,
  setFilter,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lightMode } = useContext(ThemeContext);
  const { user, userId } = useAuth();

  const [modalData, setModalData] = useState({
    title: title.trim(),
    createdDate,
    expiredDate,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const minCreateTime = editMode
    ? getCorrectDateStr(DatesDelay.TEN_MIN_AGO, new Date(modalData.createdDate))
    : getCorrectDateStr(DatesDelay.TEN_MIN_AGO);

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
      if (editMode) {
        const task = {
          _id,
          userId,
          title: trimmedTitle,
          createdDate,
          expiredDate,
          completed,
        };
        dispatch(editTask(task));
      } else {
        const newTask = createNewTask(trimmedTitle, createdDate, expiredDate);
        dispatch(fetchAddTask({ token: user.token, newTask }));
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
      <div className={`${styles.modal} ${!lightMode && styles.dark}`}>
        <h2 className={styles.title}>{editMode ? "Edit" : "Add"} Task</h2>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <Input
            placeholder="Enter Task Title"
            value={modalData.title}
            onChange={handleTitleChange}
          />
          <p className={`${styles.error} ${!lightMode && styles.dark}`}>
            {errorMessage}
          </p>
          <label className={styles.label}>
            Created Date
            <Input
              type="datetime-local"
              value={modalData.createdDate}
              min={minCreateTime}
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
            <Button
              text="Cancel"
              style={EBtnStyle.RED}
              onClick={onToggleModal}
            />
            <Button text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
