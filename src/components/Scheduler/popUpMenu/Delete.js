/** @format */

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./popUpMenu.module.css"
import { DELETE_LIST } from "../todoSlice"
import { POPUPVISIBILITY, CHANGE_LISTINDEX } from "../indexingSlice"
import { resetState } from "./popupMenuSlice"

const Delete = () => {
  const dispatch = useDispatch()
  const todosRedux = useSelector(store => store.todo.data)
  const indexingData = useSelector(store => store.indexing.data)

  const handleDelete = () => {
    if (todosRedux.length > 1) {
      if (indexingData.listIndex !== 0) {
        dispatch(CHANGE_LISTINDEX(indexingData.listIndex - 1))
      }
      dispatch(
        DELETE_LIST({
          index: indexingData.listIndex,
          zeName: todosRedux[indexingData.listIndex].listName,
        })
      )
    }
    dispatch(resetState())
    dispatch(POPUPVISIBILITY(false))
  }
  return (
    <>
      <div className={`${styles.confirmTab} ${styles.confirmTabAc}`}>
        <div onClick={handleDelete}>Confirm</div>
      </div>
    </>
  )
}

export default Delete
