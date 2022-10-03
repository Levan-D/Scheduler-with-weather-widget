import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import backBtn from "../pictures/back.png";
import show from "../pictures/show.png";
import hide from "../pictures/hide.png";
import { isValidEmail, isValidName, isValidPassword } from "./Validator";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetUserData } from "./loginSlice";
import racoon from "../pictures/racoon.png";

const SignUp = () => {
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown((pass) => !pass);
  };
  const userState = useSelector((store) => store.authentication);
  useEffect(() => {
    if (userState.success) {
      dispatch(resetUserData());
      console.log("resetUserData:", userState);
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  }, [userState]);
  console.log("resetUserData:", userState);
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
      dispatch(
        registerUser({
          email: validator.email.toLowerCase(),
          first_name: validator.name,
          last_name: validator.lastName,
          password: validator.password,
        })
      );
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

  if (userState.Loading) {
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
        <h2 className={styles.header}>Loading</h2>
      </div>
    );
  }

  if (userState.success) {
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
        <h2 className={styles.header}>Registration Sucessful</h2>
        <div style={{ textAlign: "center", fontSize: "0.6rem" }}>
          <img
            src={racoon}
            alt="racoon waving"
            style={{
              width: "220px",
              margin: " 8rem auto 0 auto",
              display: "block",
            }}
          />
          <a href="https://www.freepik.com/free-vector/cute-cartoon-raccoon-sitting-white-background_24780205.htm#query=raccoon%20clipart&position=2&from_view=keyword">
            Image by brgfx
          </a>
          on Freepik
        </div>
      </div>
    );
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
