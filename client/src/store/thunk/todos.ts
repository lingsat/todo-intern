import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { createApiInstance } from "@/services/api";
import { ITaskQuery } from "@Types/request";
import { IDeleteRes, IEditRes, ITasksRes } from "@Types/response";
import { INewTaskData, ITask } from "@Types/task";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (query: ITaskQuery, { rejectWithValue, dispatch }) => {
    try {
      const todosApi = createApiInstance(dispatch);
      const response = await todosApi.get<ITasksRes>("tasks", {
        params: { ...query },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchAddTask = createAsyncThunk(
  "todos/fetchAddTask",
  async (newTask: INewTaskData, { rejectWithValue, dispatch }) => {
    try {
      const todosApi = createApiInstance(dispatch);
      const response = await todosApi.post<ITask>("tasks", newTask);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchEditTask = createAsyncThunk(
  "todos/fetchEditTask",
  async (changedTask: ITask, { rejectWithValue, dispatch }) => {
    try {
      const todosApi = createApiInstance(dispatch);
      const response = await todosApi.patch<IEditRes>(
        `tasks/${changedTask._id}`,
        changedTask
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchDeleteTask = createAsyncThunk(
  "todos/fetchDeleteTask",
  async (taskId: string, { rejectWithValue, dispatch }) => {
    try {
      const todosApi = createApiInstance(dispatch);
      const resp = await todosApi.delete<IDeleteRes>(`tasks/${taskId}`);
      return { taskId, data: resp.data };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchDeleteCompleted = createAsyncThunk(
  "todos/fetchDeleteCompleted",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const todosApi = createApiInstance(dispatch);
      const resp = await todosApi.delete<IDeleteRes>("tasks/completed");
      return resp.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);
