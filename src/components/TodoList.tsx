import { FC } from "react";
import { useSelector } from "react-redux";

interface TodoListProps {}

const TodoList: FC<TodoListProps> = () => {
  const state = useSelector((state) => state);
  console.log(state);

  return <div>TodoList</div>;
};

export default TodoList;
