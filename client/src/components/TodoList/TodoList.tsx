import { FC, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

import { MARGIN_PAGES, PAGE_RANGE } from "@/constants";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import Loading from "@CommonComponents/Loading/Loading";
import Filter from "@Components/Filter/Filter";
import TodoItem from "@Components/TodoItem/TodoItem";
import { selectTodos, setCurrentPage } from "@Store/reducers/todoReducer";
import { getPaginatedData } from "@Utils/pagination";

import styles from "./TodoList.module.scss";

const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading, allTodosExist, query, currentPage } =
    useSelector(selectTodos);
  const width = useWindowWidth();

  const { currentTodos, pageCount } = getPaginatedData(
    todos,
    width,
    currentPage
  );

  const handlePageClick = (event: { selected: number }) => {
    dispatch(setCurrentPage(event.selected));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  useEffect(() => {
    if (!currentTodos.length) {
      dispatch(setCurrentPage(0));
    }
  });

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
        nextLabel="&#65310;"
        onPageChange={handlePageClick}
        pageRangeDisplayed={PAGE_RANGE}
        marginPagesDisplayed={MARGIN_PAGES}
        forcePage={currentPage}
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
    </>
  );
};

export default TodoList;
