import { ITask } from "@Types/task";

export interface IAuthRes {
  id: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface ITasksRes {
  userTasksExist: boolean;
  taskList: ITask[];
}

export interface IDeleteRes {
  userTasksExist: boolean;
  message: string;
}
