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

    default:
      return state;
  }
};
