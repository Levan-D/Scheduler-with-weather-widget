/** @format */
import "../../Scheduler.css";
import React, { useReducer, useState, useEffect } from "react";
import Todo from "./Todo";

export const ACTIONS = {
  FETCH_TODODATA: "fetch-todoData",
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function todoReducer(todos, action) {
  switch (action.type) {
    case ACTIONS.FETCH_TODODATA:
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
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

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

function Scheduler() {
  const [todos, todoDispatch] = useReducer(todoReducer, "");
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    todoDispatch({
      type: ACTIONS.ADD_TODO,
      payload: { name: name },
    });
    setName("");
  }

  return (
    <div className="schedulerWrapper">
      <h1>Add a new task below!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Enter task here!"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
  );
}

export default Scheduler;
