import { FC } from "react";
import { useSelector } from "react-redux";

import Loading from "@CommonComponents/Loading/Loading";
import Filter from "@Components/Filter/Filter";
import TodoItem from "@Components/TodoItem/TodoItem";
import { selectTodos } from "@Store/reducers/todoReducer";
import { getIsCompletedExist } from "@Utils/task";

import styles from "./TodoList.module.scss";

const TodoList: FC = () => {
  const { todos, isLoading, allTodosExist, query } = useSelector(selectTodos);

  const isCompletedExist = getIsCompletedExist(todos);

  if (!allTodosExist) {
    return <p className={styles.message}>No items found! Create new one.</p>;
  }

  return (
    <>
      <Filter isCompletedExist={isCompletedExist} />
      {!todos.length && (
        <p className={styles.message}>
          No tasks found - among &quot;{query.filter}&quot;
        </p>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <ul className={styles.list}>
          {todos.map((task) => (
            <TodoItem key={task._id} task={task} />
          ))}
        </ul>
      )}
    </>
  );
};

export default TodoList;
