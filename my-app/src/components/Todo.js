/** @format */
import { ACTIONS } from "./Scheduler"

function Todo({ todo, toggle }) {
  return (
    <div>
      <span style={{ color: todo.complete ? "grey" : "red" }}>{todo.name}</span>
      <button
        onClick={() => {
          toggle({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
        }}
      >
        Toggle
      </button>
      <button
        onClick={() => {
          toggle({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default Todo
