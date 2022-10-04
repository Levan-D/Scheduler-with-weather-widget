import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../components/Scheduler/todoSlice";
import taskProgressReducer from "../components/Scheduler/taskProgressSlice";
import indexingReducer from "../components/Scheduler/indexingSlice";
import subMenuReducer from "../components/Scheduler/popUpMenu/popupMenuSlice";
import userReducer from "../components/Login/authSlice";
import signUpReducer from "../components/Login/signUpSlice";
import forgotReducer from "../components/Login/forgotPassSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    taskProgress: taskProgressReducer,
    indexing: indexingReducer,
    subMenu: subMenuReducer,
    auth: userReducer,
    signUp: signUpReducer,
    forgot: forgotReducer,
  },
});
