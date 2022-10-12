/** @format */

import Scheduler from "./components/Scheduler/Scheduler";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import SignUp from "./components/Login/SignUp";
import ResetPassword from "./components/Login/ResetPassword";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetUser as pass } from "./components/Login/forgotPassSlice";
import { resetUser as auth } from "./components/Login/authSlice";
import { resetUser as sign } from "./components/Login/signUpSlice";
import { ISLOGGEDIN } from "./components/Scheduler/indexingSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pass());
    dispatch(auth());
    dispatch(sign());
  }, [location]);

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
    <div className="App">
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
