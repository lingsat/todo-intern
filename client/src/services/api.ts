import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

import {
  TOKEN_EXPIRED_STATUS,
  TOKEN_EXPIRED_MESSAGE,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_REFRESH,
} from "@/constants";
import { logOut } from "@Store/reducers/userReducer";
import { ITokens } from "@Types/token";
import {
  clearTokens,
  getTokenFromLocalStorage,
  saveTokensToLocalStorage,
} from "@Utils/token";

const getNewTokens = async () => {
  const refreshToken = getTokenFromLocalStorage(LOCAL_STORAGE_REFRESH);
  const customFetch = createApiInstance();
  const response = await customFetch.post<ITokens>("user/refresh", {
    refreshToken,
  });
  return response.data;
};

export const createApiInstance = (
  dispatch?: ThunkDispatch<unknown, unknown, AnyAction>
): AxiosInstance => {
  const apiInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { "Content-Type": "application/json" },
  });

  apiInstance.interceptors.request.use(
    async (config) => {
      const token = getTokenFromLocalStorage(LOCAL_STORAGE_TOKEN);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error.response.data)
  );

  if (dispatch) {
    apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const { data, status } = error.response;
        const isTokenExpiredError =
          status === TOKEN_EXPIRED_STATUS &&
          data.message === TOKEN_EXPIRED_MESSAGE;

        if (isTokenExpiredError && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const { token, refreshToken } = await getNewTokens();
            saveTokensToLocalStorage(token, refreshToken);
            apiInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
            return apiInstance(originalRequest);
          } catch (refreshError) {
            dispatch(logOut());
            clearTokens();
            toast.warn("Your session has expired. Please Sign in again!");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error.response.data);
      }
    );
  }

  return apiInstance;
};
