import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../components/Scheduler/todoSlice";
import taskProgressReducer from "../components/Scheduler/taskProgressSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    taskProgress: taskProgressReducer,
  },
});
