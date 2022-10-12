/** @format */
import ProgressBar from "../ProgressBar/ProgressBar";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Dots } from "../pictures/dots.svg";
import styles from "./list.module.css";
import invertColor from "./ColorInverter";

import {
  CHANGE_LISTINDEX,
  ONDRAGSTART,
  ONDRAGOVER,
  POPUPVISIBILITY,
  NEWLISTNAME,
  POPUPCOORDS,
  LISTDRAGGING,
} from "./indexingSlice";

import { CHANGE_LIST_POSITION } from "./Todo/todoSlice";

function List({ name, nameShow, color, date, position }) {
  const dispatch = useDispatch();
  const indexingData = useSelector((store) => store.indexing.data);
  const todosRedux = useSelector((store) => store.todo.data);
  const [dragging, setDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const listData = useSelector((store) => store.getList);
  let hoverEvent;
  const currentIndex = listData.data.findIndex((x) => {
    return x.position === position;
  });

  const refTwo = useRef(null);
  // useEffect(() => {
  //   document.addEventListener("mousemove", handleClickOutside, true);
  // }, [refTwo]);

  const handleClickOutside = (e) => {
    if (!refTwo.current.contains(e.target)) {
      setIsHovering(false);
    }
  };

  const handleList = (e) => {
    if (!isLoggedIn) {
      const regex = /^(List)+[0-9]*/gi;
      if (regex.test(e.target.classList[0])) {
        dispatch(
          CHANGE_LISTINDEX(
            todosRedux.map((x) => x.listName).indexOf(e.target.classList[0])
          )
        );
      }
    } else if (isLoggedIn) {
      dispatch(CHANGE_LISTINDEX(currentIndex));
      dispatch(CHANGE_LISTINDEX(currentIndex));
    }
  };

  const rearrangeList = () => {
    if (!isLoggedIn) {
      dispatch(CHANGE_LISTINDEX(currentIndex));
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
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
    dispatch(ONDRAGOVER(name));
  };

  const handleOnDragStart = () => {
    if (!dragging) {
      setDragging(true);
      dispatch(LISTDRAGGING(true));
      dispatch(ONDRAGSTART(name));
    }
  };
  const handleOnDragEnd = () => {
    rearrangeList();
    dispatch(LISTDRAGGING(false));
    setDragging(false);
  };
  const handlePopUp = (e) => {
    dispatch(NEWLISTNAME(""));
    dispatch(POPUPCOORDS({ x: e.clientX, y: e.clientY }));
    dispatch(POPUPVISIBILITY(!indexingData.popUpVisibility));
  };

  let listStyle = null;

  if (!isLoggedIn) {
    listStyle = {
      color: color !== null ? invertColor(color.substring(1), `bw`) : "#354259",
      backgroundColor: color !== null ? color : "",
      border:
        name === todosRedux[indexingData.listIndex].listName && color !== null
          ? `2px solid ${invertColor(color.substring(1), `bw`)}`
          : "",
    };
  } else if (isLoggedIn) {
    listStyle = {
      color: color !== null ? invertColor(color.substring(1), `bw`) : "#354259",
      backgroundColor: color !== null ? color : "",
      border:
        currentIndex === indexingData.listIndex && color !== null
          ? `2px solid ${invertColor(color.substring(1), `bw`)}`
          : "",
    };
  }

  let listClassName = null;

  if (!isLoggedIn) {
    listClassName = `${
      name === todosRedux[indexingData.listIndex].listName
        ? styles.selectedList
        : ""
    } ${
      indexingData.onDragOverListName &&
      indexingData.ListDragging &&
      indexingData.onDragOverListName === name
        ? styles.afterGlowList
        : ""
    }  ${styles.containerList}`;
  } else if (isLoggedIn) {
    listClassName = `${
      currentIndex === indexingData.listIndex ? styles.selectedList : ""
    } ${
      indexingData.onDragOverListName &&
      indexingData.ListDragging &&
      indexingData.onDragOverListName === name
        ? styles.afterGlowList
        : ""
    }  ${styles.containerList}`;
  }

  return (
    <div
      onClick={(e) => {
        handleList(e);
      }}
      onDragOver={handleOnDragOver}
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
        className={listClassName}
        style={listStyle}
        draggable="true"
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
      >
        {!isLoggedIn && (
          <div className={`${name} ${styles.nameList}`}>
            {date !== "" ? date : ""}
            {nameShow !== "" ? nameShow : name.replace(/_/, " ")}
          </div>
        )}
        {isLoggedIn && (
          <div className={`${name} ${styles.nameList}`}>
            {date !== null && date.slice(2, 10)} &nbsp;
            {name}
          </div>
        )}

        {isHovering &&
          !indexingData.popUpVisibility &&
          !dragging &&
          !isLoggedIn &&
          nameShow.length > 26 && (
            <div className={styles.hoverName}>
              {nameShow !== "" ? nameShow : name.replace(/_/, " ")}
            </div>
          )}
        {isHovering &&
          !indexingData.popUpVisibility &&
          !dragging &&
          isLoggedIn &&
          name.length > 26 && <div className={styles.hoverName}>{name}</div>}
        {!isLoggedIn && name === todosRedux[indexingData.listIndex].listName && (
          <div className={styles.tripleDot} onClick={handlePopUp}>
            <div>
              <Dots
                className={`${styles.dotdot}`}
                fill={
                  color !== null
                    ? invertColor(color.substring(1), `bw`)
                    : "#354259"
                }
              />
            </div>
          </div>
        )}
        {isLoggedIn && currentIndex === indexingData.listIndex && (
          <div className={styles.tripleDot} onClick={handlePopUp}>
            <div>
              <Dots
                className={`${styles.dotdot}`}
                fill={
                  color !== null
                    ? invertColor(color.substring(1), `bw`)
                    : "#354259"
                }
              />
            </div>
          </div>
        )}
      </div>
      {!isLoggedIn && (
        <ProgressBar
          tasksComplete={
            todosRedux[
              todosRedux.map((x) => x.listName).indexOf(name)
            ].todoArray.filter((x) => x.complete === true).length
          }
          tasksTotal={
            todosRedux[todosRedux.map((x) => x.listName).indexOf(name)]
              .todoArray.length
          }
          width={170}
          height={3}
          background={`#6e85b7`}
        />
      )}
    </div>
  );
}

export default List;
