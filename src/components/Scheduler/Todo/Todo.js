/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./todo.module.css";
import TodoTask from "./TodoTask";
import TodoDelete from "./TodoDelete";
import TodoToggle from "./TodoToggle";
import TodoDate from "./TodoDate";

import { CHANGE_TODO_POSITION } from "./todoSlice";

import { CHANGE_TODOINDEX, NEWTODOID, TODODRAGGING } from "../indexingSlice";
import { rearrange as rearrangeTodo } from "../apiScheduler/rearrangeSlice";
import { getTodo } from "../apiScheduler/getTodoSlice";

function Todo({ todo, name, date }) {
  const todosRedux = useSelector((store) => store.todo.data);
  const indexingData = useSelector((store) => store.indexing.data);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const [refresh, setRefresh] = useState(false);
  const todoData = useSelector((store) => store.getTodo);
  const rearrangeData = useSelector((store) => store.rearrange);
  const listData = useSelector((store) => store.getList);

  const [dragging, setDragging] = useState(false);

  const rearrange = () => {
    if (!isLoggedIn) {
      let newPosition = todosRedux[indexingData.listIndex].todoArray
        .map((x) => x.id)
        .indexOf(indexingData.newtodoid);
      dispatch(
        CHANGE_TODO_POSITION({
          index: indexingData.listIndex,
          todoIndex: indexingData.todoIndex.todoIndex,
          newPositionIndex: newPosition,
        })
      );
    } else if (isLoggedIn) {
      dispatch(
        rearrangeTodo({
          listId: {
            current: indexingData.todoIndex.todoIndex,
            replace: null,
          },
          todoId: {
            current: indexingData.todoIndex.todoId,
            replace: indexingData.newtodoid,
          },
        })
      );
      setRefresh(true);
    }
  };

  useEffect(() => {
    if (
      refresh &&
      isLoggedIn &&
      !todoData.loading &&
      todoData.success &&
      !rearrangeData.loading
    ) {
      dispatch(getTodo(listData.data[indexingData.listIndex].id));
      setRefresh(false);
    }
  }, [refresh, rearrangeData]);

  const handleChangeTodoIndex = () => {
    if (todo.id !== indexingData.todoIndex.todoId) {
      if (!isLoggedIn) {
        dispatch(
          CHANGE_TODOINDEX({
            todoId: todo.id,
            todoIndex: todosRedux[indexingData.listIndex].todoArray
              .map((x) => x.id)
              .indexOf(todo.id),
          })
        );
      } else if (isLoggedIn) {
        dispatch(
          CHANGE_TODOINDEX({
            todoId: todo.id,
            todoIndex: null,
          })
        );
      }
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();

    dispatch(NEWTODOID(todo.id));
  };

  const handleOnDragStart = () => {
    if (!dragging) {
      dispatch(TODODRAGGING(true));
      setDragging(true);
    }
    if (!isLoggedIn) {
      dispatch(
        CHANGE_TODOINDEX({
          todoId: todo.id,
          todoIndex: todosRedux[indexingData.listIndex].todoArray
            .map((x) => x.id)
            .indexOf(todo.id),
        })
      );
    } else if (isLoggedIn) {
      dispatch(
        CHANGE_TODOINDEX({
          todoId: todo.id,
          todoIndex: todo.list_id,
        })
      );
    }
  };

  const handleOnDragEnd = () => {
    rearrange();
    dispatch(TODODRAGGING(false));
    setDragging(false);
  };

  let todoClassName = null;
  if (!isLoggedIn) {
    todoClassName = `
  ${
    indexingData.newtodoid &&
    indexingData.TodoDragging &&
    indexingData.newtodoid === name
      ? styles.afterGlowTodo
      : ""
  } 
    ${styles.todoContainer}`;
  } else if (isLoggedIn) {
    todoClassName = `
  ${
    indexingData.newtodoid &&
    indexingData.TodoDragging &&
    indexingData.newtodoid === todo.id
      ? styles.afterGlowTodo
      : ""
  } 
    ${styles.todoContainer}`;
  }

  return (
    <div className={styles.todoBackground} onDragOver={handleOnDragOver}>
      <div
        className={todoClassName}
        onClick={handleChangeTodoIndex}
        onMouseEnter={handleChangeTodoIndex}
        style={{ filter: dragging ? "brightness(0.7)" : "brightness(1)" }}
        draggable="true"
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
      >
        <TodoTask todo={todo} name={name} date={date} dragging={dragging} />

        <div className={styles.todoButtonsFlex}>
          <TodoToggle todo={todo} />
          <TodoDelete todo={todo} />
          <TodoDate todo={todo} date={date} />
        </div>
      </div>
    </div>
  );
}

export default Todo;
