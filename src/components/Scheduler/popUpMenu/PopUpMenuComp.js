import React, { useRef, useEffect, useState } from "react";
import "./popUpMenu.css";
import colorPalette from "../pictures/colorPallete.png";
import pencil from "../pictures/pencil.png";
import calendar from "../pictures/calendar.png";
import trashcan from "../pictures/trashcan.png";

import Delete from "./Delete";
import Rename from "./Rename";
import "react-calendar/dist/Calendar.css";
import { useSelector, useDispatch } from "react-redux";

import { RENAME_LIST, CHANGE_LIST_COLOR, DELETE_LIST } from "../todoSlice";

import {
  POPUPVISIBILITY,
  NEWLISTNAME,
  CHANGE_LISTINDEX,
} from "../indexingSlice";

import { setDelete, setColor, setRename, resetState } from "./popupMenuSlice";

function PopUpMenuComp() {
  const dispatch = useDispatch();
  const todosRedux = useSelector((store) => store.todo.data);
  const indexingData = useSelector((store) => store.indexing.data);
  const subMenu = useSelector((store) => store.subMenu.data);



  const colors = [
    `#f0f0f0`,
    `#191919`,
    `#323232`,
    `#4c4c4c`,
    `#D3D3D3`,

    `#9ED2C6`,
    `#54BAB9`,
    `#F7ECDE`,
    `#E9DAC1`,

    `#D6EFED`,
    `#8CC0DE`,
    `#1572A1`,
    `#11324D`,

    `#C4DFAA`,
    `#70AF85`,
    `#3A6351`,
    `#064420`,

    `#FFE9AE`,
    `#FFDBA4`,
    `#FFB3B3`,
    `#F4BFBF`,

    `#AF7AB3`,
    `#80558C`,
    `#726A95`,
    `#660066`,

    `#FF7878`,
    `#D35D6E`,
    `#D45079`,
    `#C84361`,
    `#42032C`,
  ];

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
            dispatch(setRename());
          }}
        >
          <div className="icon-pencil">
            <img src={pencil} alt="" />
          </div>
        </div>
        <div
          className="popUpButton"
          onClick={() => {
            dispatch(setColor());
          }}
        >
          <div className="icon-palette">
            <img src={colorPalette} alt="color palette logo"></img>
          </div>
        </div>
        <div
          className="popUpButton deleteButton"
          onClick={() => {
            dispatch(setDelete());
          }}
        >
          <div className="icon-trash">
            <img src={trashcan} alt="" />
          </div>
        </div>
      </div>
      {subMenu.confD && <Delete />}

      {subMenu.confN && <Rename />}

      {subMenu.confC && (
        <div className="colorBox confirmTab confirmTabAd">
          {colors.map((x, i) => {
            return (
              <div
                className="colorCircle popUpButton"
                onClick={() =>
                  dispatch(
                    CHANGE_LIST_COLOR({
                      index: indexingData.listIndex,
                      color: colors[i],
                    })
                  )
                }
                style={{ backgroundColor: x }}
                key={i}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PopUpMenuComp;
