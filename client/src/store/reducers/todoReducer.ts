import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { ITask } from "@Types/task";

import { RootState } from "../store";
import { fetchTodos } from "../thunk/todos";

export interface ITodosState {
  todos: ITask[];
  isLoading: boolean;
}

const initialState: ITodosState = {
  todos: [],
  isLoading: false,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      state.todos.unshift(action.payload);
    },
    toggleComplete(state, action: PayloadAction<string>) {
      state.todos = state.todos.map((task) => {
        return task._id !== action.payload
          ? task
          : { ...task, completed: !task.completed };
      });
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((task) => task._id !== action.payload);
    },
    editTask(state, action: PayloadAction<ITask>) {
      const editedTask = action.payload;
      state.todos = state.todos.map((task) =>
        task._id === editedTask._id ? editedTask : task
      );
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((task) => !task.completed);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      toast.warn(action.payload as string);
    });
  },
});

export const { addTask, toggleComplete, deleteTask, editTask, clearCompleted } =
  todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;
