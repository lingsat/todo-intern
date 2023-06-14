import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { createApiInstance } from "@/services/api";
import { INewTaskRequest } from "@Types/request";
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
      const todosApi = createApiInstance(token);
      const response = await todosApi.post<ITask>("/task", newTask);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);
