import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { RootState } from "@Store/store";
import {
  fetchAddTask,
  fetchDeleteCompleted,
  fetchDeleteTask,
  fetchEditTask,
  fetchTodos,
} from "@Store/thunk/todos";
import { ITaskQuery } from "@Types/request";
import { ITask } from "@Types/task";

export interface ITodosState {
  todos: ITask[];
  isLoading: boolean;
  allTodosExist: boolean;
  query: ITaskQuery;
}

const initialState: ITodosState = {
  todos: [],
  isLoading: false,
  allTodosExist: false,
  query: { search: "" },
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.query.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      const { userTasksExist, taskList } = action.payload;
      state.todos = taskList.reverse();
      state.allTodosExist = userTasksExist;
      state.isLoading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      toast.warn(action.payload as string);
    });
    builder.addCase(fetchAddTask.fulfilled, (state, action) => {
      state.todos.unshift(action.payload);
      state.query.search = "";
    });
    builder.addCase(fetchEditTask.fulfilled, (state, action) => {
      const changedTask = action.payload;
      state.todos = state.todos.map((task) =>
        task._id === changedTask._id ? changedTask : task
      );
    });
    builder.addCase(fetchDeleteTask.fulfilled, (state, action) => {
      const { taskId, message } = action.payload;
      state.todos = state.todos.filter((task) => task._id !== taskId);
      toast.success(message);
    });
    builder.addCase(fetchDeleteCompleted.fulfilled, (state, action) => {
      toast.success(action.payload);
      state.todos = state.todos.filter((task) => !task.completed);
      state.query.search = "";
    });
  },
});

export const { setSearch } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;
