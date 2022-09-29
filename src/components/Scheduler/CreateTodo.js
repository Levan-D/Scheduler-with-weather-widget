import ProgressBar from "../ProgressBar/ProgressBar";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_TODO } from "./todoSlice";
import styles from "./createTodo.module.css";

const CreateTodo = () => {
  const dispatch = useDispatch();
  const taskProgressData = useSelector((store) => store.taskProgress.data);
  const indexingData = useSelector((store) => store.indexing.data);

  const [taskName, setTaskName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(ADD_TODO({ taskName: taskName, index: indexingData.listIndex }));
    setTaskName("");
  }

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
          type="text"
          required
          placeholder="Enter task here!"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input type="submit" value="+" className={styles.bigSubmitButton} />
      </form>
    </div>
  );
};

export default CreateTodo;
