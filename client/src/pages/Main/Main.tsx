import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import CreateTask from "@Components/CreateTask/CreateTask";
import TodoList from "@Components/TodoList/TodoList";
import { IFilter, FilterValue } from "@Types/filter";

const Main: FC = () => {
  const { isAuth } = useAuth();
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

  return (
    <>
      <CreateTask setFilter={setFilter} />
      <TodoList filter={filter} setFilter={setFilter} />
    </>
  );
};

export default Main;
