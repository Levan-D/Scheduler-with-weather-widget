import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import backBtn from "../Scheduler/pictures/back.png";
import racoon from "../Scheduler/pictures/racoon.png";

const ForgotPassword = () => {
  const [error, setError] = useState(false);
  const [validator, setValidator] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      setIsSubmitted(true);
    }
  };
  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  const handleChangeEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError(true);
    } else {
      setError(false);
    }
    setValidator(event.target.value);
  };
  if (isSubmitted) {
    return (
      <div className={styles.container} style={{ height: "500px" }}>
        <div
          className={styles.backBtn}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={backBtn} alt="back button" />
        </div>
        <h2 className={styles.header}>Confirm Code</h2>
        <p className={styles.paragraph}>
          We've send you a recovery code to your email
        </p>
        <p className={styles.paragraph}>&#40; check your spam &#41;</p>
        <div style={{ textAlign: "center", fontSize: "0.6rem" }}>
          <img
            src={racoon}
            alt=""
            style={{
              width: "220px",
              margin: " 2rem auto 0 auto",
              display: "block",
            }}
          />
          <a href="https://www.freepik.com/free-vector/cute-cartoon-raccoon-sitting-white-background_24780205.htm#query=raccoon%20clipart&position=2&from_view=keyword">
            Image by brgfx
          </a>{" "}
          on Freepik
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container} style={{ height: "500px" }}>
      <div
        className={styles.backBtn}
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={backBtn} alt="back button" />
      </div>
      <h2 className={styles.header}>Forgot Password</h2>

      <p className={styles.paragraph}>Don't worry, this happens all the time</p>
      <p className={styles.paragraph}>Enter your email below</p>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div
          className={`${styles[`input-container`]} ${styles.passwordForget}`}
        >
          <label className={styles.label}>Email </label>
          <input
            autoComplete="off"
            autoFocus={true}
            className={styles.inputText}
            type="text"
            name="uname"
            value={validator}
            onChange={handleChangeEmail}
            placeholder="JimmyJones@hotmail.com"
            required
          />
          <p
            className={styles.label}
            style={{
              color: `${error ? "red" : "#c4d7e0"}`,
              padding: "0",
              fontSize: "0.7rem",
              fontWeight: "500",
            }}
          >
            Invalid Email
          </p>
        </div>

        <div className={styles[`button-container`]}>
          <input
            type="submit"
            value="Continue"
            className={`${styles.guestButton} ${styles.loginButton}`}
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
