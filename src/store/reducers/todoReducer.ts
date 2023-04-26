import { COURSES_ACTIONS, IAction } from "../actionTypes/actionTypes";
import { ITask } from "../../types/task.interface";

const initialState: ITask[] = [];

export const todoReducer = (
  state: ITask[] = initialState,
  action: IAction
): ITask[] => {
  const { type, payload } = action;

  switch (type) {
    case COURSES_ACTIONS.ADD_TASK:
      return [...payload, ...state];
    case COURSES_ACTIONS.DELETE_TASK:
      return [...state.filter((task: ITask) => task.id !== payload)];
    default:
      return state;
  }
};
