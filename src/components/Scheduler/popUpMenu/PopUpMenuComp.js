import React, { useRef, useEffect } from "react";
import styles from "./popUpMenu.module.css";
import colorPalette from "../../pictures/colorPallete.png";
import pencil from "../../pictures/pencil.png";
import trashcan from "../../pictures/trashcan.png";
import calendar from "../../pictures/calendar.png";
import Delete from "./Delete";
import ChangeName from "./ChangeName";
import ChangeColor from "./ChangeColor";
import ChangeDate from "./ChangeDate";
import "react-calendar/dist/Calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { POPUPVISIBILITY } from "../indexingSlice";
import {
  setDelete,
  setColor,
  setRename,
  resetState,
  setCalendar,
} from "./popupMenuSlice";

function PopUpMenuComp() {
  const dispatch = useDispatch();
  const indexingData = useSelector((store) => store.indexing.data);

  const subMenu = useSelector((store) => store.subMenu.data);
  const refOne = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, [refOne]);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      dispatch(POPUPVISIBILITY(false));
    }
  };

  let mouseEvent;

  return (
    <div
      className={styles.popUpMenu}
      ref={refOne}
      onMouseLeave={(x) => {
        mouseEvent = setTimeout(() => {
          dispatch(resetState());
          dispatch(POPUPVISIBILITY(false));
        }, 500);
      }}
      onMouseEnter={(x) => {
        clearTimeout(mouseEvent);
      }}
      style={{
        top: indexingData.popUpCoords.y + "px",
        left: indexingData.popUpCoords.x + "px",
      }}
    >
      <div className={styles.popUpWrapper}>
        <div
          className={styles.popUpButton}
          onClick={() => {
            dispatch(resetState());
            dispatch(setRename(!subMenu.confN));
          }}
        >
          <div className={styles[`icon-pencil`]}>
            <img src={pencil} alt="" />
          </div>
        </div>
        <div
          className={styles.popUpButton}
          onClick={() => {
            dispatch(resetState());
            dispatch(setCalendar(!subMenu.confCal));
          }}
        >
          <div className={styles[`icon-calendar`]}>
            <img src={calendar} alt="" />
          </div>
        </div>
        <div
          className={styles.popUpButton}
          onClick={() => {
            dispatch(resetState());
            dispatch(setColor(!subMenu.confC));
          }}
        >
          <div className={styles[`icon-palette`]}>
            <img src={colorPalette} alt="color palette logo"></img>
          </div>
        </div>
        <div
          className={`${styles.popUpButton} ${styles.deleteButton}`}
          onClick={() => {
            dispatch(resetState());
            dispatch(setDelete(!subMenu.confD));
          }}
        >
          <div className={styles[`icon-trash`]}>
            <img src={trashcan} alt="" />
          </div>
        </div>
      </div>
      {subMenu.confD && <Delete />}
      {subMenu.confN && <ChangeName />}
      {subMenu.confC && <ChangeColor />}
      {subMenu.confCal && <ChangeDate />}
    </div>
  );
}

export default PopUpMenuComp;
