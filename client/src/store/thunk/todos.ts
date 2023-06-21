import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { createApiInstance } from "@/services/api";
import { ITaskQuery } from "@Types/request";
import { IDeleteRes, ITasksRes } from "@Types/response";
import { INewTaskData, ITask } from "@Types/task";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (query: ITaskQuery, { rejectWithValue, dispatch }) => {
    try {
      const todosApi = createApiInstance(dispatch);
      const { data } = await todosApi.get<ITasksRes>("tasks", {
        params: { ...query },
      });
      return data;
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
      const { data } = await todosApi.post<ITask>("tasks", newTask);
      return data;
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
      const { data } = await todosApi.patch<ITask>(
        `tasks/${changedTask._id}`,
        changedTask
      );
      return data;
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
      const { data } = await todosApi.delete<IDeleteRes>(`tasks/${taskId}`);
      return { taskId, data };
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
      const { data } = await todosApi.delete<IDeleteRes>("tasks/completed");
      return data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);
