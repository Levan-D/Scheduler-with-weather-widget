/** @format */
import styles from "./Scheduler.module.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todo from "./Todo/Todo";
import List from "./List";
import CreateTodo from "./Todo/CreateTodo";
import Confetti from "react-confetti";
import PopUpMenuComp from "./popUpMenu/PopUpMenuComp";
import CreateList from "./CreateList";
import { FETCH_TODODATA } from "./Todo/todoSlice";
import {
  SET_TASKSCOMPLETE,
  SET_TASKSTOTAL,
  SET_CONFETTIBOOM,
  SET_OPACITY,
} from "./taskProgressSlice";
import { getList } from "./apiScheduler/getListSlice";
import { CHANGE_LISTINDEX } from "./indexingSlice";
import { getTodo } from "./apiScheduler/getTodoSlice";

function Scheduler() {
  const dispatch = useDispatch();
  const todosRedux = useSelector((store) => store.todo.data);
  const isInitialData = useSelector((store) => store.todo.isInitialData);
  const taskProgressData = useSelector((store) => store.taskProgress.data);
  const indexingData = useSelector((store) => store.indexing.data);
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const listData = useSelector((store) => store.getList);
  const todoData = useSelector((store) => store.getTodo);

  useEffect(() => {
    if (!isLoggedIn) {
      if (!isInitialData) {
        localStorage.setItem("todoData", JSON.stringify(todosRedux));
      } else if (isInitialData) {
        dispatch(FETCH_TODODATA());
      }

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
    } else if (isLoggedIn) {
      dispatch(
        SET_TASKSCOMPLETE({
          tasksComplete: todoData.data.filter((x) => x.is_completed === true)
            .length,
        })
      );
      dispatch(
        SET_TASKSTOTAL({
          tasksTotal: todoData.data.length,
        })
      );
    }
  }, [
    todosRedux,
    indexingData.newListName,
    indexingData.listIndex,
    todoData.data,
  ]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getList());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && listData.success && listData.data.length > 0) {
      dispatch(getTodo(listData.data[indexingData.listIndex].id));
    }
  }, [listData, indexingData.listIndex]);

  useEffect(() => {
    if (isLoggedIn && listData.success) {
      dispatch(CHANGE_LISTINDEX(0));
    }
  }, []);

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

  return (
    <div className={styles.schedulerWrapper}>
      {taskProgressData.confettiBoom && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          opacity={taskProgressData.opacity}
        />
      )}
      <div className={styles.leftSide}>
        <CreateList />
        <div>
          {typeof todosRedux === "object" &&
            !isLoggedIn &&
            todosRedux.map((x) => {
              return (
                <List
                  key={x.listName}
                  name={x.listName}
                  color={x.color}
                  nameShow={x.listNameShow.name}
                  date={x.listNameShow.date}
                />
              );
            })}
          {isLoggedIn &&
            listData.data.map((list) => {
              return (
                <List
                  key={list.created_at}
                  list={list}
                  id={list.id}
                  name={list.title}
                  color={list.color}
                  position={list.position}
                  date={list.reminder_at}
                />
              );
            })}
        </div>
      </div>
      <div className={styles.rightSide}>
        <CreateTodo />
        <div className={styles.todoWrapper}>
          {typeof todosRedux &&
            !isLoggedIn &&
            typeof indexingData.listIndex === "number" &&
            todosRedux[indexingData.listIndex].todoArray.map((todo) => {
              return <Todo key={todo.id} todo={todo} name={todo.id} />;
            })}
          {isLoggedIn &&
            listData.data.length > 0 &&
            typeof indexingData.listIndex === "number" &&
            todoData.data.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  name={todo.description}
                  date={todo.created_at}
                />
              );
            })}
        </div>
      </div>
      {indexingData.popUpVisibility && <PopUpMenuComp />}
    </div>
  );
}

export default Scheduler;
