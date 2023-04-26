import React, { FC } from "react";
import { useSelector } from "react-redux";

const TodoList: FC = () => {
  const state = useSelector((state) => state);
  console.log(state);

  return <div>TodoList</div>;
};

export default TodoList;
