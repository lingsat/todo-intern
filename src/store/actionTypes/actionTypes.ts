import { ITask } from "../../types/task.interface";

export enum TodoActionTypes {
  ADD_TASK = "task/add",
  TOGGLE_COMPLETE = "task/complete",
  DELETE_TASK = "task/delete",
  EDIT_TASK = "task/edit",
}

export interface IAction {
  type: string;
  payload: ITask | string;
}
