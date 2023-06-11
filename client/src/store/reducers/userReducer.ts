import { IUserAction, UserActionTypes } from "@Store/actionTypes/user";
import { IUser } from "@Types/user";

export interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

export const userReducer = (
  state: IUserState = initialState,
  action: IUserAction
): IUserState => {
  const { type, payload } = action;
  switch (type) {
    case UserActionTypes.REGISTER:
      return { ...state, user: payload };

    case UserActionTypes.LOG_IN:
      return { ...state, user: payload };

    case UserActionTypes.LOG_OUT:
      return { ...state, user: null };

    default:
      return state;
  }
};
