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
  filterValue: FilterValue
): ITask[] => {
  let filteredList = todoList;
  switch (filterValue) {
    case FilterValue.ACTIVE:
      filteredList = todoList.filter((item) => !item.completed);
      break;
    case FilterValue.COMPLETED:
      filteredList = todoList.filter((item) => item.completed);
      break;
    default:
      break;
  }
  return filteredList;
};

export const getIsCompletedExist = (todoList: ITask[]): boolean => {
  const completedList = todoList.filter((item) => item.completed);
  return !!completedList.length;
};
