import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import LoginSection from "./LoginSection";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { ISLOGGEDIN } from "../Scheduler/indexingSlice";

const Login = () => {
  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (userState.loading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <LoginSection />
      <header className={styles.dividerContainer}>
        <div className={styles.subContainer}>
          <span className={styles.spacer}></span>
          <div className={styles.divider}>or</div>
          <span className={styles.spacer}></span>
        </div>
      </header>
      <Link to="/signUp" className={styles.guestButton}>
        Sign Up
      </Link>
      <Link
        to="/scheduler"
        className={styles.guestButton}
        onClick={() => {
          dispatch(ISLOGGEDIN(false));
        }}
      >
        Continue as Guest
      </Link>
    </div>
  );
};

export default Login;
