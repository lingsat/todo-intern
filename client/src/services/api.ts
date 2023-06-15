import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

import { TOKEN_EXPIRED_STATUS, TOKEN_EXPIRED_MESSAGE } from "@/constants";
import { logOut } from "@Store/reducers/userReducer";

export const createApiInstance = (
  token?: string,
  dispatch?: ThunkDispatch<unknown, unknown, AnyAction>
): AxiosInstance => {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const apiInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers,
  });

  if (dispatch) {
    apiInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { data, status } = error.response;
        if (
          status === TOKEN_EXPIRED_STATUS &&
          data.message === TOKEN_EXPIRED_MESSAGE
        ) {
          dispatch(logOut());
          toast.warn("Your session has expired. Please Sign in again!");
        }
        return Promise.reject(error.response.data);
      }
    );
  }

  return apiInstance;
};
