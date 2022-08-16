/** @format */
import { ACTIONS } from "./Scheduler";

function Todo({ todo, toggle }) {
  const dateArray = todo.time.split(" ");
  const dataObject = dateArray.map((str, index) => ({
    value: str,
    id: index + 1,
  }));
  return (
    <div className="todoBackground">
      <div className="todoContainer">
        <div
          className={`todo ${
            todo.complete ? "todoComplete" : "todoNotComplete"
          }`}
        >
          {todo.name}
        </div>
        <div className="todoButtonsFlex">
          <div
            className="todoCheck"
            onClick={() => {
              toggle({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } });
            }}
          >
            &#10004;
          </div>
          <div
            className="todoDelete"
            onClick={() => {
              toggle({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } });
            }}
          >
            &#8211;
          </div>
          <div className="timeStampWrapper">
            <div>{dataObject[4].value.slice(0, 5)}</div>
            <div>
              {dataObject[0].value} {dataObject[1].value} {dataObject[2].value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
