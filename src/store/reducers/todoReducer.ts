import { ITask } from "../../types/task.interface";
import { IAction, TodoActionTypes } from "../actionTypes/actionTypes";

const initialState: ITask[] = [];

export const todoReducer = (
  state: ITask[] = initialState,
  action: IAction
): ITask[] => {
  const { type, payload } = action;
  switch (type) {
    case TodoActionTypes.ADD_TASK:
      return [payload as ITask, ...state];

    case TodoActionTypes.TOGGLE_COMPLETE:
      return state.map((task) => {
        return task.id !== payload
          ? task
          : { ...task, completed: !task.completed };
      });

    case TodoActionTypes.DELETE_TASK:
      return state.filter((task) => task.id !== payload);

    case TodoActionTypes.EDIT_TASK: {
      const editedTask = payload as ITask;
      return state.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );
    }

    default:
      return state;
  }
};
