import { DatesDelay } from "@Types/dates";
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

export const getIsCompletedExist = (todoList: ITask[]): boolean => {
  const completedList = todoList.filter((item) => item.completed);
  return !!completedList.length;
};
