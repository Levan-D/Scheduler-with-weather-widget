import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    confD: false,
    confN: false,
    confC: false,
    confCal: false,
    confCalM: false,
  },
};

const subMenuSlice = createSlice({
  name: `subMenu`,
  initialState,
  reducers: {
    setDelete: (state, action) => {
      state.data.confD = action.payload;
    },
    setColor: (state, action) => {
      state.data.confC = action.payload;
    },
    setRename: (state, action) => {
      state.data.confN = action.payload;
    },
    setCalendar: (state, action) => {
      state.data.confCal = action.payload;
    },
    setCalendarMenu: (state, action) => {
      state.data.confCalM = action.payload;
    },
    resetState: (state) => {
      state.data = {
        confD: false,
        confN: false,
        confC: false,
        confCal: false,
        confCalM: false,
      };
    },
  },
});

export const {
  setDelete,
  setColor,
  setRename,
  setCalendar,
  resetState,
  setCalendarMenu,
} = subMenuSlice.actions;
export default subMenuSlice.reducer;
