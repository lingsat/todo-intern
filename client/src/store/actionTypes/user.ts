import { IUser } from "@Types/user";

export enum UserActionTypes {
  REGISTER = "user/register",
  LOG_IN = "user/login",
  LOG_OUT = "user/logout",
}

export interface IUserAction {
  type: string;
  payload: IUser;
}
