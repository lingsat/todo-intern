import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getFilteredList, getIsCompletedExist } from "../../utils/task.utils";
import TodoItem from "../TodoItem/TodoItem";
import Filter from "../Filter/Filter";
import { ITodos } from "../../store/types/todos.interface";
import { FilterValue } from "../../types/filter";
import styles from "./TodoList.module.scss";

interface TodoListProps {
  filterValue: FilterValue;
  setFilterValue: (arg: FilterValue) => void;
}

const TodoList: FC<TodoListProps> = ({ filterValue, setFilterValue }) => {
  const todoList = useSelector((state: ITodos) => state.todos);

  const filteredList = getFilteredList(todoList, filterValue);
  const isCompletedExist = getIsCompletedExist(todoList);

  if (!todoList.length) {
    return <p className={styles.message}>No items found! Create new one.</p>;
  }

  return (
    <>
      <Filter
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        isCompletedExist={isCompletedExist}
      />
      {!filteredList.length && (
        <p className={styles.message}>No {filterValue} items found.</p>
      )}
      <ul className={styles.list}>
        {filteredList.map((task) => (
          <TodoItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
