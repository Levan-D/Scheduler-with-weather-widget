import ProgressBar from "../ProgressBar/ProgressBar";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  FETCH_TODODATA,
  ADD_TODO,
  ADD_LIST,
  RENAME_LIST,
  CHANGE_LIST_COLOR,
  RENAME_TODO,
  DELETE_LIST,
  TOGGLE_TODO,
  CHANGE_TODO_POSITION,
  CHANGE_LIST_POSITION,
} from "./todoSlice";

const CreateTodo = () => {
  const dispatch = useDispatch();
  const todosRedux = useSelector((store) => store.todo.data);
  const isInitialData = useSelector((store) => store.todo.isInitialData);
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
      <h2>
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
        <input type="submit" value="+" className="bigSubmitButton" />
      </form>
    </div>
  );
};

export default CreateTodo;
