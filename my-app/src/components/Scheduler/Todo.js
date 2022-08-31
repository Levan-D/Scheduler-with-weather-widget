/** @format */
import ACTIONS from "./actions";
import React, { useRef, useEffect } from "react";

function Todo({
  todo,
  toggle,
  index,
  setTaskRenameF,
  taskRename,
  handleRenameTodo,
}) {
  let markedDate = todo.completeDate.split(" ").map((str, index) => ({
    value: str,
    id: index + 1,
  }));

  const dateArray = todo.time.split(" ");
  const dataObject = dateArray.map((str, index) => ({
    value: str,
    id: index + 1,
  }));

  function handleKeyDown(e) {
    e.target.style.height = "25px";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 250)}px`;
  }

  const refOne = useRef(null);

  useEffect(() => {
    if (refOne.current) {
      refOne.current.style.height = "25px";
      refOne.current.style.height = `${Math.min(
        refOne.current.scrollHeight,
        250
      )}px`;
    }
  }, [taskRename.show, taskRename]);

  return (
    <div className="todoBackground">
      <div className="todoContainer">
        <div>
          {!taskRename.show && (
            <div
              onDoubleClick={() => {
                setTaskRenameF({
                  rename: todo.taskName,
                  id: todo.id,
                  show: true,
                });
              }}
              className={`todo ${
                todo.complete ? "todoComplete" : "todoNotComplete"
              }`}
            >
              {todo.taskName}
            </div>
          )}

          {taskRename.show && (
            <div>
              {todo.id === taskRename.id ? (
                <form className="editTodoForm" onSubmit={handleRenameTodo}>
                  <label>
                    <textarea
                      ref={refOne}
                      value={taskRename.rename}
                      className="textArea"
                      onKeyDown={handleKeyDown}
                      onKeyPress={e=>{  if( e.key==="Enter"){handleRenameTodo(e)}   }}
                      onChange={(e) =>
                        setTaskRenameF({
                          rename: e.target.value,
                          id: todo.id,
                          show: true,
                        })
                      }
                    />
                  </label>
                  <label className="submitContainer">
                    <input type="submit" className="miniSubmit" value="+" />
                  </label>
                </form>
              ) : (
                <div
                  onDoubleClick={() => {
                    setTaskRenameF({
                      rename: todo.taskName,
                      id: todo.id,
                      show: true,
                    });
                  }}
                  className={`todo ${
                    todo.complete ? "todoComplete" : "todoNotComplete"
                  }`}
                >
                  {todo.taskName}
                </div>
              )}
            </div>
          )}
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
