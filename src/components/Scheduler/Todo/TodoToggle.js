import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./todo.module.css";
import { TOGGLE_TODO } from "./todoSlice";
import { patchTodo } from "../apiScheduler/patchTodoSlice";
import { toggleTodoInter } from "../apiScheduler/getTodoSlice";

const TodoToggle = ({ todo }) => {
  const indexingData = useSelector((store) => store.indexing.data);
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const listData = useSelector((store) => store.getList.data);
  const isLoading = useSelector((store) => store.indexing.data.isLoading);
  const todoData = useSelector((store) => store.getTodo);
  const todoInex = todoData.data.findIndex((todo) => {
    return todo.id === indexingData.todoIndex.todoId;
  });
  const deleteListId =
    isLoggedIn && listData.length > 0
      ? listData[indexingData.listIndex].id
      : null;
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
      dispatch(
        patchTodo({
          data: {
            is_completed: !todoData.data[todoInex].is_completed,
          },
          listId: deleteListId,
          todoId: indexingData.todoIndex.todoId,
        })
      );
      dispatch(toggleTodoInter({ index: todoInex }));
    }
  };
  return (
    <div
      className={`${isLoading && "isLoading"} ${styles.todoCheck}`}
      onClick={toggleTodo}
    >
      &#10004;
    </div>
  );
};

export default TodoToggle;
