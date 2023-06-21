import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAuth } from "@/hooks/useAuth";
import CreateTask from "@Components/CreateTask/CreateTask";
import Filter from "@Components/Filter/Filter";
import TodoList from "@Components/TodoList/TodoList";
import { selectTodos } from "@Store/reducers/todoReducer";
import { fetchTodos } from "@Store/thunk/todos";
import { ERoutes } from "@Types/routes";

import styles from "./Main.module.scss";

const Main: FC = () => {
  const dispatch = useAppDispatch();
  const { todos, allTodosExist, query } = useSelector(selectTodos);
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchTodos(query));
    }
  }, [query.search, query.filter]);

  if (!isAuth) {
    return <Navigate to={ERoutes.AUTH} replace />;
  }

  return (
    <>
      <CreateTask />
      {allTodosExist ? (
        <>
          <Filter />
          {!todos.length && (
            <p className={styles.message}>
              No tasks found - among &quot;{query.filter}&quot;
            </p>
          )}
          <TodoList />
        </>
      ) : (
        <p className={styles.message}>No items found! Create new one.</p>
      )}
    </>
  );
};

export default Main;
