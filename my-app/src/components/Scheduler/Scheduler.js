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
      return JSON.parse(localStorage.getItem("todoData"))

    case ACTIONS.ADD_TODO:
      let newObject1 = [
        {
          ...todos[action.payload.index],
          todoArray: [
            ...todos[action.payload.index].todoArray,
            newTodo(action.payload.taskName),
          ],
        },
      ]

      return todos.map(obj => newObject1.find(o => o.listName === obj.listName) || obj)

    case ACTIONS.ADD_LIST:
      return [...todos, newList(`list${todos.length + 1}`)]

    case ACTIONS.DELETE_TODO:
      let newObject2 = [
        {
          ...todos[action.payload.index],
          todoArray: [
            ...todos[action.payload.index].todoArray.filter(
              x => x.id !== action.payload.id
            ),
          ],
        },
      ]
      return todos.map(obj => newObject2.find(o => o.listName === obj.listName) || obj)

    case ACTIONS.TOGGLE_TODO:
      let newObject3 = [
        {
          ...todos[action.payload.index],
          todoArray: [
            ...todos[action.payload.index].todoArray.map(x => {
              if (x.id === action.payload.id) {
                return { ...x, complete: !x.complete }
              }
              return x
            }),
          ],
        },
      ]
      return todos.map(obj => newObject3.find(o => o.listName === obj.listName) || obj)
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
    todoArray: [],
  }
}

function Scheduler() {
  const [todos, todoDispatch] = useReducer(todoReducer, [
    {
      listName: "list1",
      todoArray: [],
    },
  ])
  const [taskName, setTaskName] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("todoData")) !== null &&
      JSON.parse(localStorage.getItem("todoData")).length > 0
    ) {
      todoDispatch({
        type: ACTIONS.FETCH_TODODATA,
      })
    }
  }, [])

  console.log(JSON.parse(localStorage.getItem("todoData")))

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("todoData")) !== null &&
      JSON.parse(localStorage.getItem("todoData")).length === 0
    ) {
      localStorage.setItem("todoData", JSON.stringify(todos))
    }
    if (todos[index].todoArray.length > 0)
      localStorage.setItem("todoData", JSON.stringify(todos))
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
            todos[index].todoArray.length > 0 &&
            todos[index].todoArray.map(x => {
              return <Todo key={x.id} todo={x} toggle={todoDispatch} index={index} />
            })}
        </div>
      </div>
    </div>
  )
}

export default Scheduler
