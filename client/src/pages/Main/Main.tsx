import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { AppDispatch } from "@/store/store";
import Loading from "@CommonComponents/Loading/Loading";
import CreateTask from "@Components/CreateTask/CreateTask";
import TodoList from "@Components/TodoList/TodoList";
import { fetchTodos } from "@Store/thunk/todos";
import { IFilter, FilterValue } from "@Types/filter";

const Main: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<IFilter>({
    filterValue: FilterValue.ALL,
    searchValue: "",
  });

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth");
    }
  });

  useEffect(() => {
    dispatch(fetchTodos(user.token));
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
