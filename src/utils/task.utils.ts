import { getCurrentDateStr, getNextDateStr } from "./date.utils";
import { ITask } from "../types/task.interface";
import { FilterValue, IFilter } from "../types/filter";

export const createNewTask = (
  title: string,
  id = crypto.randomUUID(),
  createdDate = getCurrentDateStr(),
  expiredDate = getNextDateStr(),
  completed = false
): ITask => {
  return { id, title, createdDate, expiredDate, completed };
};

export const getFilteredList = (
  todoList: ITask[],
  filter: IFilter
): ITask[] => {
  let filteredList = [];
  const formatedSearchValue = filter.searchValue.toLowerCase().trim();

  switch (filter.filterValue) {
    case FilterValue.ACTIVE:
      filteredList = todoList.filter((item) => {
        const checkSearchValue = item.title
          .toLowerCase()
          .includes(formatedSearchValue);
        if (!item.completed && checkSearchValue) return item;
      });
      break;
    case FilterValue.COMPLETED:
      filteredList = todoList.filter((item) => {
        const checkSearchValue = item.title
          .toLowerCase()
          .includes(formatedSearchValue);
        if (item.completed && checkSearchValue) return item;
      });
      break;
    default:
      filteredList = todoList.filter((item) =>
        item.title.toLowerCase().includes(formatedSearchValue)
      );
      break;
  }
  return filteredList;
};

export const getIsCompletedExist = (todoList: ITask[]): boolean => {
  const completedList = todoList.filter((item) => item.completed);
  return !!completedList.length;
};
