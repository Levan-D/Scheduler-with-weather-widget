/** @format */
import ProgressBar from "../ProgressBar/ProgressBar";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Dots } from "../pictures/dots.svg";
import styles from "./list.module.css";

import {
  CHANGE_LISTINDEX,
  ONDRAGSTART,
  ONDRAGOVER,
  POPUPVISIBILITY,
  NEWLISTNAME,
  POPUPCOORDS,
  LISTDRAGGING,
} from "./indexingSlice";

import { CHANGE_LIST_POSITION } from "./todoSlice";

function List({ name, nameShow, color, date }) {
  const dispatch = useDispatch();
  const indexingData = useSelector((store) => store.indexing.data);
  const todosRedux = useSelector((store) => store.todo.data);
  const [dragging, setDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  let hoverEvent;

  const refTwo = useRef(null);
  // useEffect(() => {
  //   document.addEventListener("mousemove", handleClickOutside, true);
  // }, [refTwo]);

  const handleClickOutside = (e) => {
    if (!refTwo.current.contains(e.target)) {
      setIsHovering(false);
    }
  };

  function invertColor(hex, bw) {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      // https://stackoverflow.com/a/3943023/112731
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#F0F0F0";
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
  }
  function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
  }

  function handleList(e) {
    const regex = /^(List)+[0-9]*/gi;
    if (regex.test(e.target.classList[0])) {
      dispatch(
        CHANGE_LISTINDEX(
          todosRedux.map((x) => x.listName).indexOf(e.target.classList[0])
        )
      );
    }
  }

  function rearrangeList() {
    dispatch(
      CHANGE_LISTINDEX(
        todosRedux
          .map((x) => x.listName)
          .indexOf(indexingData.onDragOverListName)
      )
    );
    dispatch(
      CHANGE_LIST_POSITION({
        todoIndex: todosRedux
          .map((x) => x.listName)
          .indexOf(indexingData.onDragStartListName),
        newPositionIndex: todosRedux
          .map((x) => x.listName)
          .indexOf(indexingData.onDragOverListName),
      })
    );
  }

  return (
    <div
      onClick={(e) => {
        handleList(e);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        dispatch(ONDRAGOVER(name));
      }}
    >
      <div
        onMouseEnter={() => {
          hoverEvent = setTimeout(() => {
            setIsHovering(true);
          }, 1000);
        }}
        onMouseLeave={() => {
          setIsHovering(!true);
          clearTimeout(hoverEvent);
        }}
        ref={refTwo}
        className={`${
          name === todosRedux[indexingData.listIndex].listName
            ? styles.selectedList
            : ""
        } ${
          indexingData.onDragOverListName &&
          indexingData.ListDragging &&
          indexingData.onDragOverListName === name
            ? styles.afterGlowList
            : ""
        }  ${styles.containerList}`}
        style={{
          color:
            color !== "default"
              ? invertColor(color.substring(1), `bw`)
              : "#354259",
          backgroundColor: color !== "default" ? color : "",
          border:
            name === todosRedux[indexingData.listIndex].listName
              ? `2px solid ${invertColor(color.substring(1), `bw`)}`
              : "",
        }}
        draggable="true"
        onDragStart={() => {
          if (!dragging) {
            setDragging(true);
            dispatch(LISTDRAGGING(true));
            dispatch(ONDRAGSTART(name));
          }
        }}
        onDragEnd={() => {
          rearrangeList();
          dispatch(LISTDRAGGING(false));
          setDragging(false);
        }}
      >
        <div className={`${name} ${styles.nameList}`}>
          {date !== "" ? date : ""}
          {nameShow !== "" ? nameShow : name.replace(/_/, " ")}
        </div>
        {isHovering &&
          !indexingData.popUpVisibility &&
          !dragging &&
          nameShow.length > 26 && (
            <div className={styles.hoverName}>
              {nameShow !== "" ? nameShow : name.replace(/_/, " ")}
            </div>
          )}
        {name === todosRedux[indexingData.listIndex].listName && (
          <div
            className={styles.tripleDot}
            onClick={(e) => {
              dispatch(NEWLISTNAME(""));
              dispatch(POPUPCOORDS({ x: e.clientX, y: e.clientY }));
              dispatch(POPUPVISIBILITY(!indexingData.popUpVisibility));
            }}
          >
            <div>
              <Dots
                className={`${styles.dotdot}`}
                fill={
                  color !== "default"
                    ? invertColor(color.substring(1), `bw`)
                    : "#354259"
                }
              />
            </div>
          </div>
        )}
      </div>

      <ProgressBar
        tasksComplete={
          todosRedux[
            todosRedux.map((x) => x.listName).indexOf(name)
          ].todoArray.filter((x) => x.complete === true).length
        }
        tasksTotal={
          todosRedux[todosRedux.map((x) => x.listName).indexOf(name)].todoArray
            .length
        }
        width={170}
        height={3}
        background={`#6e85b7`}
      />
    </div>
  );
}

export default List;
