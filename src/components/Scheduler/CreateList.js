import React from "react";
import { useDispatch } from "react-redux";
import { ADD_LIST } from "./todoSlice";
const CreateList = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Your Lists:</h2>
      <div
        className="newListButton"
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
