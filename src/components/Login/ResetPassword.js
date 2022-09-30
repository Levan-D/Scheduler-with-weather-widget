import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className={styles.container} style={{ height: "500px" }}>
      <h2 className={styles.header}>Reset Password</h2>
      <p className={styles.paragraph}>
        We've send you a recovery code to your email <br /> &#40; check your
        spam &#41;
      </p>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={`${styles[`input-container`]} ${styles.signUpForm}`}>
          <label className={styles.label}>Code </label>
          <input
            autoComplete="off"
            autoFocus={true}
            className={styles.inputText}
            type="text"
            name="uname"
            placeholder="JimmyJones@hotmail.com"
            required
          />
          {renderErrorMessage("uname")}
        </div>

        <div className={`${styles[`button-container`]} ${styles.signUpForm}`}>
          <input
            type="submit"
            value="Submit"
            className={`${styles.guestButton} ${styles.loginButton}`}
          />
        </div>
      </form>
      <div className={styles.guestButton}>Resend Code</div>
    </div>
  );
};

export default ResetPassword;
