import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./popUpMenu.module.css";
import { CHANGE_LIST_COLOR } from "../todoSlice";

const ChangeColor = () => {
  const dispatch = useDispatch();

  const indexingData = useSelector((store) => store.indexing.data);

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

  return (
    <>
      <div
        className={`${styles.colorBox} ${styles.confirmTab} ${styles.confirmTabAd}`}
      >
        {colors.map((x, i) => {
          return (
            <div
              className={`${styles.colorCircle} ${styles.popUpButton}`}
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
    </>
  );
};

export default ChangeColor;
