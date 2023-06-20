import { FC, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import { TASKS_PER_PAGE } from "@/constants";
import Loading from "@CommonComponents/Loading/Loading";
import Filter from "@Components/Filter/Filter";
import TodoItem from "@Components/TodoItem/TodoItem";
import { selectTodos } from "@Store/reducers/todoReducer";

import styles from "./TodoList.module.scss";

const TodoList: FC = () => {
  const { todos, isLoading, allTodosExist, query } = useSelector(selectTodos);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + TASKS_PER_PAGE;
  const currentTodos = todos.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(todos.length / TASKS_PER_PAGE);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * TASKS_PER_PAGE) % todos.length;
    setItemOffset(newOffset);
  };

  if (!allTodosExist) {
    return <p className={styles.message}>No items found! Create new one.</p>;
  }

  return (
    <>
      <Filter />
      {!todos.length && (
        <p className={styles.message}>
          No tasks found - among &quot;{query.filter}&quot;
        </p>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <ul className={styles.list}>
          {currentTodos.map((task) => (
            <TodoItem key={task._id} task={task} />
          ))}
        </ul>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default TodoList;
