import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { createApiInstance } from "@/services/api";
import { INewTaskData, ITask } from "@Types/task";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const todosApi = createApiInstance(dispatch);
      const response = await todosApi.get<ITask[]>("task");
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
      const response = await todosApi.post<ITask>("task", newTask);
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
      const response = await todosApi.patch<ITask>(
        `task/${changedTask._id}`,
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
      const resp = await todosApi.delete(`task/${taskId}`);
      return { taskId, message: resp.data.message };
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
      const resp = await todosApi.delete("task/completed");
      return resp.data.message;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data);
    }
  }
);
