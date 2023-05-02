import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { getValidDateStr } from "../../utils/date.utils";
import Modal from "../Modal/Modal";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { ITask } from "../../types/task.interface";
import deleteIcon from "../../assets/images/delete.svg";
import editIcon from "../../assets/images/edit.svg";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  task: ITask;
}

const TodoItem: FC<TodoItemProps> = ({ task }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    dispatch({ type: TodoActionTypes.TOGGLE_COMPLETE, payload: task.id });
  };

  const handleEditTask = () => {
    setShowModal(true);
  };

  const handleDeleteTask = () => {
    dispatch({ type: TodoActionTypes.DELETE_TASK, payload: task.id });
  };

  return (
    <>
      <li className={styles.item}>
        <div className={styles.completed}>
          {task.completed && <div className={styles.status}>Done</div>}
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
            name="completed"
            id="completed"
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
                  onClick={handleEditTask}
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
        <Modal editMode={true} {...task} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default TodoItem;
