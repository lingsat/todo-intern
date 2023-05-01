import { ITask } from "../../types/task.interface";

export enum TodoActionTypes {
  ADD_TASK = "task/add",
  TOGGLE_COMPLETE = "task/complete",
  DELETE_TASK = "task/delete",
}

export interface IAction {
  type: string;
  payload: ITask | string;
}
