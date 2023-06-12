import { AnyAction } from "redux";

import { UserActionTypes } from "@Store/actionTypes/user";
import { IUser } from "@Types/user";

export const registerAction = (payload: IUser): AnyAction => ({
  type: UserActionTypes.REGISTER,
  payload,
});

export const loginAction = (payload: IUser): AnyAction => ({
  type: UserActionTypes.LOG_IN,
  payload,
});

export const logoutAction = (): AnyAction => ({
  type: UserActionTypes.LOG_OUT,
});
