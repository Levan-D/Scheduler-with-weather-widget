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
    `#191919`,
    `#323232`,
    `#4c4c4c`,

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
