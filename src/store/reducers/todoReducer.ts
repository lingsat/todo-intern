import { ITask } from "../../types/task.interface";
import { TodoActionTypes } from "../actionTypes/actionTypes";

const initialState: ITask[] = [];

export const todoReducer = (
  state: ITask[] = initialState,
  action: { type: string; payload?: any }
): ITask[] => {
  const { type, payload } = action;
  switch (type) {
    case TodoActionTypes.ADD_TASK:
      return [payload, ...state];
    default:
      return state;
  }
};
