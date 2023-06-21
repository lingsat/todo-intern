import {
  PAGINATION_BREAKPOINT,
  TASKS_PER_PAGE_DESKTOP,
  TASKS_PER_PAGE_TABLET,
} from "@/constants";
import { ITask } from "@Types/task";

export const getPaginatedData = (
  todos: ITask[],
  windowWidth: number,
  currentPage: number
) => {
  const tasksPerPage =
    windowWidth > PAGINATION_BREAKPOINT
      ? TASKS_PER_PAGE_DESKTOP
      : TASKS_PER_PAGE_TABLET;
  const startIndex = currentPage * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTodos = todos.slice(startIndex, endIndex);
  const pageCount = Math.ceil(todos.length / tasksPerPage);

  return { currentTodos, pageCount };
};
