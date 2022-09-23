import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./popUpMenu.css";
import { RENAME_LIST, ADD_DATE_LIST } from "../todoSlice";
import { resetState, setCalendar } from "./popupMenuSlice";
import Calendar from "react-calendar";
import { POPUPVISIBILITY, NEWLISTNAME } from "../indexingSlice";

localStorage.clear();

const ChangeDate = () => {
  const dispatch = useDispatch();
  const todosRedux = useSelector((store) => store.todo.data);
  console.log("todosRedux:", todosRedux);
  const indexingData = useSelector((store) => store.indexing.data);
  const subMenu = useSelector((store) => store.subMenu);
  const [calendarPick, setCalendarPick] = useState(new Date());
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
    // function pickListName() {
    //   return todosRedux[indexingData.listIndex].listNameShow != ""
    //     ? todosRedux[indexingData.listIndex].listNameShow
    //     : todosRedux[indexingData.listIndex].listName.replace(/_/, " ");
    // }
    // dispatch(
    //   NEWLISTNAME(
    //     `${displayDate[2].value.toString()}/${setMonth()}/${displayDate[3].value
    //       .toString()
    //       .slice(2, 4)}  ${pickListName().replace(
    //       /([0-9]{2}\/){2}([0-9]{2})(\s*)/,
    //       ""
    //     )}`
    //   )
    // );
  }
  useEffect(() => {
    if (subMenu.confC || subMenu.showCal) {
      insertCalendarDate();
    }
  }, [calendarPick]);
  return (
    <>
      <div
        className="confirmTab confirmTabAd"
        style={{
          height: `auto`,
          padding: `10px 0px`,
          width: `auto`,
        }}
      >
        <div>
          {/* <form
            className="nameChangeForm"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(
                RENAME_LIST({
                  index: indexingData.listIndex,
                  newListName: indexingData.newListName,
                })
              );
              dispatch(resetState());
              dispatch(POPUPVISIBILITY(false));
            }}
          >
            <input
              type="text"
              maxLength="256"
              required
              placeholder="Enter task here!"
              value={indexingData.newListName}
              onChange={(e) => dispatch(NEWLISTNAME(e.target.value))}
            /> */}
          <div
            className="todaysDateButton"
            onClick={() => {
              setCalendarPick(new Date());
              insertCalendarDate();
              dispatch(
                ADD_DATE_LIST({
                  index: indexingData.listIndex,
                  newData: `${displayDate[2].value.toString()}/${setMonth()}/${displayDate[3].value
                    .toString()
                    .slice(2, 4)}`,
                })
              );
              dispatch(resetState());
              dispatch(POPUPVISIBILITY(false));
            }}
          >
            Add today's date
          </div>

          <div
            className="todaysDateButton"
            // onClick={() =>
            //   setSubMenu({
            //     ...subMenu,
            //     showCal: !subMenu.showCal,
            //   })
            // }
          >
            Pick a date
          </div>
          {subMenu.showCal && (
            <div className="calendar">
              <Calendar onChange={setCalendarPick} value={calendarPick} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangeDate;
