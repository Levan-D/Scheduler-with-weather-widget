/** @format */

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../components/Scheduler/Todo/todoSlice";
import taskProgressReducer from "../components/Scheduler/taskProgressSlice";
import indexingReducer from "../components/Scheduler/indexingSlice";
import subMenuReducer from "../components/Scheduler/popUpMenu/popupMenuSlice";
import userReducer from "../components/Login/apiLogin/authSlice";
import signUpReducer from "../components/Login/apiLogin/signUpSlice";
import forgotReducer from "../components/Login/apiLogin/forgotPassSlice";
import getListReduer from "../components/Scheduler/apiScheduler/getListSlice";
import createListReduer from "../components/Scheduler/apiScheduler/createListSlice";
import getTodoReducer from "../components/Scheduler/apiScheduler/getTodoSlice";
import createTodoReduer from "../components/Scheduler/apiScheduler/createTodoSlice";
import deleteListReducer from "../components/Scheduler/apiScheduler/deleteListSlice";
import patchListReducer from "../components/Scheduler/apiScheduler/patchListSlice";
import patchTodoReducer from "../components/Scheduler/apiScheduler/patchTodoSlice";
import getHealthReducer from "../components/Login/apiLogin/checkHealthSlice";
import rearrangeReducer from "../components/Scheduler/apiScheduler/rearrangeSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    taskProgress: taskProgressReducer,
    indexing: indexingReducer,
    subMenu: subMenuReducer,
    auth: userReducer,
    signUp: signUpReducer,
    forgot: forgotReducer,
    getList: getListReduer,
    createList: createListReduer,
    deleteList: deleteListReducer,
    getTodo: getTodoReducer,
    createTodo: createTodoReduer,
    patchList: patchListReducer,
    patchTodo: patchTodoReducer,
    checkHealth: getHealthReducer,
    rearrange: rearrangeReducer,
  },
});
