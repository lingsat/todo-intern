import React, { FC } from "react";
import { useDispatch } from "react-redux";
import Button from "../../common/components/Button/Button";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { FilterValue } from "../../types/filter.type";
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

  const changeFilterValue = (newValue: FilterValue) => {
    setFilterValue(newValue);
  };

  const handleDeleteCompleted = () => {
    if (confirm("Do you want to delete completed tasks?")) {
      dispatch({ type: TodoActionTypes.CLEAR_COMPLETED });
    }
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterControls}>
        <button
          className={`${styles.button} ${
            filterValue === "all" && styles.active
          }`}
          onClick={() => changeFilterValue("all")}>
          All
        </button>
        <button
          className={`${styles.button} ${
            filterValue === "active" && styles.active
          }`}
          onClick={() => changeFilterValue("active")}>
          Active
        </button>
        <button
          className={`${styles.button} ${
            filterValue === "completed" && styles.active
          }`}
          onClick={() => changeFilterValue("completed")}>
          Completed
        </button>
      </div>
      {isCompletedExist && (
        <div className={styles.filterDelete}>
          <Button
            text="Clear Completed"
            style="red"
            onClick={handleDeleteCompleted}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
