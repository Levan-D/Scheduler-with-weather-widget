import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import LoginSection from "./LoginSection";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { getHealth } from "./apiLogin/checkHealthSlice";
import indexingSlice from "../Scheduler/indexingSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const userState = useSelector((state) => state.auth);
  const serverHealth = useSelector((store) => store.checkHealth);
  const isLoading = useSelector((store) => store.indexing.data.isLoading);

  useEffect(() => {
    if (!serverHealth.loading && serverHealth.success === null) {
      dispatch(getHealth());
    }
    if (serverHealth.success) {
      setStatus(<> Server: &#10004; </>);
    } else if (!serverHealth.success) {
      setStatus(
        <>
          Server:<span style={{ fontWeight: "bold" }}> &#x2715;</span> <br />
          <span style={{ fontSize: "0.8rem" }}>Login as guest</span>
        </>
      );
    }
  }, [serverHealth.success]);

  if (userState.loading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        style={{
          position: "absolute",
          color: serverHealth.success ? "#528352" : "#FF7878",
        }}
      >
        {status}
      </div>
      <LoginSection />
      <header className={styles.dividerContainer}>
        <div className={styles.subContainer}>
          <span className={styles.spacer}></span>
          <div className={styles.divider}>or</div>
          <span className={styles.spacer}></span>
        </div>
      </header>
      <Link
        to={serverHealth.success ? "/signUp" : "#"}
        className={`${styles.guestButton} ${isLoading && "isLoading"} ${
          !serverHealth.success && styles.btnDisabled
        }`}
      >
        Sign Up
      </Link>
      <Link
        to="/scheduler"
        className={`${styles.guestButton} ${isLoading && "isLoading"}`}
      >
        Continue as Guest
      </Link>
    </div>
  );
};

export default Login;
