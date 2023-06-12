import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITask } from "@Types/task";

import { RootState } from "../store";

export interface ITodosState {
  todos: ITask[];
}

const initialState: ITodosState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      state.todos.push(action.payload);
    },
    toggleComplete(state, action: PayloadAction<string>) {
      state.todos = state.todos.map((task) => {
        return task.id !== action.payload
          ? task
          : { ...task, completed: !task.completed };
      });
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((task) => task.id !== action.payload);
    },
    editTask(state, action: PayloadAction<ITask>) {
      const editedTask = action.payload;
      state.todos = state.todos.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((task) => !task.completed);
    },
  },
});

export const { addTask, toggleComplete, deleteTask, editTask, clearCompleted } =
  todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;
