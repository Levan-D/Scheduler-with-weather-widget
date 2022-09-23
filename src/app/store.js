import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../components/Scheduler/todoSlice";
import taskProgressReducer from "../components/Scheduler/taskProgressSlice";
import indexingReducer from "../components/Scheduler/indexingSlice";
import subMenuReducer from "../components/Scheduler/popUpMenu/popupMenuSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    taskProgress: taskProgressReducer,
    indexing: indexingReducer,
    subMenu: subMenuReducer,
  },
});
