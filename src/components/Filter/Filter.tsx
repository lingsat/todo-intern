import React, { FC } from "react";
import Button from "../../common/components/Button/Button";
import { FilterValue } from "../../types/filter.type";
import styles from "./Filter.module.scss";

interface FilterProps {
  filterValue: FilterValue;
  setFilterValue: (arg: FilterValue) => void;
}

const Filter: FC<FilterProps> = ({ filterValue, setFilterValue }) => {
  const changeFilterValue = (newValue: FilterValue) => {
    setFilterValue(newValue);
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
      <div className={styles.filterDelete}>
        <Button text="Clear Completed" style="red" />
      </div>
    </div>
  );
};

export default Filter;
