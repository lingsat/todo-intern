export enum COURSES_ACTIONS {
  ADD_TASK = "ADD_TASK",
  DELETE_TASK = "DELETE_TASK",
}

export interface IAction {
  type: COURSES_ACTIONS;
  payload?: any;
}
