import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./popUpMenu.css";
import { RENAME_LIST } from "../todoSlice";
import { resetState } from "./popupMenuSlice";
import { POPUPVISIBILITY, NEWLISTNAME } from "../indexingSlice";

const ChangeName = () => {
  const dispatch = useDispatch();
  const indexingData = useSelector((store) => store.indexing.data);

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
              dispatch(resetState());
              dispatch(POPUPVISIBILITY(false));
            }}
          >
            <input
              type="text"
              maxLength="256"
              autoFocus={true}
              required
              placeholder="Enter task here!"
              value={indexingData.newListName}
              onChange={(e) => dispatch(NEWLISTNAME(e.target.value))}
            />
            <input type="submit" value="Rename" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeName;
