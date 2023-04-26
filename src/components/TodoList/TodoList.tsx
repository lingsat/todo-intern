import React, { FC } from "react";
import { useSelector } from "react-redux";

const TodoList: FC = () => {
  const todoList = useSelector((state) => state);
  console.log(todoList);

  return <div>TodoList</div>;
};

export default TodoList;
