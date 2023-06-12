import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import Loading from "@CommonComponents/Loading/Loading";
import CreateTask from "@Components/CreateTask/CreateTask";
import TodoList from "@Components/TodoList/TodoList";
import { AppDispatch } from "@Store/store";
import { fetchTodos } from "@Store/thunk/todos";
import { IFilter, FilterValue } from "@Types/filter";
import { ERoutes } from "@Types/routes";

const Main: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuth, user, isLoading } = useAuth();

  const [filter, setFilter] = useState<IFilter>({
    filterValue: FilterValue.ALL,
    searchValue: "",
  });

  useEffect(() => {
    if (!isAuth) {
      navigate(ERoutes.AUTH);
    }
  });

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchTodos(user.token));
    }
  }, []);

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
