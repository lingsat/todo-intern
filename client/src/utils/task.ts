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

export const getUpdatedTodos = (
  todos: ITask[],
  updatedTask: ITask,
  currentFilter: FilterValue
): ITask[] => {
  return todos
    .map((task) => (task._id === updatedTask._id ? updatedTask : task))
    .filter(
      (task) =>
        (task.completed && currentFilter === FilterValue.COMPLETED) ||
        (!task.completed && currentFilter === FilterValue.ACTIVE) ||
        currentFilter === FilterValue.ALL
    );
};
