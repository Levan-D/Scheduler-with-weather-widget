import React, { useRef, useEffect, useState } from "react";
import "./popUpMenu.css";
import colorPalette from "../pictures/colorPallete.png";
import pencil from "../pictures/pencil.png";
import trashcan from "../pictures/trashcan.png";
import calendar from "../pictures/calendar.png";
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
      className="popUpMenu"
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
      <div className="popUpWrapper">
        <div
          className="popUpButton"
          onClick={() => {
            dispatch(setRename(!subMenu.confN));
          }}
        >
          <div className="icon-pencil">
            <img src={pencil} alt="" />
          </div>
        </div>
        <div
          className="popUpButton"
          onClick={() => {
            dispatch(setCalendar(!subMenu.confCal));
          }}
        >
          <div className="icon-calendar">
            <img src={calendar} alt="" />
          </div>
        </div>
        <div
          className="popUpButton"
          onClick={() => {
            dispatch(setColor(!subMenu.confC));
          }}
        >
          <div className="icon-palette">
            <img src={colorPalette} alt="color palette logo"></img>
          </div>
        </div>
        <div
          className="popUpButton deleteButton"
          onClick={() => {
            dispatch(setDelete(!subMenu.confD));
          }}
        >
          <div className="icon-trash">
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
