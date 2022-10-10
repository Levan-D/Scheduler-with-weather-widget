/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./todo.module.css";
import TodoTask from "./TodoTask";
import TodoDelete from "./TodoDelete";
import TodoToggle from "./TodoToggle";
import TodoDate from "./TodoDate";

import { CHANGE_TODO_POSITION } from "./todoSlice";

import { CHANGE_TODOINDEX, NEWTODOID, TODODRAGGING } from "../indexingSlice";

function Todo({ todo, name, date }) {
  const todosRedux = useSelector((store) => store.todo.data);
  const indexingData = useSelector((store) => store.indexing.data);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);

  const [dragging, setDragging] = useState(false);

  const rearrange = () => {
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
  };

  const handleChangeTodoIndex = () => {
    dispatch(
      CHANGE_TODOINDEX({
        todoId: todo.id,
        todoIndex: todosRedux[indexingData.listIndex].todoArray
          .map((x) => x.id)
          .indexOf(todo.id),
      })
    );
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

    dispatch(
      CHANGE_TODOINDEX({
        todoId: todo.id,
        todoIndex: todosRedux[indexingData.listIndex].todoArray
          .map((x) => x.id)
          .indexOf(todo.id),
      })
    );
  };
  const handleOnDragEnd = () => {
    rearrange();
    dispatch(TODODRAGGING(false));
    setDragging(false);
  };

  const todoClassName = `
  ${
    indexingData.newtodoid &&
    indexingData.TodoDragging &&
    indexingData.newtodoid === name
      ? styles.afterGlowTodo
      : ""
  } 
    ${styles.todoContainer}`;

  return (
    <div className={styles.todoBackground} onDragOver={handleOnDragOver}>
      <div
        className={todoClassName}
        onClick={handleChangeTodoIndex}
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
