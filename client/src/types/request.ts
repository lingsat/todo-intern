import { INewTaskData, ITask } from "./task";

export interface IUserRequest {
  email: string;
  password: string;
}

export interface INewTaskRequest {
  token: string;
  newTask: INewTaskData;
}

export interface IEditTaskRequest {
  token: string;
  changedTask: ITask;
}
