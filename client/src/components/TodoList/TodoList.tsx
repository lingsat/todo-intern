import { FC } from "react";
import { useSelector } from "react-redux";

import Loading from "@CommonComponents/Loading/Loading";
import Filter from "@Components/Filter/Filter";
import TodoItem from "@Components/TodoItem/TodoItem";
import { selectTodos } from "@Store/reducers/todoReducer";
import { FilterValue } from "@Types/filter";
import { getFilteredList, getIsCompletedExist } from "@Utils/task";

import styles from "./TodoList.module.scss";

interface TodoListProps {
  filter: FilterValue;
  setFilter: React.Dispatch<React.SetStateAction<FilterValue>>;
}

const TodoList: FC<TodoListProps> = ({ filter, setFilter }) => {
  const { todos, isLoading, allTodosExist } = useSelector(selectTodos);

  const filteredList = getFilteredList(todos, filter);
  const isCompletedExist = getIsCompletedExist(todos);

  if (!allTodosExist) {
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
          No tasks found - among &quot;{filter}&quot;
        </p>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <ul className={styles.list}>
          {filteredList.map((task) => (
            <TodoItem key={task._id} task={task} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
