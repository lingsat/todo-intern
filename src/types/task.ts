export interface ITask {
  id: string;
  title: string;
  createdDate: string;
  expiredDate: string;
  completed: boolean;
}

export interface ITodos {
  todos: ITask[];
}
