import React, { useState } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Login</h2>
      <form className={styles.formContainer}>
        <div className={styles[`input-container`]}>
          <label className={styles.label}>Email </label>
          <input
            autoFocus={true}
            className={styles.inputText}
            type="text"
            name="uname"
            placeholder="JimmyJones@hotmail.com"
            required
          />
          {renderErrorMessage("uname")}
        </div>
        <div className={styles[`input-container`]}>
          <label className={styles.label}>Password </label>
          <input
            className={styles.inputText}
            type="password"
            name="pass"
            required
          />
          {renderErrorMessage("pass")}
        </div>
        <Link to="/scheduler" className={styles.forgotPassword}>
          Forgot password?
        </Link>
        <div className={styles[`button-container`]}>
          <input
            type="submit"
            value="Login"
            className={`${styles.guestButton} ${styles.loginButton}`}
          />
        </div>
      </form>

      <header className={styles.dividerContainer}>
        <div className={styles.subContainer}>
          <span className={styles.spacer}></span>
          <div className={styles.divider}>or</div>
          <span className={styles.spacer}></span>
        </div>
      </header>
      <Link to="/scheduler" className={styles.guestButton}>
        Sign Up
      </Link>
      <Link to="/scheduler" className={styles.guestButton}>
        Continue as Guest
      </Link>
    </div>
  );
};

export default Login;
