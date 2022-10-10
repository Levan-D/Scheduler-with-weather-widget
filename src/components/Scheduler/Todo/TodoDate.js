import React from "react";
import { useSelector } from "react-redux";
import styles from "./todo.module.css";

const TodoDate = ({ todo, date }) => {
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);

  let markedDate;
  if (!isLoggedIn && todo.completeDate) {
    let marked = todo.completeDate?.split(" ").map((str, index) => ({
      value: str,
      id: index + 1,
    }));
    markedDate = (
      <>
        {marked[4].value.slice(0, 5)} <br />
        {marked[0].value}&nbsp;
        {marked[1].value}&nbsp;
        {marked[2].value}{" "}
      </>
    );
  }

  let dataObject;
  if (!isLoggedIn) {
    let dateArray = todo.time.split(" ").map((str, index) => ({
      value: str,
      id: index + 1,
    }));
    dataObject = (
      <>
        {dateArray[4].value.slice(0, 5)} <br /> {dateArray[0].value}&nbsp;
        {dateArray[1].value} {dateArray[2].value}
      </>
    );
  }

  return (
    <>
      <div className={styles.timeStampWrapper}>
        <div className={styles.stampWrapper}>
          <div>
            {!isLoggedIn && dataObject}
            {isLoggedIn && date}
          </div>
        </div>
      </div>
      <div
        className={styles.markedStampWrapper}
        style={
          todo.complete
            ? { backgroundColor: "#92ba92", color: "#f0f0f0" }
            : { backgroundColor: `#f0f0f0` }
        }
      >
        <div className={styles.stampWrapper}>
          {todo.complete && markedDate}
          {!todo.complete && (
            <div>
              Not <br /> Complete
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoDate;
