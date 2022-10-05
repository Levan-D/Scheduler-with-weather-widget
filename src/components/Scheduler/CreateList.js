import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_LIST } from "./todoSlice";
import styles from "./createList.module.css";
import { createList } from "./todoCreateListApiSlice";
import { pushNewList } from "./todoGetListApiSlice";

const CreateList = () => {
  const isLoggedin = useSelector((store) => store.indexing.data.isLoggedIn);
  const listData = useSelector((store) => store.listApi.data);
  const createListData = useSelector((store) => store.createListApi);
  const dispatch = useDispatch();

  useEffect(() => {
    if (createListData.success) {
      if (listData.find((list) => list.id === createListData.data.id)) {
        return;
      } else dispatch(pushNewList(createListData.data));
    }
  }, [createListData.loading]);

  const handleCreate = () => {
    if (isLoggedin) {
      if (!createListData.loading) {
        dispatch(createList({ title: `New List ${listData.length} ` }));
      }
    } else if (!isLoggedin) {
      dispatch(ADD_LIST());
    }
  };
  return (
    <div>
      <h2 className={styles.header}>Your Lists:</h2>
      <div className={styles.newListButton} onClick={handleCreate}>
        +
      </div>
    </div>
  );
};

export default CreateList;
