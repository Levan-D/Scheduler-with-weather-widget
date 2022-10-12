/** @format */

import ProgressBar from "../ProgressBar/ProgressBar";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_TODO } from "./Todo/todoSlice";
import styles from "./createTodo.module.css";
import { createTodo } from "./apiScheduler/createTodoSlice";
import { pushNewTodo } from "./apiScheduler/getTodoSlice";

const CreateTodo = () => {
  const dispatch = useDispatch();
  const taskProgressData = useSelector((store) => store.taskProgress.data);
  const indexingData = useSelector((store) => store.indexing.data);
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const listData = useSelector((store) => store.getList);
  const createTodoData = useSelector((store) => store.createTodo);
  const todoData = useSelector((store) => store.getTodo.data);
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      dispatch(ADD_TODO({ taskName: taskName, index: indexingData.listIndex }));
    } else if (isLoggedIn && listData.data.length > 0) {
      dispatch(
        createTodo({
          title: taskName,
          listId: listData.data[indexingData.listIndex].id,
        })
      );
    }
    setTaskName("");
  };

  useEffect(() => {
    if (createTodoData.success && !createTodoData.loading) {
      if (
        todoData.find((todo) => todo.position === createTodoData.data.position)
      ) {
        return;
      } else dispatch(pushNewTodo(createTodoData.data));
    }
  }, [createTodoData.loading]);

  return (
    <div>
      <h2 className={styles.header}>
        Add a new task below! ({taskProgressData.tasksComplete}/
        {taskProgressData.tasksTotal})
        <ProgressBar
          tasksComplete={taskProgressData.tasksComplete}
          tasksTotal={taskProgressData.tasksTotal}
          width={315}
          height={10}
          background={`#354259`}
        />
      </h2>
      <form onSubmit={handleSubmit} className="renameForm">
        <input
          className={styles.textTodo}
          type="text"
          required
          placeholder="Enter task here!"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          className={`${styles.bigSubmitButton} ${styles.submitForm}`}
          type="submit"
          value="+"
        />
      </form>
    </div>
  );
};

export default CreateTodo;
