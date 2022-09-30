import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import backBtn from "../Scheduler/pictures/back.png";
import show from "../Scheduler/pictures/show.png";
import hide from "../Scheduler/pictures/hide.png";

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown((pass) => !pass);
  };
  const [error, setError] = useState({
    email: false,
    name: false,
    lastName: false,
    password1: false,
    password2: false,
  });
  const [validator, setValidator] = useState({
    email: "",
    name: "",
    lastName: "",
    password1: "",
    password2: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !error.email &&
      !error.name &&
      !error.lastName &&
      !error.password1 &&
      !error.password2
    ) {
      navigate("/scheduler");
    }
  };
  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  function isValidName(name) {
    return /^[-'a-zA-ZÀ-ÖØ-öø-ſ]{3,64}$/u.test(name);
  }
  function isValidPassword(pass) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,64}$/.test(pass);
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
  const handleChangeName = (event) => {
    if (!isValidName(event.target.value)) {
      setError({ ...error, name: true });
    } else {
      setError({ ...error, name: false });
    }
    setValidator({
      ...validator,
      name: event.target.value,
    });
  };
  const handleChangeLastName = (event) => {
    if (!isValidName(event.target.value)) {
      setError({ ...error, lastName: true });
    } else {
      setError({ ...error, lastName: false });
    }
    setValidator({
      ...validator,
      lastName: event.target.value,
    });
  };
  const handleChangePass = (event) => {
    if (!isValidPassword(event.target.value)) {
      setError({ ...error, password1: true });
    } else {
      setError({ ...error, password1: false });
    }
    setValidator({
      ...validator,
      password1: event.target.value,
    });
  };
  const handleComparePass = (event) => {
    setValidator({
      ...validator,
      password2: event.target.value,
    });
    if (event.target.value === validator.password1) {
      setError({ ...error, password2: false });
    } else {
      setError({ ...error, password2: true });
    }
  };

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
        <div className={`${styles[`input-container`]} ${styles.signUpForm}`}>
          <label className={styles.label}>Name </label>
          <input
            autoComplete="off"
            className={styles.inputText}
            type="text"
            name="uname"
            value={validator.name}
            onChange={handleChangeName}
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
            onChange={handleChangeLastName}
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
            value={validator.password1}
            onChange={handleChangePass}
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
              color: `${error.password1 ? "red" : "#c4d7e0"}`,
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
            value={validator.password2}
            onChange={handleComparePass}
            placeholder="********"
            required
          />
          <p
            className={styles.label}
            style={{
              color: `${error.password2 ? "red" : "#c4d7e0"}`,
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
