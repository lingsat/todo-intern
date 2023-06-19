import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ThemeContext } from "@/App";
import { DEBOUNCE_TIME } from "@/constants";
import Input from "@CommonComponents/Input/Input";
import { selectTodos, setSearch } from "@Store/reducers/todoReducer";
import { AppDispatch } from "@Store/store";
import { fetchDeleteCompleted } from "@Store/thunk/todos";
import { FilterValue } from "@Types/filter";

import closeIcon from "@Images/close.svg";

import styles from "./Filter.module.scss";

const filterBtnArr = Object.values(FilterValue);

interface FilterProps {
  filter: FilterValue;
  setFilter: React.Dispatch<React.SetStateAction<FilterValue>>;
  isCompletedExist: boolean;
}

const Filter: FC<FilterProps> = ({ filter, setFilter, isCompletedExist }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lightMode } = useContext(ThemeContext);
  const { query } = useSelector(selectTodos);

  const [localSearchValue, setLocalSearchValue] = useState<string>(
    query.search
  );

  const changeFilterValue = (newValue: FilterValue) => () => {
    setFilter(newValue);
  };

  const changeLocalSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(event.target.value);
  };

  const startSearching = () => {
    dispatch(setSearch(localSearchValue.trim()));
  };

  const handleDeleteCompleted = () => {
    if (confirm("Do you want to delete completed tasks?")) {
      dispatch(fetchDeleteCompleted());
      setFilter(FilterValue.ALL);
    }
  };

  const clearSearchValue = () => {
    dispatch(setSearch(""));
  };

  useEffect(() => {
    const debounceTimer = setTimeout(startSearching, DEBOUNCE_TIME);
    return () => clearTimeout(debounceTimer);
  }, [localSearchValue]);

  useEffect(() => {
    setLocalSearchValue(query.search);
  }, [query.search]);

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
              filter === btnText && styles.active
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
