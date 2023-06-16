import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { createApiInstance } from "@/services/api";
import { IUserRequest } from "@Types/request";
import { IAuthRes } from "@Types/response";
import { saveTokensToLocalStorage } from "@Utils/token";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: IUserRequest, { rejectWithValue }) => {
    try {
      const userApi = createApiInstance();
      const response = await userApi.post<IAuthRes>("user/register", userData);
      const { token, refreshToken, ...user } = response.data;
      saveTokensToLocalStorage(token, refreshToken);
      return user;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: IUserRequest, { rejectWithValue }) => {
    try {
      const userApi = createApiInstance();
      const response = await userApi.post<IAuthRes>("user/login", userData);
      const { token, refreshToken, ...user } = response.data;
      saveTokensToLocalStorage(token, refreshToken);
      return user;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data.message);
    }
  }
);
