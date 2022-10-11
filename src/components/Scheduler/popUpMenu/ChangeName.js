/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./popUpMenu.module.css";
import { RENAME_LIST } from "../Todo/todoSlice";
import { resetState } from "./popupMenuSlice";
import { POPUPVISIBILITY, NEWLISTNAME } from "../indexingSlice";
import { renameList } from "../apiScheduler/renameListSlice";

const ChangeName = () => {
  const dispatch = useDispatch();
  const indexingData = useSelector((store) => store.indexing.data);
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const asdf = useSelector((store) => store.renameList);
  const listData = useSelector((store) => store.getList.data);
  const deleteListId = isLoggedIn ? listData[indexingData.listIndex].id : null;
  console.log("asdf:", asdf, deleteListId);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      dispatch(
        RENAME_LIST({
          index: indexingData.listIndex,
          newListName: indexingData.newListName,
        })
      );
    } else if (isLoggedIn) {
      dispatch(
        renameList({
          title: deleteListId,
          data: { title: indexingData.newListName },
        })
      );
    }
    dispatch(resetState());
    dispatch(POPUPVISIBILITY(false));
  };
  return (
    <>
      <div
        className={`${styles.confirmTab} ${styles.confirmTabAd}`}
        style={{
          height: `auto`,
          padding: `10px 0px`,
          width: `auto`,
        }}
      >
        <div>
          <form className={styles.nameChangeForm} onSubmit={handleSubmit}>
            <input
              className={styles.textInput}
              type="text"
              maxLength="256"
              autoFocus={true}
              required
              placeholder="Enter task here!"
              value={indexingData.newListName}
              onChange={(e) => dispatch(NEWLISTNAME(e.target.value))}
            />
            <input
              className={styles.submitInput}
              type="submit"
              value="Rename"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeName;
