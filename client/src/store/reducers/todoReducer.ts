import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { RootState } from "@Store/store";
import { fetchAddTask, fetchEditTask, fetchTodos } from "@Store/thunk/todos";
import { ITask } from "@Types/task";

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
    deleteTask(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((task) => task._id !== action.payload);
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
      state.todos = action.payload.reverse();
      state.isLoading = false;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      toast.warn(action.payload as string);
    });
    builder.addCase(fetchAddTask.fulfilled, (state, action) => {
      state.todos.unshift(action.payload);
    });
    builder.addCase(fetchEditTask.fulfilled, (state, action) => {
      const changedTask = action.payload;
      state.todos = state.todos.map((task) =>
        task._id === changedTask._id ? changedTask : task
      );
    });
  },
});

export const { deleteTask, clearCompleted } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;
