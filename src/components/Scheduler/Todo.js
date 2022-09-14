/** @format */

import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FETCH_TODODATA,
  ADD_TODO,
  ADD_LIST,
  DELETE_LIST,
  RENAME_LIST,
  CHANGE_LIST_COLOR,
  RENAME_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
} from "./todoSlice";

function Todo({
  todo,

  index,
  setTaskRenameF,
  taskRename,
  handleRenameTodo,
  setTodoIndexF,
  rearrange,
  settodoidf,
}) {
  const dispatch = useDispatch();
  let markedDate = todo.completeDate.split(" ").map((str, index) => ({
    value: str,
    id: index + 1,
  }));

  const [isHovering, setIsHovering] = useState(false);
  let hoverEvent;
  const [dragging, setDragging] = useState(false);
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

  const refTwo = useRef(null);
  // useEffect(() => {
  //   document.addEventListener("mousemove", handleClickOutside, true);
  // }, [refTwo]);

  const handleClickOutside = (e) => {
    if (!refTwo.current.contains(e.target)) {
      setIsHovering(false);
    }
  };

  return (
    <div
      className="todoBackground"
      onDragOver={(e) => {
        e.preventDefault();
        settodoidf(todo.id);
      }}
    >
      <div
        className="todoContainer"
        ref={refTwo}
        style={{ filter: dragging ? "brightness(0.7)" : "brightness(1)" }}
        draggable="true"
        onDragStart={() => {
          if (!dragging) {
            setDragging(true);
          }

          setTodoIndexF(todo.id);
        }}
        onDragEnd={() => {
          rearrange();
          setDragging(false);
        }}
      >
        <div>
          {!taskRename.show && (
            <div
              onDoubleClick={() => {
                setTaskRenameF({
                  rename: todo.taskName.replace(/\s\s+/g, " "),
                  id: todo.id,
                  show: true,
                });
              }}
              onMouseEnter={(x) => {
                hoverEvent = setTimeout(() => {
                  setIsHovering(true);
                }, 1000);
              }}
              onMouseLeave={(x) => {
                setIsHovering(!true);
                clearTimeout(hoverEvent);
              }}
              className={`todo ${
                todo.complete ? "todoComplete" : "todoNotComplete"
              }`}
            >
              {todo.taskName}
              {isHovering && !dragging && (
                <div className="hoverDoubleClick">
                  Double click to edit <br /> or drag {`&`} drop
                </div>
              )}
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
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          handleRenameTodo(e);
                        }
                      }}
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
              dispatch(TOGGLE_TODO({ id: todo.id, index: index }));
            }}
          >
            &#10004;
          </div>
          <div
            className="todoDelete"
            onClick={() => {
              dispatch(DELETE_TODO({ id: todo.id, index: index }));
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
