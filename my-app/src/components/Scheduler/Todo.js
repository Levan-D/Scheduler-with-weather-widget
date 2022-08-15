/** @format */
import { ACTIONS } from "./Scheduler";

function Todo({ todo, toggle, pushData }) {
  return (
    <div className="todoContainer">
      <div
        className="todoCheck"
        onClick={() => {
          toggle({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } });
        }}
      >
        &#10004;
      </div>
      <div
        className={`todo ${todo.complete ? "todoComplete" : "todoNotComplete"}`}
      >
        {todo.name}
      </div>

      <div
        className="todoDelete"
        onClick={() => {
          toggle({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } });
        }}
      >
        &#8211;
      </div>
    </div>
  );
}

export default Todo;
