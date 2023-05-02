import { ITask } from "../../types/task.interface";
import { IAction, TodoActionTypes } from "../actionTypes/actionTypes";
import { ITodos } from "../types/todos.interface";

const initialState: ITodos = {
  todos: [],
};

export const todoReducer = (
  state: ITodos = initialState,
  action: IAction
): ITodos => {
  const { type, payload } = action;
  switch (type) {
    case TodoActionTypes.ADD_TASK:
      return { todos: [payload as ITask, ...state.todos] };

    case TodoActionTypes.TOGGLE_COMPLETE: {
      const toggledList = state.todos.map((task) => {
        return task.id !== payload
          ? task
          : { ...task, completed: !task.completed };
      });
      return { todos: toggledList };
    }

    case TodoActionTypes.DELETE_TASK: {
      const filteredList = state.todos.filter((task) => task.id !== payload);
      return { todos: filteredList };
    }

    case TodoActionTypes.EDIT_TASK: {
      const editedTask = payload as ITask;
      const changedList = state.todos.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );
      return { todos: changedList };
    }

    case TodoActionTypes.CLEAR_COMPLETED: {
      const filteredList = state.todos.filter((task) => !task.completed);
      return { todos: filteredList };
    }

    default:
      return state;
  }
};
