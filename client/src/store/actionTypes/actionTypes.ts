import { ITask } from "@Types/task";

export enum TodoActionTypes {
  ADD_TASK = "task/add",
  TOGGLE_COMPLETE = "task/complete",
  DELETE_TASK = "task/delete",
  EDIT_TASK = "task/edit",
  CLEAR_COMPLETED = "task/clear_completed",
}

export interface IAction {
  type: string;
  payload: ITask | string;
}
