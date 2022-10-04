import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="spinnerContainer">
      <div className="spinner">
        <p>Loading...</p>
        <div className="spinner-area spinner-first"></div>
        <div className="spinner-area spinner-second"></div>
        <div className="spinner-area spinner-third"></div>
      </div>
    </div>
  );
};

export default Loader;
