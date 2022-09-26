import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    tasksComplete: 0,
    tasksTotal: 0,
    confettiBoom: false,
    triggered: false,
    opacity: 1,
  },
};

const taskProgress = createSlice({
  name: "taskProgress",
  initialState: initialState,
  reducers: {
    SET_TASKSCOMPLETE: (state, action) => {
      state.data.tasksComplete = action.payload.tasksComplete;
    },
    SET_TASKSTOTAL: (state, action) => {
      state.data.tasksTotal = action.payload.tasksTotal;
    },
    SET_CONFETTIBOOM: (state, action) => {
      state.data.confettiBoom = action.payload.confettiBoom;
      state.data.triggered = action.payload.triggered;
    },
    SET_OPACITY: (state, action) => {
      state.data.opacity = action.payload.opa;
    },
  },
});

export const {
  SET_TASKSCOMPLETE,
  SET_TASKSTOTAL,
  SET_CONFETTIBOOM,
  SET_OPACITY,
} = taskProgress.actions;
export default taskProgress.reducer;
