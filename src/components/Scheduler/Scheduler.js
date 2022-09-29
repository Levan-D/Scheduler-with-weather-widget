/** @format */
import styles from "./Scheduler.module.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todo from "./Todo";
import List from "./List";
import CreateTodo from "./CreateTodo";
import Confetti from "react-confetti";
import PopUpMenuComp from "./popUpMenu/PopUpMenuComp";
import CreateList from "./CreateList";
import { FETCH_TODODATA } from "./todoSlice";
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
  const indexingData = useSelector((store) => store.indexing.data);

  useEffect(() => {
    if (!isInitialData) {
      localStorage.setItem("todoData", JSON.stringify(todosRedux));
    }
    if (isInitialData) {
      dispatch(FETCH_TODODATA());
    }
  }, [todosRedux, indexingData.newListName]);

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
  console.log("indexingData.listIndex:", indexingData.listIndex);
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
        </div>
      </div>
      <div className={styles.rightSide}>
        <CreateTodo />
        <div className={styles.todoWrapper}>
          {typeof todosRedux &&
            typeof indexingData.listIndex === "number" &&
            todosRedux[indexingData.listIndex].todoArray.map((x) => {
              return <Todo key={x.id} todo={x} name={x.id} />;
            })}
        </div>
      </div>
      {indexingData.popUpVisibility && <PopUpMenuComp />}
    </div>
  );
}

export default Scheduler;
