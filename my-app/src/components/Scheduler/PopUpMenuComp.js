import React, { useRef, useEffect, useState } from "react";
import "./popUpMenu.css";

function PopUpMenuComp({ deleteFunc, coords, visibility }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmNameChange, setConfirmNameChange] = useState(false);
  const refOne = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, [refOne]);

  const handleClickOutside = (e) => {
    if (!refOne.current.contains(e.target)) {
      visibility();
    }
  };

  return (
    <div
      className="popUpMenu"
      ref={refOne}
      onMouseLeave={visibility}
      style={{ top: coords.y + "px", left: coords.x + "px" }}
    >
      <div className="popUpWrapper">
        <div
          className="popUpButton"
          onClick={(x) => {
            setConfirmNameChange(!confirmNameChange);
          }}
        >
          <div className="pencil"></div>
        </div>
        <div className="popUpButton"></div>
        <div
          className="popUpButton deleteButton"
          onClick={(x) => {
            setConfirmDelete(!confirmDelete);
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
      {confirmDelete && (
        <div className="confirmTab">
          <div onClick={deleteFunc}>Confirm</div>
        </div>
      )}
      {confirmNameChange && (
        <div
          className="confirmTab"
          style={{
            height: `auto`,
            padding: `10px 0px`,
            width: `auto`,
          }}
        >
          <div>
            <form className="nameChangeForm">
              <input
                type="text"
                required
                placeholder="Enter task here!"
                // value={taskName}
                // onChange={(e) => setTaskName(e.target.value)}
              />
              <input type="submit" value="Rename" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopUpMenuComp;

// deleteFunc;
