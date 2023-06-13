import { INewTaskData } from "./task";

export interface IUserRequest {
  email: string;
  password: string;
}

export interface INewTaskRequest {
  token: string;
  newTask: INewTaskData;
}
