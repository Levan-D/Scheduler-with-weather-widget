/** @format */
import "./SchedulerRight.css";
import "./SchedulerLeft.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todo from "./Todo";
import List from "./List";
import ProgressBar from "../ProgressBar/ProgressBar";
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

function Scheduler() {
  const dispatch = useDispatch();
  const todosRedux = useSelector((store) => store.todo.data);
  const isInitialData = useSelector((store) => store.todo.isInitialData);
  const taskProgressData = useSelector((store) => store.taskProgress.data);

  const [taskName, setTaskName] = useState("");
  const [taskRename, setTaskRename] = useState("");
  function setTaskRenameF(rename) {
    setTaskRename(rename);
  }
  const [listName, setListName] = useState("");
  const [popUpVisibility, setPopUpVisibility] = useState(false);
  const [index, setIndex] = useState(0);
  const [todoIndex, setTodoIndex] = useState("");
  const [baseListName, setBaseListName] = useState("");
  function setBaseListNameF(name) {
    setBaseListName(name);
  }
  const [currentListName, setCurrentListName] = useState("");
  function setCurrentListNameF(name) {
    setCurrentListName(name);
  }
  const [newtodoid, settodoid] = useState(0);
  function settodoidf(x) {
    settodoid(x);
  }
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  function setIndexCh(i) {
    setIndex(i);
  }

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
        tasksComplete: todosRedux[index].todoArray.filter(
          (x) => x.complete === true
        ).length,
      })
    );
    dispatch(
      SET_TASKSTOTAL({ tasksTotal: todosRedux[index].todoArray.length })
    );
  }, [todosRedux, index]);

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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(ADD_TODO({ taskName: taskName, index: index }));

    setTaskName("");
  }

  function handleList(e) {
    const regex = /^(List)+[0-9]*/gi;
    if (regex.test(e.target.classList[0])) {
      setIndex(
        todosRedux.map((x) => x.listName).indexOf(e.target.classList[0])
      );
    }
  }
  function setTodoIndexF(todoId) {
    setTodoIndex({
      todoId: todoId,
      todoIndex: todosRedux[index].todoArray.map((x) => x.id).indexOf(todoId),
    });
  }
  function popUpMenu(e) {
    setCoords({ x: e.clientX, y: e.clientY });
    setPopUpVisibility(!popUpVisibility);
  }
  function handleRename(e) {
    e.preventDefault();
    dispatch(RENAME_LIST({ index: index, newListName: listName }));

    setListName("");
  }
  function handleRenameTodo(e) {
    e.preventDefault();
    dispatch(
      RENAME_TODO({
        taskRename: taskRename.rename,
        id: taskRename.id,
        index: index,
      })
    );

    setTaskRename({ rename: "", id: "", show: false });
  }
  function setListNameF(name) {
    setListName(name);
  }
  function handleColorChange(color) {
    dispatch(CHANGE_LIST_COLOR({ index: index, color: color }));
  }
  function rearrange() {
    let newPosition = todosRedux[index].todoArray
      .map((x) => x.id)
      .indexOf(newtodoid);
    dispatch(
      CHANGE_TODO_POSITION({
        index: index,
        todoId: todoIndex.todoId,
        todoIndex: todoIndex.todoIndex,
        newPositionIndex: newPosition,
        newtodoid: newtodoid,
      })
    );
  }

  function rearrangeList() {
    setIndexCh(todosRedux.map((x) => x.listName).indexOf(currentListName));
    dispatch(
      CHANGE_LIST_POSITION({
        index: index,
        todoId: baseListName,
        todoIndex: todosRedux.map((x) => x.listName).indexOf(baseListName),
        newPositionIndex: todosRedux
          .map((x) => x.listName)
          .indexOf(currentListName),
        newtodoid: currentListName,
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
                  listSelect={handleList}
                  index={index}
                  todos={todosRedux}
                  popUpMenu={popUpMenu}
                  popUpVisibility={popUpVisibility}
                  setlistnameFA={setListNameF}
                  rearrangeList={rearrangeList}
                  setCurrentListNameF={setCurrentListNameF}
                  setBaseListNameF={setBaseListNameF}
                  currentListName={currentListName}
                />
              );
            })}
        </div>
      </div>
      <div className="rightSide">
        <h2>
          Add a new task below! ({taskProgressData.tasksComplete}/
          {taskProgressData.tasksTotal})
          <ProgressBar
            tasksComplete={taskProgressData.tasksComplete}
            tasksTotal={taskProgressData.tasksTotal}
            width={315}
            height={10}
            background={`#354259`}
          />
        </h2>
        <form onSubmit={handleSubmit} className="renameForm">
          <input
            type="text"
            required
            placeholder="Enter task here!"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input type="submit" value="+" className="bigSubmitButton" />
        </form>
        <div className="todoWrapper">
          {typeof todosRedux &&
            todosRedux[index].todoArray.map((x) => {
              return (
                <Todo
                  key={x.id}
                  todo={x}
                  handleRenameTodo={handleRenameTodo}
                  setTaskRenameF={setTaskRenameF}
                  taskRename={taskRename}
                  index={index}
                  setTodoIndexF={setTodoIndexF}
                  rearrange={rearrange}
                  settodoidf={settodoidf}
                  newtodoid={newtodoid}
                />
              );
            })}
        </div>
      </div>
      {popUpVisibility && (
        <PopUpMenuComp
          coords={coords}
          todos={todosRedux}
          index={index}
          visibility={(x) => {
            setPopUpVisibility(!popUpVisibility);
          }}
          renameFunc={(x) => {
            handleRename(x);
            setPopUpVisibility(!popUpVisibility);
          }}
          setlistnameFA={setListNameF}
          colorChange={handleColorChange}
          listName={listName}
          deleteFunc={() => {
            dispatch(
              DELETE_LIST({
                index: index,
                zeName: todosRedux[index].listName,
              })
            );

            setPopUpVisibility(!popUpVisibility);
          }}
        />
      )}
    </div>
  );
}

export default Scheduler;
