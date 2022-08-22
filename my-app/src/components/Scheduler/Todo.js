/** @format */
import ACTIONS from "./actions";

function Todo({ todo, toggle, index }) {
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
          {todo.taskName}
        </div>
        <div className="todoButtonsFlex">
          <div
            className="todoCheck"
            onClick={() => {
              toggle({
                type: ACTIONS.TOGGLE_TODO,
                payload: { id: todo.id, index: index },
              });
            }}
          >
            &#10004;
          </div>
          <div
            className="todoDelete"
            onClick={() => {
              toggle({
                type: ACTIONS.DELETE_TODO,
                payload: { id: todo.id, index: index },
              });
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
