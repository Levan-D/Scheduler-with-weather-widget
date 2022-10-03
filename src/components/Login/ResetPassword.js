import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import show from "../pictures/show.png";
import hide from "../pictures/hide.png";
import { isValidPassword } from "./Validator";
const ResetPassword = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown((pass) => !pass);
  };
  const [error, setError] = useState({
    password: false,
    passwordConf: false,
  });
  const [validator, setValidator] = useState({
    password: "",
    passwordConf: "",
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.password && !error.passwordConf) {
      navigate("/");
    }
  };

  function handleUseInfo(type, event) {
    switch (type) {
      case "password":
        if (!isValidPassword(event.target.value)) {
          setError({ ...error, password: true });
        } else {
          setError({ ...error, password: false });
        }
        setValidator({
          ...validator,
          password: event.target.value,
        });
        break;
      case "comparePass":
        setValidator({
          ...validator,
          passwordConf: event.target.value,
        });
        if (event.target.value === validator.password) {
          setError({ ...error, passwordConf: false });
        } else {
          setError({ ...error, passwordConf: true });
        }
        break;
    }
  }
  return (
    <div className={styles.container} style={{ height: "500px" }}>
      <h2 className={styles.header}>Reset Password</h2>
      <p className={styles.paragraph}>Enter a new password below</p>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={`${styles[`input-container`]} ${styles.signUpForm}`}>
          <label className={styles.label}>Password </label>
          <p className={styles.passwordParagraph}>
            8 to 15 characters which contain at least one number &amp; a special
            character
          </p>
          <input
            className={styles.inputText}
            type={passwordShown ? "text" : "password"}
            name="pass"
            value={validator.password}
            onChange={(e) => {
              handleUseInfo("password", e);
            }}
            placeholder="********"
            required
          />
          <div
            onClick={togglePassword}
            className={`${styles.showPasswordIcon} ${styles.showPasswordIconSignUp}`}
          >
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
        <div className={`${styles[`input-container`]} ${styles.signUpForm}`}>
          <label className={styles.label}>Repeat Password </label>
          <input
            className={styles.inputText}
            type={passwordShown ? "text" : "password"}
            name="pass"
            value={validator.passwordConf}
            onChange={(e) => {
              handleUseInfo("comparePass", e);
            }}
            placeholder="********"
            required
          />
          <p
            className={styles.label}
            style={{
              color: `${error.passwordConf ? "red" : "#c4d7e0"}`,
              padding: "0",
              fontSize: "0.7rem",
              fontWeight: "500",
            }}
          >
            Passwords Don't Match
          </p>
        </div>
        <div
          className={styles.guestButton}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Reset Password
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
