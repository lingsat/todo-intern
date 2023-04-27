import React, { FC } from "react";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  title: string;
  createdDate: Date;
  expiredDate: Date;
}

const TodoItem: FC<TodoItemProps> = ({ title, createdDate, expiredDate }) => {
  return (
    <li className={styles.item}>
      <h3>{title}</h3>
      <div>
        <p>Created: {createdDate.toISOString().substring(0, 10)}</p>
        <p>Expired: {expiredDate.toISOString().substring(0, 10)}</p>
      </div>
    </li>
  );
};

export default TodoItem;
