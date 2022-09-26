/** @format */

import Scheduler from "./components/Scheduler/Scheduler";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Scheduler/login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="scheduler" element={<Scheduler />} />
      </Routes>
    </div>
  );
}

export default App;
