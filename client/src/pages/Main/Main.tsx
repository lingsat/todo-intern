import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import CreateTask from "@Components/CreateTask/CreateTask";
import TodoList from "@Components/TodoList/TodoList";
import { selectTodos } from "@Store/reducers/todoReducer";
import { AppDispatch } from "@Store/store";
import { fetchTodos } from "@Store/thunk/todos";
import { FilterValue } from "@Types/filter";
import { ERoutes } from "@Types/routes";

const Main: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useSelector(selectTodos);
  const { isAuth } = useAuth();

  const [filter, setFilter] = useState<FilterValue>(FilterValue.ALL);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchTodos(query));
    }
  }, [query.search]);

  if (!isAuth) {
    return <Navigate to={ERoutes.AUTH} replace />;
  }

  return (
    <>
      <CreateTask setFilter={setFilter} />
      <TodoList filter={filter} setFilter={setFilter} />
    </>
  );
};

export default Main;
