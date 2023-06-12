import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";

import { loginAction, registerAction } from "@Store/actionCreators.ts/user";
import { IUserRequest } from "@Types/request";
import { IUser } from "@Types/user";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerAsyncAction = (newUser: IUserRequest) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<IUser>(
        `${process.env.REACT_APP_API_URL}/user/register`,
        newUser,
        axiosConfig
      );
      dispatch(registerAction(response.data));
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
};

export const loginAsyncAction = (userData: IUserRequest) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<IUser>(
        `${process.env.REACT_APP_API_URL}/user/login`,
        userData,
        axiosConfig
      );
      dispatch(loginAction(response.data));
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
};
