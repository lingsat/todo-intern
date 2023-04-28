import React, { FC } from "react";
import { getValidDateStr } from "../../utils/date.utils";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  title: string;
  createdDate: Date;
  expiredDate: Date;
}

const TodoItem: FC<TodoItemProps> = ({ title, createdDate, expiredDate }) => {
  return (
    <li className={styles.item}>
      <h3 className={styles.title}>{title}</h3>
      <div>
        <p className={styles.text}>Created: {getValidDateStr(createdDate)}</p>
        <p className={styles.text}>Expired: {getValidDateStr(expiredDate)}</p>
      </div>
    </li>
  );
};

export default TodoItem;
