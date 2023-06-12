import { FC } from "react";
import { useSelector } from "react-redux";

import { selectTodos } from "@/store/reducers/todoReducer";
import Filter from "@Components/Filter/Filter";
import TodoItem from "@Components/TodoItem/TodoItem";
import { IFilter } from "@Types/filter";
import { getFilteredList, getIsCompletedExist } from "@Utils/task";

import styles from "./TodoList.module.scss";

interface TodoListProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

const TodoList: FC<TodoListProps> = ({ filter, setFilter }) => {
  const { todos } = useSelector(selectTodos);

  const filteredList = getFilteredList(todos, filter);
  const isCompletedExist = getIsCompletedExist(todos);

  if (!todos.length) {
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
          <TodoItem key={task._id} task={task} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
