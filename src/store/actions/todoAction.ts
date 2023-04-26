import { ITask } from "../../types/task.interface";
import { COURSES_ACTIONS } from "../actionTypes/actionTypes";

const addTask = (payload: ITask) => {
  return {
    type: COURSES_ACTIONS.ADD_TASK,
    payload,
  };
};

const deleteTask = (payload: string) => {
  return {
    type: COURSES_ACTIONS.DELETE_TASK,
    payload,
  };
};

export { addTask, deleteTask };
