import { COURSES_ACTIONS } from "../actionTypes/actionTypes";
import { ITask } from "../../types/task.interface";

const initialState: ITask[] = [
  // {
  //   id: "qwert1234",
  //   title: "New Task",
  //   createDate: new Date(),
  //   expiredData: new Date(),
  //   completed: false,
  // },
];

export const todoReducer = (
  state: ITask[] = initialState,
  action: { type: COURSES_ACTIONS; payload?: any }
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
