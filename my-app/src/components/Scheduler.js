/** @format */

import React, { useReducer, useState } from "react"
import Todo from "./Todo"

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
}

function todoReducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(x => {
        if (x.id === action.payload.id) {
          return { ...x, complete: !x.complete }
        }
        return x
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(x => x.id !== action.payload.id)
    default:
      return todos
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false }
}

function Scheduler() {
  const [todos, todoDispatch] = useReducer(todoReducer, [])
  const [name, setName] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    todoDispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } })
    setName("")
  }
  console.log(todos)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </form>
      {todos.map(x => {
        return <Todo key={x.id} todo={x} toggle={todoDispatch} />
      })}
    </div>
  )
}

export default Scheduler
