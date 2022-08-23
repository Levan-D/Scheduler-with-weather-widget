/** @format */
import "./SchedulerRight.css";
import "./SchedulerLeft.css";
import React, { useReducer, useState, useEffect } from "react";
import Todo from "./Todo";
import List from "./List";
import todoReducer from "./todoReducer";
import ProgressBar from "../ProgressBar/ProgressBar";
import Confetti from "react-confetti";
import tpReducer from "./tpReducer";
import ACTIONS from "./actions";

function Scheduler() {
  const [todos, todoDispatch] = useReducer(todoReducer, [
    {
      listName: "list_1",
      todoArray: [],
    },
  ]);
  const [taskProgress, tpDispatch] = useReducer(tpReducer, {
    tasksComplete: 0,
    tasksTotal: 0,
    confettiBoom: false,
    triggered: false,
    opacity: 1,
  });
  const [taskName, setTaskName] = useState("");
  const [index, setIndex] = useState(0);
  function setIndexCh(i) {
    setIndex(i);
  }
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("todoData")) !== null &&
      JSON.parse(localStorage.getItem("todoData")).length > 0
    ) {
      todoDispatch({
        type: ACTIONS.FETCH_TODODATA,
      });
    }
  }, []);

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("todoData")) !== null &&
      JSON.parse(localStorage.getItem("todoData")).length === 0
    ) {
      localStorage.setItem("todoData", JSON.stringify(todos));
    }
    if (todos[index].todoArray.length > 0)
      localStorage.setItem("todoData", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    tpDispatch({
      type: ACTIONS.SET_TASKSCOMPLETE,
      payload: { todos: todos, index: index },
    });
    tpDispatch({
      type: ACTIONS.SET_TASKSTOTAL,
      payload: { todos: todos, index: index },
    });
  }, [todos]);

  useEffect(() => {
    if (
      taskProgress.tasksComplete === taskProgress.tasksTotal &&
      taskProgress.tasksTotal > 0 &&
      taskProgress.confettiBoom === false &&
      taskProgress.triggered === false
    ) {
      tpDispatch({
        type: ACTIONS.SET_CONFETTIBOOM,
        payload: { todos: todos, index: index, state1: true, state2: true },
      });

      for (let i = 1, j = 1; i >= 0, j < 6; i = i - 0.2, j++) {
        setTimeout(() => {
          tpDispatch({
            type: ACTIONS.SET_OPACITYZERO,
            payload: { opa: i },
          });
        }, j * 1000);
        if (j === 5) {
          setTimeout(() => {
            tpDispatch({
              type: ACTIONS.SET_CONFETTIBOOM,
              payload: {
                todos: todos,
                index: index,
                state1: false,
                state2: true,
              },
            });
          }, j * 1000);
        }
      }
    }
    if (
      taskProgress.tasksComplete !== taskProgress.tasksTotal &&
      taskProgress.triggered === true
    ) {
      tpDispatch({
        type: ACTIONS.SET_CONFETTIBOOM,
        payload: { todos: todos, index: index, state1: false, state2: false },
      });
    }
  }, [taskProgress]);

  function handleSubmit(e) {
    e.preventDefault();
    todoDispatch({
      type: ACTIONS.ADD_TODO,
      payload: { taskName: taskName, index: index },
    });
    setTaskName("");
  }

  function handleList(e) {
    const regex = /^(List)+[0-9]*/gi;
    if (regex.test(e.target.classList[0])) {
      setIndex(todos.map((x) => x.listName).indexOf(e.target.classList[0]));
    }
  }

  return (
    <div className="schedulerWrapper">
      {taskProgress.confettiBoom && <Confetti opacity={taskProgress.opacity} />}
      <div className="leftSide">
        <h2>Your Lists:</h2>
        <div
          className="newListButton"
          onClick={(x) => {
            todoDispatch({
              type: ACTIONS.ADD_LIST,
            });
          }}
        >
          +
        </div>
        <div className="listWrapper">
          {typeof todos === "object" &&
            todos.map((x) => {
              return (
                <List
                  key={x.listName}
                  name={x.listName}
                  listSelect={handleList}
                  index={index}
                  todos={todos}
                />
              );
            })}
        </div>
      </div>
      <div className="rightSide">
        <h2>
          Add a new task below! ({taskProgress.tasksComplete}/
          {taskProgress.tasksTotal})
          <ProgressBar
            tasksComplete={taskProgress.tasksComplete}
            tasksTotal={taskProgress.tasksTotal}
            width={315}
            height={10}
            background={`#354259`}
          />
        </h2>
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
            todos[index].todoArray.length > 0 &&
            todos[index].todoArray.map((x) => {
              return (
                <Todo key={x.id} todo={x} toggle={todoDispatch} index={index} />
              );
            })}
        </div>
      </div>
      <button
        className="deleteButton"
        onClick={(x) => {
          todoDispatch({
            type: ACTIONS.DELETE_LIST,
            payload: {
              index: index,
              zeName: todos[index].listName,
              setInfexF: setIndexCh,
            },
          });
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default Scheduler;
