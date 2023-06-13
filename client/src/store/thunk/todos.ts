import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { createApiInstance } from "@/services/api";
import { INewTaskRequest } from "@/types/request";
import { ITask } from "@Types/task";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (token: string, { rejectWithValue }) => {
    try {
      const todosApi = createApiInstance(token);
      const response = await todosApi.get<ITask[]>("/task");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchAddTask = createAsyncThunk(
  "todos/fetchAddTask",
  async (addTaskData: INewTaskRequest, { rejectWithValue }) => {
    const { token, newTask } = addTaskData;
    try {
      const response = await axios.post<ITask>(
        `${process.env.REACT_APP_API_URL}/task`,
        newTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);
