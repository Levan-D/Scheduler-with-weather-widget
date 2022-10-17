/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TASK_RENAME } from "../indexingSlice";
import saveIcon from "../../pictures/saveIcon.png";
import styles from "./todo.module.css";
import { RENAME_TODO } from "./todoSlice";
import { patchTodo } from "../apiScheduler/patchTodoSlice";
import { renameTodoInter } from "../apiScheduler/getTodoSlice";

const TodoTask = ({ todo, name, dragging }) => {
  const indexingData = useSelector((store) => store.indexing.data);
  const listData = useSelector((store) => store.getList.data);
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.indexing.data.isLoading);
  const complete = isLoggedIn ? todo.is_completed : todo.complete;
  const todoComplete = `${styles.todo} ${
    complete ? styles.todoComplete : styles.todoNotComplete
  }`;
  const todoData = useSelector((store) => store.getTodo);
  const todoInex = todoData.data.findIndex((todo) => {
    return todo.id === indexingData.todoIndex.todoId;
  });
  const deleteListId =
    isLoggedIn && listData.length > 0
      ? listData[indexingData.listIndex].id
      : null;
  let hoverEvent;
  const [isHovering, setIsHovering] = useState(false);

  const handleKeyDown = (e) => {
    e.target.style.height = "25px";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 250)}px`;
  };

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
  const editTodo = (rename, id, show) => {
    dispatch(
      TASK_RENAME({
        rename: rename,
        id: id,
        show: show,
      })
    );
  };

  const handleRenameTodo = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      dispatch(
        RENAME_TODO({
          taskRename: indexingData.taskRename.rename,
          todoIndex: indexingData.todoIndex.todoIndex,
          index: indexingData.listIndex,
        })
      );
      dispatch(
        TASK_RENAME({
          rename: "",
          id: "",
          show: false,
        })
      );
    } else if (isLoggedIn) {
      dispatch(
        patchTodo({
          data: {
            description: indexingData.taskRename.rename,
          },
          listId: deleteListId,
          todoId: indexingData.todoIndex.todoId,
        })
      );
      dispatch(
        renameTodoInter({
          index: todoInex,
          data: indexingData.taskRename.rename,
        })
      );
      dispatch(
        TASK_RENAME({
          rename: "",
          id: "",
          show: false,
        })
      );
    }
  };
  const handleDoubleClick = () => {
    if (!isLoggedIn) {
      editTodo(todo.taskName.replace(/\s\s+/g, " "), todo.id, true);
    } else if (isLoggedIn) {
      editTodo(name.replace(/\s\s+/g, " "), todo.id, true);
    }
  };

  return (
    <div ref={refTwo}>
      {!indexingData.taskRename.show && (
        <div
          onDoubleClick={handleDoubleClick}
          onMouseEnter={() => {
            hoverEvent = setTimeout(() => {
              setIsHovering(true);
            }, 1000);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
            clearTimeout(hoverEvent);
          }}
          className={`${isLoading && "isLoading"} ${todoComplete}`}
        >
          {/* task Name */}
          {!isLoggedIn && todo.taskName} {isLoggedIn && name}
          {/* task Name */}
          {/* on Hover event */}
          {isHovering && !dragging && !isLoggedIn && (
            <div className={styles.hoverDoubleClick}>
              Double click to edit <br /> or drag {`&`} drop
            </div>
          )}
          {/* on Hover event */}
        </div>
      )}

      {indexingData.taskRename.show && (
        <div>
          {todo.id === indexingData.taskRename.id ? (
            <form className={styles.editTodoForm} onSubmit={handleRenameTodo}>
              <label>
                <textarea
                  autoFocus={
                    todo.id === indexingData.taskRename.id ? true : false
                  }
                  ref={refOne}
                  value={indexingData.taskRename.rename}
                  className={`${isLoading && "isLoading"}  ${styles.textArea}`}
                  onKeyDown={handleKeyDown}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      handleRenameTodo(e);
                    }
                  }}
                  onChange={(e) => editTodo(e.target.value, todo.id, true)}
                />
              </label>
              <label className={styles.submitContainer}>
                <div className={styles.miniSubmit} onClick={handleRenameTodo}>
                  <img src={saveIcon} alt="save icon" />
                </div>
              </label>
            </form>
          ) : (
            <div
              onDoubleClick={() => editTodo(todo.taskName, todo.id, true)}
              className={todoComplete}
            >
              {!isLoggedIn && todo.taskName} {isLoggedIn && name}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoTask;
