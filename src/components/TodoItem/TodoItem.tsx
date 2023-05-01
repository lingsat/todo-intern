import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { getValidDateStr } from "../../utils/date.utils";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import deleteIcon from "../../assets/images/delete.svg";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  id: string;
  title: string;
  createdDate: Date;
  expiredDate: Date;
  completed: boolean;
}

const TodoItem: FC<TodoItemProps> = ({
  id,
  title,
  createdDate,
  expiredDate,
  completed,
}) => {
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    dispatch({ type: TodoActionTypes.TOGGLE_COMPLETE, payload: id });
  };

  const handleDeleteTask = () => {
    dispatch({ type: TodoActionTypes.DELETE_TASK, payload: id });
  };

  return (
    <li className={styles.item}>
      <div className={styles.completed}>
        {completed && <div className={styles.status}>Done</div>}
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          name="completed"
          id="completed"
        />
      </div>
      <div className={`${styles.content} ${completed && styles.crosed}`}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.info}>
          <div>
            <p className={styles.text}>
              Created: {getValidDateStr(createdDate)}
            </p>
            <p className={styles.text}>
              Expired: {getValidDateStr(expiredDate)}
            </p>
          </div>
          <div>
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
  );
};

export default TodoItem;
