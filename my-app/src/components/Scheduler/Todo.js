/** @format */
import ACTIONS from "./actions";

function Todo({ todo, toggle, index }) {
  let markedDate = todo.completeDate.split(" ").map((str, index) => ({
    value: str,
    id: index + 1,
  }));
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
            <div className="stampWrapper">
              <div>
                {dataObject[4].value.slice(0, 5)} <br />
                {dataObject[0].value}&nbsp;
                {dataObject[1].value}&nbsp;
                {dataObject[2].value}
              </div>
            </div>
          </div>
          <div
            className="markedStampWrapper"
            style={
              todo.complete
                ? { backgroundColor: "#92ba92", color: "#f0f0f0" }
                : { backgroundColor: `#f0f0f0` }
            }
          >
            <div className="stampWrapper">
              {todo.complete && (
                <div>
                  {markedDate[4].value.slice(0, 5)} <br />
                  {markedDate[0].value}&nbsp;
                  {markedDate[1].value}&nbsp;
                  {markedDate[2].value}
                </div>
              )}
              {!todo.complete && (
                <div>
                  Not <br /> Complete
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
