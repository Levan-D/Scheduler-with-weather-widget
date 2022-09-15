import React, { useRef, useEffect, useState } from "react";
import "./popUpMenu.css";
import colorPalette from "./pictures/colorPalette.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector, useDispatch } from "react-redux";

import { RENAME_LIST, CHANGE_LIST_COLOR, DELETE_LIST } from "./todoSlice";

import {
  POPUPVISIBILITY,
  NEWLISTNAME,
  CHANGE_LISTINDEX,
} from "./indexingSlice";

function PopUpMenuComp() {
  const dispatch = useDispatch();
  const todosRedux = useSelector((store) => store.todo.data);
  const indexingData = useSelector((store) => store.indexing.data);

  const [subMenu, setSubMenu] = useState({
    confD: false,
    confN: false,
    confC: false,
    showCal: false,
  });
  const [calendarPick, setCalendarPick] = useState(new Date());

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
      dispatch(POPUPVISIBILITY(!indexingData.popUpVisibility));
    }
  };
  function insertCalendarDate() {
    const monthsShort = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let displayDate = calendarPick
      .toString()
      .split(" ")
      .map((str, index) => ({
        value: str,
        id: index + 1,
      }));
    function setMonth() {
      if (monthsShort.indexOf(displayDate[1].value) + 1 < 10) {
        return `0${(monthsShort.indexOf(displayDate[1].value) + 1).toString()}`;
      } else if (monthsShort.indexOf(displayDate[1].value) + 1 >= 10) {
        return (monthsShort.indexOf(displayDate[1].value) + 1).toString();
      }
    }
    function pickListName() {
      return todosRedux[indexingData.listIndex].listNameShow != ""
        ? todosRedux[indexingData.listIndex].listNameShow
        : todosRedux[indexingData.listIndex].listName.replace(/_/, " ");
    }
    dispatch(
      NEWLISTNAME(
        `${displayDate[2].value.toString()}/${setMonth()}/${displayDate[3].value
          .toString()
          .slice(2, 4)}  ${pickListName().replace(
          /([0-9]{2}\/){2}([0-9]{2})(\s*)/,
          ""
        )}`
      )
    );
  }
  useEffect(() => {
    if (subMenu.confC || subMenu.showCal) {
      insertCalendarDate();
    }
  }, [calendarPick]);
  let mouseEvent;

  return (
    <div
      className="popUpMenu"
      ref={refOne}
      onMouseLeave={(x) => {
        mouseEvent = setTimeout(() => {
          dispatch(POPUPVISIBILITY(!indexingData.popUpVisibility));
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
            setSubMenu({
              confD: false,
              confN: !subMenu.confN,
              confC: false,
              showCal: false,
            });
          }}
        >
          <div className="pencil"></div>
        </div>
        <div
          className="popUpButton"
          onClick={() => {
            setSubMenu({
              confD: false,
              confN: false,
              confC: !subMenu.confC,
              showCal: false,
            });
          }}
        >
          <img
            className="img"
            src={colorPalette}
            alt="color palette logo"
          ></img>
        </div>
        <div
          className="popUpButton deleteButton"
          onClick={() => {
            setSubMenu({
              confD: !subMenu.confD,
              confN: false,
              confC: false,
              showCal: false,
            });
          }}
        >
          <div className="icon-trash">
            <div className="trash-lid"></div>
            <div className="trash-container"></div>
            <div className="trash-line-1"></div>
            <div className="trash-line-2"></div>
            <div className="trash-line-3"></div>
          </div>
        </div>
      </div>
      {subMenu.confD && (
        <div className="confirmTab confirmTabAc">
          <div
            onClick={() => {
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
              dispatch(POPUPVISIBILITY(!indexingData.popUpVisibility));
            }}
          >
            Confirm
          </div>
        </div>
      )}

      {subMenu.confN && (
        <div
          className="confirmTab confirmTabAd"
          style={{
            height: `auto`,
            padding: `10px 0px`,
            width: `auto`,
          }}
        >
          <div>
            <form
              className="nameChangeForm"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  RENAME_LIST({
                    index: indexingData.listIndex,
                    newListName: indexingData.newListName,
                  })
                );
                dispatch(POPUPVISIBILITY(!indexingData.popUpVisibility));
              }}
            >
              <input
                type="text"
                maxLength="256"
                required
                placeholder="Enter task here!"
                value={indexingData.newListName}
                onChange={(e) => dispatch(NEWLISTNAME(e.target.value))}
              />
              <div
                className="todaysDateButton"
                onClick={() => {
                  setCalendarPick(new Date());
                  insertCalendarDate();
                }}
              >
                Add today's date
              </div>

              <div
                className="todaysDateButton"
                onClick={() =>
                  setSubMenu({
                    ...subMenu,
                    showCal: !subMenu.showCal,
                  })
                }
              >
                Pick a date
              </div>
              {subMenu.showCal && (
                <div className="calendar">
                  <Calendar onChange={setCalendarPick} value={calendarPick} />
                </div>
              )}
              <input type="submit" value="Rename" />
            </form>
          </div>
        </div>
      )}
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
