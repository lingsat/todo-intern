import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAuth } from "@/hooks/useAuth";
import CreateTask from "@Components/CreateTask/CreateTask";
import TodoList from "@Components/TodoList/TodoList";
import { selectTodos } from "@Store/reducers/todoReducer";
import { fetchTodos } from "@Store/thunk/todos";
import { ERoutes } from "@Types/routes";

const Main: FC = () => {
  const dispatch = useAppDispatch();
  const { query } = useSelector(selectTodos);
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
      <TodoList />
    </>
  );
};

export default Main;
