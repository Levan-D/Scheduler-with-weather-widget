import React, { useState } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import LoginSection from "./LoginSection";

const Login = () => {
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
      <Link to="/scheduler" className={styles.guestButton}>
        Continue as Guest
      </Link>
    </div>
  );
};

export default Login;
