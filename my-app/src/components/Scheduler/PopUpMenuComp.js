import React, { useRef, useEffect, useState } from "react";
import "./popUpMenu.css";
import colorPalette from "./pictures/colorPalette.png";

function PopUpMenuComp({
  deleteFunc,
  coords,
  visibility,
  renameFunc,
  setlistnameFA,
  listName,
  colorChange,
}) {
  const [subMenu, setSubMenu] = useState({
    confD: false,
    confN: false,
    confC: false,
  });
  const colors = [
    `#f0f0f0`,
    `#000000`,
    `#4d4d4d`,
    `#808080`,
    `#66ffff`,
    `#66ccff`,
    `#3399ff`,
    `#0033cc`,
    `#00ff99`,
    `#33cc33`,
    `#009933`,
    `#99cc00`,
    `#ff6666`,
    `#ff3300`,
    `#ff0000`,
    `#800000`,
    `#ff0066`,
    `#ff3399`,
    `#cc0099`,
    `#660066`,
  ];
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
            setSubMenu({
              confD: false,
              confN: !subMenu.confN,
              confC: false,
            });
          }}
        >
          <div className="pencil"></div>
        </div>
        <div
          className="popUpButton"
          onClick={(x) => {
            setSubMenu({
              confD: false,
              confN: false,
              confC: !subMenu.confC,
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
          onClick={(x) => {
            setSubMenu({
              confD: !subMenu.confD,
              confN: false,
              confC: false,
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
          <div onClick={deleteFunc}>Confirm</div>
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
            <form className="nameChangeForm" onSubmit={renameFunc}>
              <input
                type="text"
                required
                placeholder="Enter task here!"
                value={listName}
                onChange={(e) => setlistnameFA(e.target.value)}
              />
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
                onClick={(x) => colorChange(colors[i])}
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
