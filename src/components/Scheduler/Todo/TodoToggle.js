import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./todo.module.css";
import { TOGGLE_TODO } from "./todoSlice";

const TodoToggle = ({ todo }) => {
  const indexingData = useSelector((store) => store.indexing.data);
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const dispatch = useDispatch();

  const toggleTodo = () => {
    if (!isLoggedIn) {
      dispatch(
        TOGGLE_TODO({
          id: todo.id,
          index: indexingData.listIndex,
          todoIndex: indexingData.todoIndex.todoIndex,
        })
      );
    } else if (isLoggedIn) {
    }
  };
  return (
    <div className={styles.todoCheck} onClick={toggleTodo}>
      &#10004;
    </div>
  );
};

export default TodoToggle;
