import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../../common/components/Input/Input";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { FilterValue, IFilter } from "../../types/filter";
import closeIcon from "../../assets/images/close.svg";
import styles from "./Filter.module.scss";

interface FilterProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  isCompletedExist: boolean;
}

const Filter: FC<FilterProps> = ({ filter, setFilter, isCompletedExist }) => {
  const [localSearchValue, setLocalSearchValue] = useState<string>(
    filter.searchValue
  );

  const dispatch = useDispatch();

  const changeFilterValue = (newValue: FilterValue) => () => {
    setFilter((prevValue) => ({ ...prevValue, filterValue: newValue }));
  };

  const changeLocalSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(event.target.value);
  };

  const startSearching = () => {
    setFilter((prevValue) => ({ ...prevValue, searchValue: localSearchValue }));
  };

  const handleDeleteCompleted = () => {
    if (confirm("Do you want to delete completed tasks?")) {
      dispatch({ type: TodoActionTypes.CLEAR_COMPLETED });
      setFilter({ filterValue: FilterValue.ALL, searchValue: "" });
    }
  };

  const clearSearchValue = () => {
    setFilter((prevValue) => ({ ...prevValue, searchValue: "" }));
  };

  useEffect(() => {
    const debounceTimer = setTimeout(startSearching, 250);
    return () => clearTimeout(debounceTimer);
  }, [localSearchValue]);

  useEffect(() => {
    setLocalSearchValue(filter.searchValue);
  }, [filter.searchValue]);

  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <Input
          value={localSearchValue}
          onChange={changeLocalSearchValue}
          placeholder="Search..."
        />
        {filter.searchValue && (
          <img
            className={styles.icon}
            src={closeIcon}
            alt="Close"
            onClick={clearSearchValue}
          />
        )}
      </div>
      <div className={styles.filterControls}>
        <button
          className={`${styles.filterButton} ${
            filter.filterValue === FilterValue.ALL && styles.active
          }`}
          onClick={changeFilterValue(FilterValue.ALL)}>
          All
        </button>
        <button
          className={`${styles.filterButton} ${
            filter.filterValue === FilterValue.ACTIVE && styles.active
          }`}
          onClick={changeFilterValue(FilterValue.ACTIVE)}>
          Active
        </button>
        <button
          className={`${styles.filterButton} ${
            filter.filterValue === FilterValue.COMPLETED && styles.active
          }`}
          onClick={changeFilterValue(FilterValue.COMPLETED)}>
          Completed
        </button>
      </div>
      {isCompletedExist && (
        <div className={styles.filterDelete}>
          <button
            className={styles.deleteButton}
            onClick={handleDeleteCompleted}>
            Clear Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
