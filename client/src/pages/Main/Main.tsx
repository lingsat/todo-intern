import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import Loading from "@CommonComponents/Loading/Loading";
import CreateTask from "@Components/CreateTask/CreateTask";
import TodoList from "@Components/TodoList/TodoList";
import { selectTodos } from "@Store/reducers/todoReducer";
import { AppDispatch } from "@Store/store";
import { fetchTodos } from "@Store/thunk/todos";
import { IFilter, FilterValue } from "@Types/filter";
import { ERoutes } from "@Types/routes";

const Main: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector(selectTodos);
  const { isAuth } = useAuth();

  const [filter, setFilter] = useState<IFilter>({
    filterValue: FilterValue.ALL,
    searchValue: "",
  });

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchTodos());
    }
  }, []);

  if (!isAuth) {
    return <Navigate to={ERoutes.AUTH} replace />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <CreateTask setFilter={setFilter} />
      <TodoList filter={filter} setFilter={setFilter} />
    </>
  );
};

export default Main;
