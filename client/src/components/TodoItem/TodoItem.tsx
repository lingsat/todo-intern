import React, { FC, useContext, useState } from "react";
import { useDispatch } from "react-redux";

import { ThemeContext } from "@/App";
import { useAuth } from "@/hooks/useAuth";
import Modal from "@Components/Modal/Modal";
import { deleteTask } from "@Store/reducers/todoReducer";
import { AppDispatch } from "@Store/store";
import { fetchEditTask } from "@Store/thunk/todos";
import { ITask } from "@Types/task";
import { getValidDateStr } from "@Utils/date";

import deleteIcon from "@Images/delete.svg";
import editIcon from "@Images/edit.svg";

import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  task: ITask;
}

const TodoItem: FC<TodoItemProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lightMode } = useContext(ThemeContext);
  const { user } = useAuth();

  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleCheckboxChange = () => {
    const changedTask: ITask = { ...task, completed: !task.completed };
    dispatch(fetchEditTask({ token: user.token, changedTask }));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(task._id));
  };

  return (
    <>
      <li className={`${styles.item} ${!lightMode && styles.dark}`}>
        <div className={styles.completed}>
          {task.completed && <div className={styles.status}>Done</div>}
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={`${styles.content} ${task.completed && styles.crosed}`}>
          <h3 className={styles.title}>{task.title}</h3>
          <div className={styles.info}>
            <div>
              <p className={styles.text}>
                Created: {getValidDateStr(task.createdDate)}
              </p>
              <p className={styles.text}>
                Expired: {getValidDateStr(task.expiredDate)}
              </p>
            </div>
            <div>
              {!task.completed && (
                <img
                  className={styles.icon}
                  src={editIcon}
                  alt="Edit"
                  onClick={toggleModal}
                />
              )}
              <img
                className={styles.icon}
                src={deleteIcon}
                alt="Delete"
                onClick={handleDeleteTask}
              />
            </div>
          </div>
        </div>
      </li>
      {showModal && (
        <Modal editMode={true} {...task} onToggleModal={toggleModal} />
      )}
    </>
  );
};

export default React.memo(TodoItem);
