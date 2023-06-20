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
import { FilterValue } from "@Types/filter";
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
  query: { search: "", filter: FilterValue.ALL },
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.query.search = action.payload;
    },
    setFilter(state, action: PayloadAction<FilterValue>) {
      state.query.filter = action.payload;
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
      state.allTodosExist = true;
      state.query = { search: "", filter: FilterValue.ALL };
    });
    builder.addCase(fetchEditTask.fulfilled, (state, action) => {
      const updatedTask = action.payload;
      state.todos = state.todos
        .map((task) => (task._id === updatedTask._id ? updatedTask : task))
        .filter(
          (task) =>
            (task.completed && state.query.filter === FilterValue.COMPLETED) ||
            (!task.completed && state.query.filter === FilterValue.ACTIVE) ||
            state.query.filter === FilterValue.ALL
        );
    });
    builder.addCase(fetchDeleteTask.fulfilled, (state, action) => {
      const { taskId, data } = action.payload;
      state.todos = state.todos.filter((task) => task._id !== taskId);
      state.allTodosExist = data.userTasksExist;
      toast.success(data.message);
    });
    builder.addCase(fetchDeleteCompleted.fulfilled, (state, action) => {
      const { userTasksExist, message } = action.payload;
      state.todos = state.todos.filter((task) => !task.completed);
      state.allTodosExist = userTasksExist;
      state.query = { search: "", filter: FilterValue.ALL };
      toast.success(message);
    });
  },
});

export const { setSearch, setFilter } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;
