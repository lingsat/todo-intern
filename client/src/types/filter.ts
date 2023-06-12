export enum FilterValue {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

export interface IFilter {
  filterValue: FilterValue;
  searchValue: string;
}
