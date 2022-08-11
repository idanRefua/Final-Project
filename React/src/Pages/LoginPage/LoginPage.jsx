import { Fragment, useEffect, useState } from "react";
import "./login-page.css";
import Joi from "joi-browser";
import axios from "axios";
import loginSchema from "../../Validations/login.validation";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dataFromServer, setDataFromServer] = useState(null);
  const [loginError, setLoginError] = useState("");
  const loggedInRedux = useSelector((state) => state.auth.loggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  if (loggedInRedux) {
    history.push("/home");
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const hadnleLogin = async (e) => {
    e.preventDefault();
    const validateLogin = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });

    const { error } = validateLogin;

    if (error) {
      const errors = {};
      for (let item of error.details) errors[item.path[0]] = item.message;
      setEmailError(errors.email);
      setPasswordError(
        "Password must be with min 6 Charcaters,At least One Capital(uppercase) letter , One Number And One symbol(!@#$%)"
      );
    } else {
      try {
        const responseFromServer = await axios.post("/auth/login", {
          email,
          password,
        });
        localStorage.setItem("tokenKey", responseFromServer.data.token);
        setDataFromServer(responseFromServer.data);
        const token = localStorage.getItem("tokenKey");
        const decode = jwt_decode(token);
        dispatch(authActions.updateUser(decode));
        dispatch(authActions.login());
        history.push("/home");
      } catch (error) {
        setLoginError("Email Or Password is inccorect");
        setEmailError("");
        setPasswordError("");
        dispatch(authActions.logout());
      }
    }
  };
  return (
    <Fragment>
      <br />
      <br />
      <div className="container d-flex align-items-center justify-content-center">
        <br />
        <form onSubmit={hadnleLogin} className="login-form ">
          <br />
          <h1 className="d-flex align-items-center justify-content-center login-form-title">
            Sign Here!
          </h1>
          <br />
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label d-flex align-items-center justify-content-center"
            >
              Email
            </label>
            <br />
            <span className="validate-errors">{emailError}</span>
            <input
              type="email"
              className="form-control input-login"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label d-flex align-items-center justify-content-center"
            >
              Password
            </label>
            <br />
            <span className="validate-errors">{passwordError}</span>
            <input
              type="password"
              className="form-control input-login"
              id="exampleInputPassword1"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <span className="validate-errors  d-flex align-items-center justify-content-center ">
            {loginError}
          </span>
          <br />

          <p className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn login-btn">
              Login
            </button>
          </p>
          <Link to="/register">
            <p className="d-flex align-items-center justify-content-center link-to-register">
              You didn't Register yet?
            </p>
          </Link>
          <Link to="/forgetpassword">
            <p className="d-flex align-items-center justify-content-center link-to-register">
              Forget Password?
            </p>
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

export default LoginPage;
