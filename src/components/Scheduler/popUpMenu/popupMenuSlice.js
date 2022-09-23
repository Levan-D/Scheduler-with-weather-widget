import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    confD: false,
    confN: false,
    confC: false,
    showCal: false,
  },
};

const subMenuSlice = createSlice({
  name: `subMenu`,
  initialState,
  reducers: {
    setDelete: (state) => {
      state.data = {
        confD: !state.confD,
        confN: false,
        confC: false,
        showCal: false,
      };
    },
    setColor: (state) => {
      state.data = {
        confD: false,
        confN: false,
        confC: !state.confC,
        showCal: false,
      };
    },
    setRename: (state) => {
      state.data = {
        confD: false,
        confN: !state.confN,
        confC: false,
        showCal: false,
      };
    },
    resetState: (state) => {
      state.data = {
        confD: false,
        confN: false,
        confC: false,
        showCal: false,
      };
    },
  },
});

export const { setDelete, setColor, setRename, resetState } =
  subMenuSlice.actions;
export default subMenuSlice.reducer;
