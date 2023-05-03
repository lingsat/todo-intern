import { getCurrentDateStr, getNextDateStr } from "./date.utils";
import { ITask } from "../types/task.interface";
import { FilterValue } from "../types/filter";

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
  filterValue: FilterValue,
  searchValue: string
): ITask[] => {
  let filteredList = [];
  const formatedSearchValue = searchValue.toLowerCase().trim();

  switch (filterValue) {
    case FilterValue.ACTIVE:
      filteredList = todoList.filter((item) => {
        const isSearchValid = item.title
          .toLowerCase()
          .includes(formatedSearchValue);
        if (!item.completed && isSearchValid) return item;
      });
      break;
    case FilterValue.COMPLETED:
      filteredList = todoList.filter((item) => {
        const isSearchValid = item.title
          .toLowerCase()
          .includes(formatedSearchValue);
        if (item.completed && isSearchValid) return item;
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
