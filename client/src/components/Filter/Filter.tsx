import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { ThemeContext } from "@/App";
import Input from "@CommonComponents/Input/Input";
import { TodoActionTypes } from "@Store/actionTypes/todo";
import { FilterValue, IFilter } from "@Types/filter";

import closeIcon from "@Images/close.svg";

import styles from "./Filter.module.scss";

const filterBtnArr = Object.values(FilterValue);

interface FilterProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  isCompletedExist: boolean;
}

const Filter: FC<FilterProps> = ({ filter, setFilter, isCompletedExist }) => {
  const { lightMode } = useContext(ThemeContext);

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
        {localSearchValue && (
          <img
            className={styles.icon}
            src={closeIcon}
            alt="Close"
            onClick={clearSearchValue}
          />
        )}
      </div>
      <div className={styles.filterControls}>
        {filterBtnArr.map((btnText) => (
          <button
            key={`btn-${btnText}`}
            className={`${styles.filterButton} ${
              filter.filterValue === btnText && styles.active
            }`}
            onClick={changeFilterValue(btnText)}>
            {btnText}
          </button>
        ))}
      </div>
      {isCompletedExist && (
        <button
          className={`${styles.deleteButton} ${!lightMode && styles.dark}`}
          onClick={handleDeleteCompleted}>
          Clear Completed
        </button>
      )}
    </div>
  );
};

export default Filter;
