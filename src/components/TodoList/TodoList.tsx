import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getFilteredList, getIsCompletedExist } from "../../utils/task.utils";
import TodoItem from "../TodoItem/TodoItem";
import Filter from "../Filter/Filter";
import { ITodos } from "../../store/types/todos.interface";
import { IFilter } from "../../types/filter";
import styles from "./TodoList.module.scss";

interface TodoListProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

const TodoList: FC<TodoListProps> = ({ filter, setFilter }) => {
  const todoList = useSelector((state: ITodos) => state.todos);

  const filteredList = getFilteredList(todoList, filter);
  const isCompletedExist = getIsCompletedExist(todoList);

  if (!todoList.length) {
    return <p className={styles.message}>No items found! Create new one.</p>;
  }

  return (
    <>
      <Filter
        filter={filter}
        setFilter={setFilter}
        isCompletedExist={isCompletedExist}
      />
      {!filteredList.length && (
        <p className={styles.message}>
          No tasks found - among &quot;{filter.filterValue}&quot;
        </p>
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
