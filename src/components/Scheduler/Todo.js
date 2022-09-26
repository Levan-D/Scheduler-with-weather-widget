/** @format */

import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import saveIcon from "./pictures/saveIcon.png";
import {
  RENAME_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  CHANGE_TODO_POSITION,
} from "./todoSlice";

import {
  TASK_RENAME,
  CHANGE_TODOINDEX,
  NEWTODOID,
  TODODRAGGING,
} from "./indexingSlice";

function Todo({ todo, name }) {
  const todosRedux = useSelector((store) => store.todo.data);
  const indexingData = useSelector((store) => store.indexing.data);
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
  }, [indexingData.taskRename.show, indexingData.taskRename]);

  const refTwo = useRef(null);
  useEffect(() => {
    document.addEventListener("mousemove", handleClickOutside, true);
  }, [refTwo]);

  const handleClickOutside = (e) => {
    if (refTwo !== null && dragging === true) {
      if (!refTwo.current.contains(e.target)) {
        setIsHovering(false);
      }
    }
  };

  function handleRenameTodo(e) {
    e.preventDefault();
    dispatch(
      RENAME_TODO({
        taskRename: indexingData.taskRename.rename,
        todoIndex: indexingData.todoIndex.todoIndex,
        index: indexingData.listIndex,
      })
    );
    dispatch(TASK_RENAME({ rename: "", id: "", show: false }));
  }

  function rearrange() {
    let newPosition = todosRedux[indexingData.listIndex].todoArray
      .map((x) => x.id)
      .indexOf(indexingData.newtodoid);
    dispatch(
      CHANGE_TODO_POSITION({
        index: indexingData.listIndex,
        todoIndex: indexingData.todoIndex.todoIndex,
        newPositionIndex: newPosition,
      })
    );
  }

  return (
    <div
      className="todoBackground"
      onDragOver={(e) => {
        e.preventDefault();
        dispatch(NEWTODOID(todo.id));
      }}
    >
      <div
        className={`
        ${
          indexingData.newtodoid &&
          indexingData.TodoDragging &&
          indexingData.newtodoid === name
            ? "afterGlowTodo"
            : ""
        } 
          todoContainer`}
        onClick={() => {
          dispatch(
            CHANGE_TODOINDEX({
              todoId: todo.id,
              todoIndex: todosRedux[indexingData.listIndex].todoArray
                .map((x) => x.id)
                .indexOf(todo.id),
            })
          );
        }}
        ref={refTwo}
        style={{ filter: dragging ? "brightness(0.7)" : "brightness(1)" }}
        draggable="true"
        onDragStart={() => {
          if (!dragging) {
            dispatch(TODODRAGGING(true));
            setDragging(true);
          }

          dispatch(
            CHANGE_TODOINDEX({
              todoId: todo.id,
              todoIndex: todosRedux[indexingData.listIndex].todoArray
                .map((x) => x.id)
                .indexOf(todo.id),
            })
          );
        }}
        onDragEnd={() => {
          rearrange();
          dispatch(TODODRAGGING(false));
          setDragging(false);
        }}
      >
        <div>
          {!indexingData.taskRename.show && (
            <div
              onDoubleClick={() => {
                dispatch(
                  TASK_RENAME({
                    rename: todo.taskName.replace(/\s\s+/g, " "),
                    id: todo.id,
                    show: true,
                  })
                );
              }}
              onMouseEnter={(x) => {
                hoverEvent = setTimeout(() => {
                  setIsHovering(true);
                }, 1000);
              }}
              onMouseLeave={(x) => {
                setIsHovering(false);
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

          {indexingData.taskRename.show && (
            <div>
              {todo.id === indexingData.taskRename.id ? (
                <form className="editTodoForm" onSubmit={handleRenameTodo}>
                  <label>
                    <textarea
                      autoFocus={
                        todo.id === indexingData.taskRename.id ? true : false
                      }
                      ref={refOne}
                      value={indexingData.taskRename.rename}
                      className="textArea"
                      onKeyDown={handleKeyDown}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          handleRenameTodo(e);
                        }
                      }}
                      onChange={(e) =>
                        dispatch(
                          TASK_RENAME({
                            rename: e.target.value,
                            id: todo.id,
                            show: true,
                          })
                        )
                      }
                    />
                  </label>
                  <label className="submitContainer">
                    <div
                      className="miniSubmit"
                      onClick={(e) => {
                        handleRenameTodo(e);
                      }}
                    >
                      <img src={saveIcon} alt="save icon" />
                    </div>
                  </label>
                </form>
              ) : (
                <div
                  onDoubleClick={() => {
                    TASK_RENAME({
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
              dispatch(
                TOGGLE_TODO({
                  id: todo.id,
                  index: indexingData.listIndex,
                  todoIndex: indexingData.todoIndex.todoIndex,
                })
              );
            }}
          >
            &#10004;
          </div>
          <div
            className="todoDelete"
            onClick={() => {
              dispatch(
                DELETE_TODO({ id: todo.id, index: indexingData.listIndex })
              );
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
