import React, { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import Input from "../../common/components/Input/Input";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { FilterValue } from "../../types/filter";
import closeIcon from "../../assets/images/close.svg";
import styles from "./Filter.module.scss";

interface FilterProps {
  filterValue: FilterValue;
  setFilterValue: (arg: FilterValue) => void;
  isCompletedExist: boolean;
}

const Filter: FC<FilterProps> = ({
  filterValue,
  setFilterValue,
  isCompletedExist,
}) => {
  const dispatch = useDispatch();

  const changeFilterValue = (newValue: FilterValue) => () => {
    setFilterValue(newValue);
  };

  const handleDeleteCompleted = () => {
    if (confirm("Do you want to delete completed tasks?")) {
      dispatch({ type: TodoActionTypes.CLEAR_COMPLETED });
      setFilterValue(FilterValue.ALL);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <Input value="" onChange={handleSearchChange} placeholder="Search..." />
        <img className={styles.icon} src={closeIcon} alt="Close" />
      </div>
      <div className={styles.filterControls}>
        <button
          className={`${styles.filterButton} ${
            filterValue === FilterValue.ALL && styles.active
          }`}
          onClick={changeFilterValue(FilterValue.ALL)}>
          All
        </button>
        <button
          className={`${styles.filterButton} ${
            filterValue === FilterValue.ACTIVE && styles.active
          }`}
          onClick={changeFilterValue(FilterValue.ACTIVE)}>
          Active
        </button>
        <button
          className={`${styles.filterButton} ${
            filterValue === FilterValue.COMPLETED && styles.active
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
