import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { IUserRequest } from "@Types/request";
import { IUser } from "@Types/user";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: IUserRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<IUser>(
        `${process.env.REACT_APP_API_URL}/user/login`,
        userData,
        axiosConfig
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);
