export interface ITask {
  _id: string;
  userId: string | null;
  title: string;
  createdDate: string;
  expiredDate: string;
  completed: boolean;
}

export interface INewTaskData {
  title: string;
  createdDate: string;
  expiredDate: string;
}
