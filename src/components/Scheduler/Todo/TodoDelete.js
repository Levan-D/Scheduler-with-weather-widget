import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./todo.module.css";
import { deleteTodo } from "../apiScheduler/deleteTodoSlice";
import { DELETE_TODO } from "./todoSlice";
import { deleteTodoInter } from "../apiScheduler/getTodoSlice";

const TodoDelete = ({ todo }) => {
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const indexingData = useSelector((store) => store.indexing.data);
  const listData = useSelector((store) => store.getList.data);
  const todoData = useSelector((store) => store.getTodo);
  const deleteListId =
    isLoggedIn && listData.length > 0 ? listData[indexingData.listIndex].id : null;

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (!isLoggedIn) {
      dispatch(DELETE_TODO({ id: todo.id, index: indexingData.listIndex }));
    } else if (isLoggedIn) {
      dispatch(
        deleteTodo({
          listId: deleteListId,
          todoId: indexingData.todoIndex.todoId,
        })
      );
      dispatch(
        deleteTodoInter(
          todoData.data.findIndex((todo) => {
            return todo.id === indexingData.todoIndex.todoId;
          })
        )
      );
    }
  };
  return (
    <div className={styles.todoDelete} onClick={handleDelete}>
      &#8211;
    </div>
  );
};

export default TodoDelete;
