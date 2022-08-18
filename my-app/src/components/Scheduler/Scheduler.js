/** @format */
import "../../Scheduler.css"
import React, { useReducer, useState, useEffect } from "react"
import Todo from "./Todo"
import List from "./List"

export const ACTIONS = {
  FETCH_TODODATA: "fetch-todoData",
  ADD_TODO: "add-todo",
  ADD_LIST: "add-list",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
}

function todoReducer(todos, action) {
  switch (action.type) {
    case ACTIONS.FETCH_TODODATA:
      return (todos = JSON.parse(localStorage.getItem("todoDate")))
    case ACTIONS.ADD_TODO:
      let newObject = [
        {
          ...todos[action.payload.index],
          list: [...todos[action.payload.index].list, newTodo(action.payload.taskName)],
        },
      ]
      let tata = todos.map(obj => newObject.find(o => o.listName === obj.listName) || obj)
      return tata

    case ACTIONS.ADD_LIST:
      return [...todos, newList(`list${todos.length + 1}`)]
    case ACTIONS.DELETE_TODO:
      return [
        ...todos,
        (todos[action.payload.index].list = todos[action.payload.index].list.filter(
          x => x.id !== action.payload.id
        )),
      ]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(x => {
        if (x.id === action.payload.id) {
          return { ...x, complete: !x.complete }
        }
        return x
      })
    default:
      return todos
  }
}

function newTodo(taskName) {
  return {
    id: Date.now(),
    time: Date(Date.now()),
    taskName: taskName,
    complete: false,
  }
}
function newList(listName) {
  return {
    listName: listName,
    list: [],
  }
}

function Scheduler() {
  const [todos, todoDispatch] = useReducer(todoReducer, [
    {
      listName: "list1",
      list: [],
    },
  ])
  const [taskName, setTaskName] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("todoDate")) !== null) {
      todoDispatch({
        type: ACTIONS.FETCH_TODODATA,
      })
    }
  }, [])
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("todoDate")) !== null && todos.length > 0) {
      localStorage.setItem("todoDate", JSON.stringify(todos))
    }
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    todoDispatch({
      type: ACTIONS.ADD_TODO,
      payload: { taskName: taskName, index: index },
    })
    setTaskName("")
  }
  function handleList(e) {
    setIndex(todos.map(x => x.listName).indexOf(e.target.classList[0]))
  }
  console.log(todos)
  return (
    <div className="schedulerWrapper">
      <div className="leftSide">
        <h2>Your Lists:</h2>
        <div
          className="newListButton"
          onClick={x => {
            todoDispatch({
              type: ACTIONS.ADD_LIST,
            })
          }}
        >
          +
        </div>
        <div className="listWrapper">
          {typeof todos === "object" &&
            todos.map(x => {
              return (
                <List
                  key={x.listName}
                  name={x.listName}
                  listSelect={handleList}
                  index={index}
                />
              )
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
            onChange={e => setTaskName(e.target.value)}
          />
          <input type="submit" value="+" />
        </form>
        <div className="todoWrapper">
          {typeof todos === "object" &&
            todos[index].list.length > 0 &&
            todos[index].list.map(x => {
              return <Todo key={x.id} todo={x} toggle={todoDispatch} />
            })}
        </div>
      </div>
    </div>
  )
}

export default Scheduler
