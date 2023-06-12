import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IUserRequest } from "@Types/request";
import { IUser } from "@Types/user";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: IUserRequest) => {
    const response = await axios.post<IUser>(
      `${process.env.REACT_APP_API_URL}/user/login`,
      userData,
      axiosConfig
    );

    return response.data;
  }
);
