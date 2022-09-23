import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    confD: false,
    confN: false,
    confC: false,
    confCal: false,
  },
};

const subMenuSlice = createSlice({
  name: `subMenu`,
  initialState,
  reducers: {
    setDelete: (state, action) => {
      state.data = {
        confD: action.payload,
        confN: false,
        confC: false,
        confCal: false,
      };
    },
    setColor: (state, action) => {
      state.data = {
        confD: false,
        confN: false,
        confC: action.payload,
        confCal: false,
      };
    },
    setRename: (state, action) => {
      state.data = {
        confD: false,
        confN: action.payload,
        confC: false,
        confCal: false,
      };
    },
    setCalendar: (state, action) => {
      state.data = {
        confD: false,
        confN: false,
        confC: false,
        confCal: action.payload,
      };
    },
    resetState: (state) => {
      state.data = {
        confD: false,
        confN: false,
        confC: false,
        confCal: false,
      };
    },
  },
});

export const { setDelete, setColor, setRename, setCalendar, resetState } =
  subMenuSlice.actions;
export default subMenuSlice.reducer;
