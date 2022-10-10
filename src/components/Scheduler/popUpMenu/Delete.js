/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./popUpMenu.module.css";
import { DELETE_LIST } from "../Todo/todoSlice";
import { POPUPVISIBILITY, CHANGE_LISTINDEX } from "../indexingSlice";
import { resetState } from "./popupMenuSlice";
import { deleteList } from "../apiScheduler/deleteListSlice";
import { deleteListInter } from "../apiScheduler/getListSlice";

const Delete = () => {
  const dispatch = useDispatch();
  const todosRedux = useSelector((store) => store.todo.data);
  const indexingData = useSelector((store) => store.indexing.data);
  const listData = useSelector((store) => store.getList.data);
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const deleteListData = useSelector((store) => store.deleteList);
  const deleteListId = isLoggedIn ? listData[indexingData.listIndex].id : null;

  const handleDelete = () => {
    if (!isLoggedIn) {
      if (todosRedux.length > 1) {
        if (indexingData.listIndex !== 0) {
          dispatch(CHANGE_LISTINDEX(indexingData.listIndex - 1));
        }
        dispatch(
          DELETE_LIST({
            index: indexingData.listIndex,
            zeName: todosRedux[indexingData.listIndex].listName,
          })
        );
      }
    } else if (isLoggedIn && !deleteListData.loading) {
      dispatch(deleteList(deleteListId));
      dispatch(deleteListInter(indexingData.listIndex));
      if (indexingData.listIndex !== 0) {
        dispatch(CHANGE_LISTINDEX(indexingData.listIndex - 1));
      }
    }
    dispatch(resetState());
    dispatch(POPUPVISIBILITY(false));
  };
  return (
    <>
      <div className={`${styles.confirmTab} ${styles.confirmTabAc}`}>
        <div onClick={handleDelete}>Confirm</div>
      </div>
    </>
  );
};

export default Delete;
