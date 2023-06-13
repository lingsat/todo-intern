import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { createApiInstance } from "@/services/api";
import { IUserRequest } from "@Types/request";
import { IUser } from "@Types/user";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: IUserRequest, { rejectWithValue }) => {
    try {
      const userApi = createApiInstance();
      const response = await userApi.post<IUser>("/user/login", userData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data.message);
    }
  }
);
