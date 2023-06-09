import { FC, useState } from "react";

import CreateTask from "@Components/CreateTask/CreateTask";
import TodoList from "@Components/TodoList/TodoList";
import { IFilter, FilterValue } from "@Types/filter";

const Main: FC = () => {
  const [filter, setFilter] = useState<IFilter>({
    filterValue: FilterValue.ALL,
    searchValue: "",
  });

  return (
    <>
      <CreateTask setFilter={setFilter} />
      <TodoList filter={filter} setFilter={setFilter} />
    </>
  );
};

export default Main;
