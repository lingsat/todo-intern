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
import { useAuth } from "@/hooks/useAuth";
import Input from "@CommonComponents/Input/Input";
import Modal from "@Components/Modal/Modal";
import { addTask } from "@Store/reducers/todoReducer";
import { AppDispatch } from "@Store/store";
import { FilterValue, IFilter } from "@Types/filter";
import { createNewTask, getInvalidSymError } from "@Utils/task";

import plusIcon from "@Images/plus.svg";

import styles from "./CreateTask.module.scss";

interface CreateTaskProps {
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

const CreateTask: FC<CreateTaskProps> = ({ setFilter }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lightMode } = useContext(ThemeContext);
  const { userId } = useAuth();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
      const task = createNewTask(trimmedTitle, userId);
      dispatch(addTask(task));
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
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <Input
          placeholder='Title - "Enter" to create'
          value={title}
          onChange={handleInputChange}
        />
        <p className={`${styles.error} ${!lightMode && styles.dark}`}>
          {errorMessage}
        </p>
        <button type="button" className={styles.button} onClick={toggleModal}>
          <img className={styles.icon} src={plusIcon} alt="+" />
        </button>
      </form>
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
