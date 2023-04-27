import React, { FC } from "react";
import { useSelector } from "react-redux";
import TodoItem from "../TodoItem/TodoItem";
import { ITask } from "../../types/task.interface";
import styles from "./TodoList.module.scss";

const TodoList: FC = () => {
  const todoList = useSelector((state: ITask[]) => state);
  console.log(todoList);

  if (!todoList.length) {
    return <p className={styles.message}>No items found! Create new one.</p>;
  }

  return (
    <ul className={styles.list}>
      {todoList.map((task) => (
        <TodoItem key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default TodoList;
