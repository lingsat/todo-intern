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
import Input from "@CommonComponents/Input/Input";
import Modal from "@Components/Modal/Modal";
import { AppDispatch } from "@Store/store";
import { fetchAddTask } from "@Store/thunk/todos";
import { FilterValue } from "@Types/filter";
import { createNewTask, getInvalidSymError } from "@Utils/task";

import plusIcon from "@Images/plus.svg";

import styles from "./CreateTask.module.scss";

interface CreateTaskProps {
  setFilter: React.Dispatch<React.SetStateAction<FilterValue>>;
}

const CreateTask: FC<CreateTaskProps> = ({ setFilter }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lightMode } = useContext(ThemeContext);

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
      const newTask = createNewTask(trimmedTitle);
      dispatch(fetchAddTask(newTask)).then(() => {
        setFilter(FilterValue.ALL);
      });
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
