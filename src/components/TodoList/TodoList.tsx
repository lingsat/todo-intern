import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { getFilteredList } from "../../utils/task.utils";
import TodoItem from "../TodoItem/TodoItem";
import Filter from "../Filter/Filter";
import { ITask } from "../../types/task.interface";
import { FilterValue } from "../../types/filter.type";
import styles from "./TodoList.module.scss";

const TodoList: FC = () => {
  const todoList = useSelector((state: ITask[]) => state);

  const [filterValue, setFilterValue] = useState<FilterValue>("all");

  const filteredList = getFilteredList(todoList, filterValue);

  if (!todoList.length) {
    return <p className={styles.message}>No items found! Create new one.</p>;
  }

  return (
    <>
      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />
      <ul className={styles.list}>
        {filteredList.map((task) => (
          <TodoItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
