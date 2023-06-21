import { FilterValue } from "@Types/filter";

export interface IUserRequest {
  email: string;
  password: string;
}

export interface ITaskQuery {
  search: string;
  filter: FilterValue;
}
