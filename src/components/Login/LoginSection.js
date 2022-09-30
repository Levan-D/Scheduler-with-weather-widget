import React, { useState } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import show from "../Scheduler/pictures/show.png";
import hide from "../Scheduler/pictures/hide.png";

const LoginSection = () => {
  const [error, setError] = useState({ email: false, password: false });
  const [validator, setValidator] = useState({
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown((pass) => !pass);
  };

  const [isSubmitted, setIsSubmitted] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.email && !error.password) {
      navigate("/scheduler");
    }
  };

  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  function isValidPassword(pass) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(pass);
  }

  const handleChangeEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError({ ...error, email: true });
    } else {
      setError({ ...error, email: false });
    }
    setValidator({
      ...validator,
      email: event.target.value,
    });
  };
  const handleChangePass = (event) => {
    if (!isValidPassword(event.target.value)) {
      setError({ ...error, password: true });
    } else {
      setError({ ...error, password: false });
    }
    setValidator({
      ...validator,
      password: event.target.value,
    });
  };

  return (
    <>
      <h2 className={styles.header}>Login</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles[`input-container`]}>
          <label className={styles.label}>Email </label>
          <input
            autoComplete="off"
            autoFocus={true}
            className={styles.inputText}
            type="text"
            name="email"
            value={validator.email}
            onChange={handleChangeEmail}
            placeholder="JimmyJones@hotmail.com"
            required
          />

          <p
            className={styles.label}
            style={{
              color: `${error.email ? "red" : "#c4d7e0"}`,
              padding: "0",
              fontSize: "0.7rem",
              fontWeight: "500",
            }}
          >
            Invalid Email
          </p>
        </div>
        <div className={styles[`input-container`]}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.inputText}
            type={passwordShown ? "text" : "password"}
            name="pass"
            value={validator.password}
            onChange={handleChangePass}
            placeholder="********"
            required
          />
          <div onClick={togglePassword} className={styles.showPasswordIcon}>
            <img src={passwordShown ? show : hide} alt="show/hide icon" />
          </div>
          <p
            className={styles.label}
            style={{
              color: `${error.password ? "red" : "#c4d7e0"}`,
              padding: "0",
              fontSize: "0.7rem",
              fontWeight: "500",
            }}
          >
            Invalid Password
          </p>
        </div>
        <Link
          to="/forgot"
          className={styles.forgotPassword}
          style={{ position: "relative", top: "-20px" }}
        >
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
    </>
  );
};

export default LoginSection;
