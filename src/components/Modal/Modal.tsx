import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { TodoActionTypes } from "../../store/actionTypes/actionTypes";
import { ITask } from "../../types/task.interface";

interface ModalProps {
  onCloseModal: () => void;
}

const Modal: FC<ModalProps> = ({ onCloseModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    // Create utils to get date -------------------
    createdDate: new Date().toISOString().substring(0, 10),
    // Get tomorrow date ------------------
    expiredDate: new Date().toISOString().substring(0, 10),
  });
  const dispatch = useDispatch();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setFormData((prevData) => ({ ...prevData, title }));
  };

  const handleCreatedDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const createdDate = event.target.value;
    setFormData((prevData) => ({ ...prevData, createdDate }));
  };

  const handleExpiredDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const expiredDate = event.target.value;
    setFormData((prevData) => ({ ...prevData, expiredDate }));
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (formData.title) {
      const createdDate = new Date(formData.createdDate);
      const expiredDate = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000);
      expiredDate.setHours(23, 59, 59, 999);

      const task: ITask = {
        id: crypto.randomUUID(),
        title: formData.title,
        createdDate,
        expiredDate,
        completed: false,
      };

      dispatch({ type: TodoActionTypes.ADD_TASK, payload: task });
      onCloseModal();
    }
  };

  return (
    <div>
      <div>
        <h2>Add Item</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter Task"
            value={formData.title}
            onChange={handleTitleChange}
          />
          <label>
            Created Date
            <input
              type="date"
              value={formData.createdDate}
              onChange={handleCreatedDateChange}
            />
          </label>
          <label>
            Expired Date
            <input
              type="date"
              value={formData.expiredDate}
              onChange={handleExpiredDateChange}
            />
          </label>
          <div>
            <button type="button" onClick={onCloseModal}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
