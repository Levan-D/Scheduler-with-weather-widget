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
  } else if (isLoggedIn && todo.updated_at) {
    markedDate = (
      <span>
        {todo.updated_at.slice(11, 16)} <br />
        {todo.updated_at.slice(2, 10)}
      </span>
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
  } else if (isLoggedIn) {
    dataObject = (
      <span>
        {date.slice(11, 16)} <br />
        {date.slice(2, 10)}
      </span>
    );
  }

  return (
    <>
      <div className={styles.timeStampWrapper}>
        <div className={styles.stampWrapper}>
          <div>{dataObject}</div>
        </div>
      </div>

      <div
        className={styles.markedStampWrapper}
        style={
          todo.complete || todo.is_completed
            ? { backgroundColor: "#92ba92", color: "#f0f0f0" }
            : { backgroundColor: `#f0f0f0` }
        }
      >
        <div className={styles.stampWrapper}>
          {todo.complete || todo.is_completed ? (
            markedDate
          ) : (
            <span>
              Not <br /> Complete
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoDate;
