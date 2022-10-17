/** @format */

import React, { useState, useEffect } from "react"
import styles from "./login.module.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import show from "../pictures/show.png"
import hide from "../pictures/hide.png"
import { isValidEmail, isValidPassword } from "./Validator"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, resetUser } from "./apiLogin/authSlice"
import { ISLOGGEDIN } from "../Scheduler/indexingSlice"

const LoginSection = () => {
  const userState = useSelector(state => state.auth)
  const serverHealth = useSelector(store => store.checkHealth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState({ email: false, password: false })
  const [validator, setValidator] = useState({
    email: "",
    password: "",
  })

  const [passwordShown, setPasswordShown] = useState(false)

  const togglePassword = () => {
    setPasswordShown(pass => !pass)
  }

  useEffect(() => {
    if (userState.success) {
      dispatch(resetUser())
      dispatch(ISLOGGEDIN(true))
      navigate("/scheduler")
    }
  }, [userState])
  
  const handleSubmit = e => {
    e.preventDefault()
    if (!error.email && !error.password && serverHealth.success) {
      dispatch(
        loginUser({
          email: validator.email.toLowerCase(),
          password: validator.password,
        })
      )
    }
  }

  const handleUseInfo = (type, event) => {
    switch (type) {
      case "email":
        if (!isValidEmail(event.target.value)) {
          setError({ ...error, email: true })
        } else {
          setError({ ...error, email: false })
        }
        setValidator({
          ...validator,
          email: event.target.value,
        })
        break

      case "password":
        if (!isValidPassword(event.target.value)) {
          setError({ ...error, password: true })
        } else {
          setError({ ...error, password: false })
        }
        setValidator({
          ...validator,
          password: event.target.value,
        })
        break
    }
  }

  return (
    <>
      <h2 className={styles.header}>Login</h2>
      <h3
        className={styles.postError}
        style={{ color: userState.error ? "red" : "#c4d7e0" }}
      >
        {userState.error} &nbsp;
      </h3>
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
            onChange={e => {
              handleUseInfo("email", e)
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
        <div className={styles[`input-container`]}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.inputText}
            type={passwordShown ? "text" : "password"}
            name="pass"
            value={validator.password}
            onChange={e => {
              handleUseInfo("password", e)
            }}
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
          to={serverHealth.success ? "/forgot" : "#"}
          className={styles.forgotPassword}
          style={{ position: "relative", top: "-20px" }}
        >
          Forgot password?
        </Link>
        <div
          className={`${styles[`button-container`]} ${
            !serverHealth.success && styles.btnDisabled
          }`}
        >
          <input
            type="submit"
            value="Login"
            className={`${styles.guestButton} ${styles.loginButton}`}
          />
        </div>
      </form>
    </>
  )
}

export default LoginSection
