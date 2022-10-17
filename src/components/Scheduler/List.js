/** @format */
import ProgressBar from "../ProgressBar/ProgressBar";
import React, { useState, useEffect } from "react";
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
import { rearrange } from "./apiScheduler/rearrangeSlice";
import { getList } from "./apiScheduler/getListSlice";

function List({ name, nameShow, color, date, position, list }) {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const indexingData = useSelector((store) => store.indexing.data);
  const todosRedux = useSelector((store) => store.todo.data);
  const [dragging, setDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const listData = useSelector((store) => store.getList);
  const rearrangeData = useSelector((store) => store.rearrange);
  const isLoading = useSelector((store) => store.indexing.data.isLoading);
  let hoverEvent;
  const currentIndex = listData.data.findIndex((x) => {
    return x.position === position;
  });

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
    if (isLoggedIn) {
      if (
        indexingData.onDragOverListName.id !==
        indexingData.onDragStartListName.id
      ) {
        dispatch(
          rearrange({
            listId: {
              current: indexingData.onDragStartListName.id,
              replace: indexingData.onDragOverListName.id,
            },
            todoId: {
              current: null,
              replace: null,
            },
          })
        );
        setRefresh(true);
      }
    }
  };

  useEffect(() => {
    if (
      refresh &&
      isLoggedIn &&
      !listData.loading &&
      listData.success &&
      !rearrangeData.loading
    ) {
      dispatch(getList());
      setRefresh(false);
    }
  }, [refresh, rearrangeData]);

  const handleOnDragOver = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      dispatch(ONDRAGOVER(name));
    } else if (isLoggedIn) {
      dispatch(ONDRAGOVER(list));
    }
  };

  const handleOnDragStart = () => {
    if (!dragging) {
      setDragging(true);
      dispatch(LISTDRAGGING(true));
      if (!isLoggedIn) {
        dispatch(ONDRAGSTART(name));
      } else if (isLoggedIn) {
        dispatch(ONDRAGSTART(list));
      }
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
      list.id === listData.data[indexingData.listIndex].id
        ? styles.selectedList
        : ""
    } ${
      indexingData.onDragOverListName &&
      indexingData.ListDragging &&
      indexingData.onDragOverListName.id === list.id
        ? styles.afterGlowList
        : ""
    }  ${styles.containerList}`;
  }

  return (
    <div onClick={handleList} onDragOver={handleOnDragOver}>
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
        className={`${listClassName} ${isLoading && "isLoading"}`}
        style={listStyle}
        draggable="true"
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
      >
        {/* timestamp and list name */}
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
        {/* timestamp and list name */}
        {/* Hover effect */}
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
        {/* Hover effect */}
        {/* Popup Menu */}
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
        {/* Popup Menu */}
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
