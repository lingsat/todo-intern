import { ITask } from "./task";

export interface IAuthRes {
  id: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface ITasksRes {
  userTasksExist: boolean;
  isCompletedExist: boolean;
  taskList: ITask[];
}
export interface IEditRes {
  isCompletedExist: boolean;
  updatedTask: ITask;
}

export interface IDeleteRes {
  userTasksExist: boolean;
  isCompletedExist: boolean;
  message: string;
}
