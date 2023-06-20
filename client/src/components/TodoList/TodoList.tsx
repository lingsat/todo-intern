import { FC, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import { MARGIN_PAGES, PAGE_RANGE } from "@/constants";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Loading from "@CommonComponents/Loading/Loading";
import Filter from "@Components/Filter/Filter";
import TodoItem from "@Components/TodoItem/TodoItem";
import { selectTodos } from "@Store/reducers/todoReducer";
import { getPaginatedData } from "@Utils/pagination";

import styles from "./TodoList.module.scss";

const TodoList: FC = () => {
  const { todos, isLoading, allTodosExist, query } = useSelector(selectTodos);
  const width = useWindowWidth();

  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState<number>(0);

  const { currentTodos, tasksPerPage, pageCount } = getPaginatedData(
    todos,
    width,
    itemOffset
  );
  const showPagination = pageCount > 1;

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * tasksPerPage) % todos.length;
    setPage(event.selected);
    setItemOffset(newOffset);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [itemOffset]);

  useEffect(() => {
    setPage(0);
    setItemOffset(0);
  }, [query.search, query.filter]);

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
      {showPagination && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="&#65310;"
          onPageChange={handlePageClick}
          pageRangeDisplayed={PAGE_RANGE}
          marginPagesDisplayed={MARGIN_PAGES}
          forcePage={page}
          pageCount={pageCount}
          previousLabel="&#65308;"
          renderOnZeroPageCount={null}
          containerClassName={styles.pagination}
          pageLinkClassName={styles.link}
          previousLinkClassName={styles.link}
          nextLinkClassName={styles.link}
          activeLinkClassName={styles.active}
          disabledLinkClassName={styles.disabled}
        />
      )}
    </>
  );
};

export default TodoList;
