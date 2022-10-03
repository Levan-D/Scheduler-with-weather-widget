import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import backBtn from "../Scheduler/pictures/back.png";
import show from "../Scheduler/pictures/show.png";
import hide from "../Scheduler/pictures/hide.png";
import { isValidEmail, isValidName, isValidPassword } from "./Validator";

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown((pass) => !pass);
  };
  const [error, setError] = useState({
    email: false,
    name: false,
    lastName: false,
    password: false,
    passwordConf: false,
  });
  const [validator, setValidator] = useState({
    email: "",
    name: "",
    lastName: "",
    password: "",
    passwordConf: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !error.email &&
      !error.name &&
      !error.lastName &&
      !error.password &&
      !error.passwordConf
    ) {
      navigate("/scheduler");
    }
  };
  function handleUseInfo(type, event) {
    switch (type) {
      case "email":
        if (!isValidEmail(event.target.value)) {
          setError({ ...error, email: true });
        } else {
          setError({ ...error, email: false });
        }
        setValidator({
          ...validator,
          email: event.target.value,
        });
        break;
      case "name":
        if (!isValidName(event.target.value)) {
          setError({ ...error, name: true });
        } else {
          setError({ ...error, name: false });
        }
        setValidator({
          ...validator,
          name: event.target.value,
        });
        break;
      case "lastName":
        if (!isValidName(event.target.value)) {
          setError({ ...error, lastName: true });
        } else {
          setError({ ...error, lastName: false });
        }
        setValidator({
          ...validator,
          lastName: event.target.value,
        });
        break;
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
    <div className={styles.container} style={{ height: "700px" }}>
      <div
        className={styles.backBtn}
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={backBtn} alt="back button" />
      </div>
      <h2 className={styles.header}>Sign Up</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles[`input-container`]}>
          <label className={styles.label}>Email </label>
          <input
            autoComplete="off"
            autoFocus={true}
            className={styles.inputText}
            type="text"
            name="uname"
            value={validator.email}
            onChange={(e) => {
              handleUseInfo("email", e);
            }}
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
        <div className={`${styles[`input-container`]} ${styles.signUpForm}`}>
          <label className={styles.label}>Name </label>
          <input
            autoComplete="off"
            className={styles.inputText}
            type="text"
            name="uname"
            value={validator.name}
            onChange={(e) => {
              handleUseInfo("name", e);
            }}
            placeholder="Jimmy"
            required
          />
          <p
            className={styles.label}
            style={{
              color: `${error.name ? "red" : "#c4d7e0"}`,
              padding: "0",
              fontSize: "0.7rem",
              fontWeight: "500",
            }}
          >
            Invalid Name
          </p>
        </div>
        <div className={`${styles[`input-container`]} ${styles.signUpForm}`}>
          <label className={styles.label}>Last Name </label>
          <input
            autoComplete="off"
            className={styles.inputText}
            type="text"
            name="uname"
            value={validator.lastName}
            onChange={(e) => {
              handleUseInfo("lastName", e);
            }}
            placeholder="Jones"
            required
          />
          <p
            className={styles.label}
            style={{
              color: `${error.lastName ? "red" : "#c4d7e0"}`,
              padding: "0",
              fontSize: "0.7rem",
              fontWeight: "500",
            }}
          >
            Invalid Last Name
          </p>
        </div>
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

        <div className={styles[`button-container`]}>
          <input
            type="submit"
            value="Sign Up"
            className={`${styles.guestButton} ${styles.loginButton}`}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
