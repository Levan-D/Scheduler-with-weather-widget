/** @format */
import "./SchedulerRight.css";
import "./SchedulerLeft.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todo from "./Todo";
import List from "./List";
import CreateTodo from "./CreateTodo";
import Confetti from "react-confetti";
import PopUpMenuComp from "./PopUpMenuComp";
import {
  FETCH_TODODATA,
  ADD_TODO,
  ADD_LIST,
  RENAME_LIST,
  CHANGE_LIST_COLOR,
  RENAME_TODO,
  DELETE_LIST,
  TOGGLE_TODO,
  CHANGE_TODO_POSITION,
  CHANGE_LIST_POSITION,
} from "./todoSlice";
import {
  SET_TASKSCOMPLETE,
  SET_TASKSTOTAL,
  SET_CONFETTIBOOM,
  SET_OPACITY,
} from "./taskProgressSlice";

import {
  CHANGE_LISTINDEX,
  TASK_RENAME,
  CHANGE_TODOINDEX,
  POPUPVISIBILITY,
  NEWLISTNAME,
} from "./indexingSlice";

function Scheduler() {
  const dispatch = useDispatch();
  const todosRedux = useSelector((store) => store.todo.data);
  const isInitialData = useSelector((store) => store.todo.isInitialData);
  const taskProgressData = useSelector((store) => store.taskProgress.data);
  const indexingData = useSelector((store) => store.indexing.data);

  const [listName, setListName] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isInitialData) {
      localStorage.setItem("todoData", JSON.stringify(todosRedux));
    }
    if (isInitialData) {
      dispatch(FETCH_TODODATA());
    }
  }, [todosRedux, listName]);

  useEffect(() => {
    dispatch(
      SET_TASKSCOMPLETE({
        tasksComplete: todosRedux[indexingData.listIndex].todoArray.filter(
          (x) => x.complete === true
        ).length,
      })
    );
    dispatch(
      SET_TASKSTOTAL({
        tasksTotal: todosRedux[indexingData.listIndex].todoArray.length,
      })
    );
  }, [todosRedux, indexingData.listIndex]);

  useEffect(() => {
    if (
      taskProgressData.tasksComplete === taskProgressData.tasksTotal &&
      taskProgressData.tasksTotal > 0 &&
      taskProgressData.confettiBoom === false &&
      taskProgressData.triggered === false
    ) {
      dispatch(SET_CONFETTIBOOM({ confettiBoom: true, triggered: true }));

      for (let i = 1, j = 1; i >= 0, j < 6; i = i - 0.2, j++) {
        setTimeout(() => {
          dispatch(SET_OPACITY({ opa: i }));
        }, j * 1000);
        if (j === 5) {
          setTimeout(() => {
            dispatch(
              SET_CONFETTIBOOM({ confettiBoom: false, triggered: true })
            );
          }, j * 1000);
        }
      }
    }
    if (taskProgressData.tasksComplete !== taskProgressData.tasksTotal) {
      dispatch(SET_CONFETTIBOOM({ confettiBoom: false, triggered: false }));
      dispatch(SET_OPACITY({ opa: 1 }));
    }
  }, [taskProgressData]);

  function popUpMenu(e) {
    setCoords({ x: e.clientX, y: e.clientY });
    dispatch(POPUPVISIBILITY(!indexingData.popUpVisibility));
  }
  function handleRename(e) {
    e.preventDefault();
    dispatch(
      RENAME_LIST({ index: indexingData.listIndex, newListName: listName })
    );
    setListName("");
    dispatch(POPUPVISIBILITY(!indexingData.popUpVisibility));
  }

  function handleColorChange(color) {
    dispatch(
      CHANGE_LIST_COLOR({ index: indexingData.listIndex, color: color })
    );
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

  function rearrangeList() {
    console.log(
      todosRedux.map((x) => x.listName).indexOf(indexingData.onDragOverListName)
    );
    dispatch(
      CHANGE_LISTINDEX(
        todosRedux
          .map((x) => x.listName)
          .indexOf(indexingData.onDragOverListName)
      )
    );

    dispatch(
      CHANGE_LIST_POSITION({
        todoIndex: todosRedux
          .map((x) => x.listName)
          .indexOf(indexingData.onDragStartListName),
        newPositionIndex: todosRedux
          .map((x) => x.listName)
          .indexOf(indexingData.onDragOverListName),
      })
    );
  }

  return (
    <div className="schedulerWrapper">
      {taskProgressData.confettiBoom && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          opacity={taskProgressData.opacity}
        />
      )}
      <div className="leftSide">
        <h2>Your Lists:</h2>
        <div
          className="newListButton"
          onClick={(x) => {
            dispatch(ADD_LIST());
          }}
        >
          +
        </div>

        <div className="listWrapper">
          {typeof todosRedux === "object" &&
            todosRedux.map((x) => {
              return (
                <List
                  key={x.listName}
                  name={x.listName}
                  color={x.color}
                  nameShow={x.listNameShow}
                  todos={todosRedux}
                  popUpMenu={popUpMenu}
                  rearrangeList={rearrangeList}
                />
              );
            })}
        </div>
      </div>
      <div className="rightSide">
        <CreateTodo />
        <div className="todoWrapper">
          {typeof todosRedux &&
            todosRedux[indexingData.listIndex].todoArray.map((x) => {
              return (
                <Todo
                  key={x.id}
                  todo={x}
                  index={indexingData.listIndex}
                  rearrange={rearrange}
                />
              );
            })}
        </div>
      </div>
      {indexingData.popUpVisibility && (
        <PopUpMenuComp
          coords={coords}
          todos={todosRedux}
          index={indexingData.listIndex}
          visibility={() => {
            dispatch(POPUPVISIBILITY(!indexingData.popUpVisibility));
          }}
          renameFunc={(x) => {
            handleRename(x);
          }}
          colorChange={handleColorChange}
          listName={listName}
          deleteFunc={() => {
            dispatch(
              DELETE_LIST({
                index: indexingData.listIndex,
                zeName: todosRedux[indexingData.listIndex].listName,
              })
            );

            dispatch(POPUPVISIBILITY(!indexingData.popUpVisibility));
          }}
        />
      )}
    </div>
  );
}

export default Scheduler;
