import React from "react";
import { useDispatch } from "react-redux";
import { ADD_LIST } from "./todoSlice";
import styles from "./createList.module.css";

const CreateList = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Your Lists:</h2>
      <div
        className={styles.newListButton}
        onClick={() => {
          dispatch(ADD_LIST());
        }}
      >
        +
      </div>
    </div>
  );
};

export default CreateList;
