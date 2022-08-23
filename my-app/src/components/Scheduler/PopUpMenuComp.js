import React, { useRef, useEffect } from "react";

import "./popUpMenu.css";

function PopUpMenuComp({ deleteFunc, coords, visibility }) {
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
      <div className="popUpButton deleteButton" onClick={deleteFunc}>
        <div className="icon-trash">
          <div className="trash-lid"></div>
          <div className="trash-container"></div>
          <div className="trash-line-1"></div>
          <div className="trash-line-2"></div>
          <div className="trash-line-3"></div>
        </div>
      </div>
      <div className="popUpButton"></div>
      <div className="popUpButton"></div>
    </div>
  );
}

export default PopUpMenuComp;
