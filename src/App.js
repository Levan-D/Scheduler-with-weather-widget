/** @format */

import Scheduler from "./components/Scheduler/Scheduler";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import SignUp from "./components/Login/SignUp";
import ResetPassword from "./components/Login/ResetPassword";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser as pass } from "./components/Login/apiLogin/forgotPassSlice";
import { resetUser as auth } from "./components/Login/apiLogin/authSlice";
import { resetUser as sign } from "./components/Login/apiLogin/signUpSlice";
import { ISLOGGEDIN, ISLOADING } from "./components/Scheduler/indexingSlice";

function App() {
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const todosRedux = useSelector((store) => store.todo.loading);
  const listData = useSelector((store) => store.getList.loading);
  const todoData = useSelector((store) => store.getTodo.loading);
  const rearrangeData = useSelector((store) => store.rearrange.loading);
  const createListData = useSelector((store) => store.createList.loading);
  const createTodoData = useSelector((store) => store.createTodo.loading);
  const deleteListData = useSelector((store) => store.deleteList.loading);
  const patchListData = useSelector((store) => store.patchList.loading);
  const patchTodoData = useSelector((store) => store.patchTodo.loading);
  const isLoading = useSelector((store) => store.indexing.data.isLoading);
  const location = useLocation();
  const dispatch = useDispatch();
  const indexingData = useSelector((store) => store.indexing.data);

  useEffect(() => {
    if (
      todosRedux ||
      listData ||
      todoData ||
      rearrangeData ||
      createListData ||
      createTodoData ||
      deleteListData ||
      patchListData ||
      patchTodoData
    ) {
      dispatch(ISLOADING(true));
    } else dispatch(ISLOADING(false));
  }, [
    todosRedux,
    listData,
    todoData,
    rearrangeData,
    createListData,
    createTodoData,
    deleteListData,
    patchListData,
    patchTodoData,
  ]);
  

  useEffect(() => {
    dispatch(pass());
    dispatch(auth());
    dispatch(sign());
  }, [isLoggedIn]);

  useEffect(() => {
    if (location.pathname !== "/scheduler") {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      if (localStorage.getItem("accessToken") === null) {
        dispatch(ISLOGGEDIN(false));
      }
    }
    if (localStorage.getItem("accessToken") !== null) {
      dispatch(ISLOGGEDIN(true));
    }
  }, [location]);

  return (
    <div className={`App  ${isLoading && "isLoading"}`}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="scheduler" element={<Scheduler />} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="reset" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
