import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./todo.module.css";

import { DELETE_TODO } from "./todoSlice";

const TodoDelete = ({ todo }) => {
  const indexingData = useSelector((store) => store.indexing.data);
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!isLoggedIn) {
      dispatch(DELETE_TODO({ id: todo.id, index: indexingData.listIndex }));
    }
  };
  return (
    <div className={styles.todoDelete} onClick={handleDelete}>
      &#8211;
    </div>
  );
};

export default TodoDelete;
