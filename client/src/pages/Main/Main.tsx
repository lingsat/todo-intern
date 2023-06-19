import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import CreateTask from "@Components/CreateTask/CreateTask";
import TodoList from "@Components/TodoList/TodoList";
import { selectTodos } from "@Store/reducers/todoReducer";
import { AppDispatch } from "@Store/store";
import { fetchTodos } from "@Store/thunk/todos";
import { ERoutes } from "@Types/routes";

const Main: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
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
