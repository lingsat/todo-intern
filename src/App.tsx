import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import TodoList from "./components/TodoList/TodoList";
import CreateTask from "./components/CreateTask/CreateTask";
import Modal from "./components/Modal/Modal";
import styles from "./App.module.scss";

const App = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const onOpenModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Provider store={store}>
      <h1 className={styles.title}>Todo Application</h1>
      <CreateTask onOpenModal={onOpenModal} />
      <TodoList />
      {showModal && <Modal onCloseModal={onCloseModal} />}
    </Provider>
  );
};

export default App;
