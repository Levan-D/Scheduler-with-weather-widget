/** @format */

import Scheduler from "./components/Scheduler/Scheduler";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/Login/ForgotPassword";
import SignUp from "./components/Login/SignUp";
import ResetPassword from "./components/Login/ResetPassword";

function App() {
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
