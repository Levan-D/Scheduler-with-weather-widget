/** @format */
import "../../Scheduler.css";
import React, { useReducer, useState, useEffect } from "react";
import Todo from "./Todo";
import List from "./List";

export const ACTIONS = {
  FETCH_TODODATA: "fetch-todoData",
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function todoReducer(todos, action) {
  switch (action.type) {
    case ACTIONS.FETCH_TODODATA:
      return (todos = JSON.parse(localStorage.getItem("todoDate")));
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.taskName)];
    case ACTIONS.DELETE_TODO:
      return todos.filter((x) => x.id !== action.payload.id);
    case ACTIONS.TOGGLE_TODO:
      return todos.map((x) => {
        if (x.id === action.payload.id) {
          return { ...x, complete: !x.complete };
        }
        return x;
      });
    default:
      return todos;
  }
}

function newTodo(taskName) {
  return {
    id: Date.now(),
    time: Date(Date.now()),
    taskName: taskName,
    complete: false,
  };
}

function Scheduler() {
  const [todos, todoDispatch] = useReducer(todoReducer, "");
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("todoDate")) !== null) {
      todoDispatch({
        type: ACTIONS.FETCH_TODODATA,
      });
    }
  }, []);
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("todoDate")) !== null &&
      todos.length > 0
    ) {
      localStorage.setItem("todoDate", JSON.stringify(todos));
    }
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    todoDispatch({
      type: ACTIONS.ADD_TODO,
      payload: { taskName: taskName },
    });
    setTaskName("");
  }
  // console.log(todos);
  return (
    <div className="schedulerWrapper">
      <div className="leftSide">
        <h2>Your Lists:</h2>
        <div className="listWrapper">
          {typeof todos === "object" &&
            todos.map((x) => {
              return <Todo key={x.id} todo={x} toggle={todoDispatch} />;
            })}
        </div>
      </div>
      <div className="rightSide">
        <h2>Add a new task below!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Enter task here!"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input type="submit" value="+" />
        </form>
        <div className="todoWrapper">
          {typeof todos === "object" &&
            todos.map((x) => {
              return <Todo key={x.id} todo={x} toggle={todoDispatch} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Scheduler;
