import { getCurrentDateStr, getNextDateStr } from "./date.utils";
import { ITask } from "../types/task.interface";

export const createNewTask = (
  title: string,
  id = crypto.randomUUID(),
  createdDate = getCurrentDateStr(),
  expiredDate = getNextDateStr(),
  completed = false
): ITask => {
  return { id, title, createdDate, expiredDate, completed };
};
