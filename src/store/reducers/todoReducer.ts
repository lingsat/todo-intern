import { ITask } from "../../types/task.interface";

const initialState: ITask[] = [];

export const todoReducer = (
  state: ITask[] = initialState,
  action: { type: string }
): ITask[] => {
  switch (action.type) {
    default:
      return state;
  }
};
