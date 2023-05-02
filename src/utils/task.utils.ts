import { getCurrentDateStr, getNextDateStr } from "./date.utils";
import { ITask } from "../types/task.interface";
import { FilterValue } from "../types/filter.type";

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
) => {
  let filteredList = todoList;
  switch (filterValue) {
    case "active":
      filteredList = todoList.filter((item) => !item.completed);
      break;

    case "completed":
      filteredList = todoList.filter((item) => item.completed);
      break;

    default:
      break;
  }
  return filteredList;
};
