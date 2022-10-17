/** @format */

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./popUpMenu.module.css"
import { RENAME_LIST } from "../Todo/todoSlice"
import { resetState } from "./popupMenuSlice"
import { POPUPVISIBILITY, NEWLISTNAME } from "../indexingSlice"
import { patchList } from "../apiScheduler/patchListSlice"
import { renameListInter } from "../apiScheduler/getListSlice"

const ChangeName = () => {
  const dispatch = useDispatch()
  const indexingData = useSelector(store => store.indexing.data)
  const isLoggedIn = useSelector(store => store.indexing.data.isLoggedIn)
  const asdf = useSelector(store => store.patchList)
  const listData = useSelector(store => store.getList.data)
  const currentListId = isLoggedIn ? listData[indexingData.listIndex].id : null

  const handleSubmit = e => {
    e.preventDefault()
    if (!isLoggedIn) {
      dispatch(
        RENAME_LIST({
          index: indexingData.listIndex,
          newListName: indexingData.newListName,
        })
      )
    } else if (isLoggedIn) {
      dispatch(
        patchList({
          title: currentListId,
          data: { title: indexingData.newListName },
        })
      )
      dispatch(
        renameListInter({
          index: indexingData.listIndex,
          data: indexingData.newListName,
        })
      )
    }
    dispatch(resetState())
    dispatch(POPUPVISIBILITY(false))
  }
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
              onChange={e => dispatch(NEWLISTNAME(e.target.value))}
            />
            <input className={styles.submitInput} type="submit" value="Rename" />
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangeName
