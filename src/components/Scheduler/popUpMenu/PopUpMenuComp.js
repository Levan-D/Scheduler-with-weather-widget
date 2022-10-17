/** @format */

import React from "react"
import styles from "./popUpMenu.module.css"
import colorPalette from "../../pictures/colorPallete.png"
import pencil from "../../pictures/pencil.png"
import trashcan from "../../pictures/trashcan.png"
import calendar from "../../pictures/calendar.png"
import Delete from "./Delete"
import ChangeName from "./ChangeName"
import ChangeColor from "./ChangeColor"
import ChangeDate from "./ChangeDate"
import "react-calendar/dist/Calendar.css"
import { useSelector, useDispatch } from "react-redux"
import { POPUPVISIBILITY } from "../indexingSlice"
import { setDelete, setColor, setRename, resetState, setCalendar } from "./popupMenuSlice"

function PopUpMenuComp() {
  const dispatch = useDispatch()
  const indexingData = useSelector(store => store.indexing.data)

  const subMenu = useSelector(store => store.subMenu.data)

  let mouseEvent

  const menuStyle = {
    top: indexingData.popUpCoords.y + "px",
    left: indexingData.popUpCoords.x + "px",
  }
  const handleMouseLeave = e => {
    mouseEvent = setTimeout(() => {
      dispatch(resetState())
      dispatch(POPUPVISIBILITY(false))
    }, 500)
  }
  const handleMouseEnter = e => {
    clearTimeout(mouseEvent)
  }
  return (
    <div
      className={styles.popUpMenu}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={menuStyle}
    >
      <div className={styles.popUpWrapper}>
        <div
          className={styles.popUpButton}
          onClick={() => {
            dispatch(resetState())
            dispatch(setRename(!subMenu.confN))
          }}
        >
          <div className={styles[`icon-pencil`]}>
            <img src={pencil} alt="pencil icon" />
          </div>
        </div>
        <div
          className={styles.popUpButton}
          onClick={() => {
            dispatch(resetState())
            dispatch(setCalendar(!subMenu.confCal))
          }}
        >
          <div className={styles[`icon-calendar`]}>
            <img src={calendar} alt="calendar icon" />
          </div>
        </div>
        <div
          className={styles.popUpButton}
          onClick={() => {
            dispatch(resetState())
            dispatch(setColor(!subMenu.confC))
          }}
        >
          <div className={styles[`icon-palette`]}>
            <img src={colorPalette} alt="color palette icon"></img>
          </div>
        </div>
        <div
          className={`${styles.popUpButton} ${styles.deleteButton}`}
          onClick={() => {
            dispatch(resetState())
            dispatch(setDelete(!subMenu.confD))
          }}
        >
          <div className={styles[`icon-trash`]}>
            <img src={trashcan} alt="trash icon" />
          </div>
        </div>
      </div>
      {subMenu.confD && <Delete />}
      {subMenu.confN && <ChangeName />}
      {subMenu.confC && <ChangeColor />}
      {subMenu.confCal && <ChangeDate />}
    </div>
  )
}

export default PopUpMenuComp
