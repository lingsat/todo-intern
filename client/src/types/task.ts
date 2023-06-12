export interface ITask {
  id: string;
  userId: string | null;
  title: string;
  createdDate: string;
  expiredDate: string;
  completed: boolean;
}
