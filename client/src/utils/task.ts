import { DatesDelay } from "@Types/dates";
import { FilterValue } from "@Types/filter";
import { INewTaskData, ITask } from "@Types/task";
import { getCorrectDateStr } from "@Utils/date";

export const createNewTask = (
  title: string,
  createdDate = getCorrectDateStr(),
  expiredDate = getCorrectDateStr(DatesDelay.ONE_DAY_AFTER)
): INewTaskData => {
  return { title, createdDate, expiredDate };
};

export const getInvalidSymError = (sym: string): string => {
  const specSymRegex = /[#$%^&*{}`|<>]/g;

  if (specSymRegex.test(sym)) {
    return '"#$%^&*{}`|<>" - symbols not available';
  }
  return "";
};

export const getFilteredList = (
  todoList: ITask[],
  filter: FilterValue
): ITask[] => {
  let filteredList = [];

  switch (filter) {
    case FilterValue.ACTIVE:
      filteredList = todoList.filter((task) => !task.completed);
      break;
    case FilterValue.COMPLETED:
      filteredList = todoList.filter((task) => task.completed);
      break;
    default:
      filteredList = todoList;
      break;
  }
  return filteredList;
};

export const getIsCompletedExist = (todoList: ITask[]): boolean => {
  const completedList = todoList.filter((item) => item.completed);
  return !!completedList.length;
};
